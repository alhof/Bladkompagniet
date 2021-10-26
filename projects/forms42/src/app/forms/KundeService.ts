import { Component } from '@angular/core';
import { Actions } from '../blocks/Actions';
import { Addresses } from '../blocks/Addresses';
import { TextSearch } from '../classes/TextSearch';
import { Form, block, connect, join, field, FieldType, trigger, Trigger, keytrigger, keymap, listofvalues, ListOfValues, KeyTriggerEvent, SQLTriggerEvent, Statement, Condition, Column, Case } from 'forms42';


@Component({
    templateUrl: "KundeService.html",
    styleUrls: ['KundeService.css']
})

@field({name: "addresses.address", type: FieldType.text })
@join({master: {alias: "addresses", key: "primary"}, detail: {alias: "actions", key: "address"}})


export class KundeService extends Form
{
    @block({component: Addresses, databaseopts: {insert: false, update: false, delete: false, query: true}})
    private addresses:Addresses = null;

    @block({component: Actions, databaseopts: {insert: false, update: false, delete: false, query: true}})
    private actions:Actions = null;


    @connect
    public async onConnect() : Promise<boolean>
    {
        this.addresses.enterquery();
        return(true);
    }


    @keytrigger(keymap.clearform)
    public async clrform(event:KeyTriggerEvent) : Promise<boolean>
    {
        await this.clear();
        this.addresses.enterquery();
        return(false);
    }


    @keytrigger(keymap.nextfield)
    public async completeStreet(event:KeyTriggerEvent) : Promise<boolean>
    {
        if (this.addresses.querymode && event.field == "street_name")
        {
            let ts:TextSearch = new TextSearch();

            let stname:string = this.addresses.getValue(event.record,event.field);
            let zipcode:string = this.addresses.getValue(event.record,"zip_code");

            stname = ts.getWordList(stname);
            let test:any = ts.getWordList;

            console.log("test: "+test.constructor.name);
            let testq:string = test("hello*");
            console.log("testq: "+testq);

            if (stname != null && stname.trim().length > 0)
            {
                let stmt:Statement = null;

                if (zipcode != null && zipcode.trim().length > 0)
                {
                    stmt = new Statement(
                        `
                        select street_name from ks.street_names
                        where zip_code = :zipcode 
                        and to_tsvector('danish',street_name) @@ to_tsquery('danish',:stname)
                        `
                    ).bind("zipcode",zipcode,Column.varchar).bind("stname",stname,Column.varchar);
                }
                else
                {
                    stmt = new Statement(
                        `
                        select street_name from ks.street_names
                        where to_tsvector('danish',street_name) @@ to_tsquery('danish',:stname)
                        `
                    ).bind("stname",stname,Column.varchar);
                }

                stmt.rows(2);
                let stnames:string[] = await this.execute(stmt,false,false);

                if (stnames.length == 1) this.addresses.setValue(0,"street_name",stnames[0]["street_name"]);
                else this.addresses.showListOfValues("street_name");
            }
        }

        return(true);
    }


    @keytrigger(keymap.executequery)
    public async alwaysQuery(event:KeyTriggerEvent) : Promise<boolean>
    {
        if (event.block == "addresses")
        {
            await this.addresses.executequery();
            if (this.addresses.empty()) this.addresses.enterquery(true);
            return(false);
        }

        if (event.block != "addresses")
        {
            this.addresses.sendKey(keymap.executequery);
            return(false);
        }

        return(true);
    }


    @listofvalues("addresses.street_name")
    public streetNames() : ListOfValues
    {
        let lov:ListOfValues = null;
        let record:number = this.addresses.record;
        let zipcode:string = this.addresses.getValue(record,"zip_code");
        let stname:string = this.addresses.getValue(record,"street_name");

        if (zipcode != null && zipcode.trim().length > 0)
        {
            lov = 
            {
                minlen: 2,
                value: stname,
                autoquery: true,
                title: "Street Names",
                case: Case.mixed,
                sql: 
                    `
                    select street_name, zip_code||' '||street_name from ks.street_names
                    where zip_code = :zipcode 
                    and to_tsvector('danish',street_name) @@ to_tsquery('danish',:filter||':*')
                    `,
                fieldmap: new Map<string,string>().set("street_name","street_name"),
                bindvalues: [{name: "zipcode", value: zipcode, type: Column.varchar}]    
            }
        }
        else
        {
            lov = 
            {
                minlen: 2,
                value: stname,
                autoquery: true,
                title: "Street Names",
                case: Case.mixed,
                sql: 
                    `
                    select street_name, zip_code||' '||street_name from ks.street_names
                    where to_tsvector('danish',street_name) @@ to_tsquery('danish',:filter||':*')
                    `,
                fieldmap: new Map<string,string>().set("street_name","street_name")
            }
        }

        return(lov);
    }


    @trigger(Trigger.PreQuery,"addresses")
    public async prequeryAddresses(event:SQLTriggerEvent) : Promise<boolean>
    {
        let streetq:string = null;
        let addressq:string = null;

        let ok:boolean = false;
        let ts:TextSearch = new TextSearch();

        this.addresses.searchfilter.forEach((filter) =>
        {
            if (filter.name == "address") 
            {
                ok = true;
                addressq = ts.getWordList(filter.value);
            }

            if (filter.name == "street_name") 
            {
                ok = true;
                streetq = ts.getWordList(filter.value);
            }
        });

        this.actions.searchfilter.forEach((filter) =>
        {
            if (filter.name == "name") ok = true;
            if (filter.name == "order_reference") ok = true;
        });

        if (!ok)
        {
            this.alert("Der skal søges på mindst et af felterne navn, adresse, abonent eller konto");
            return(false);
        }

        // Adresse is not a database field
        // and not set as condition
        this.addresses.searchfilter.forEach((filter) =>
        {
            if (filter.name == 'address')
                event.stmt.whand(filter.name,'"'+filter.value+'"');
        });

        let conditions:Condition[] = event.stmt.getCondition()?.split();

        if (conditions) conditions.forEach((cond) =>
        {
            if (cond.column == 'address')
            {
                cond.setValue(addressq);
                let tsquery:string = ts.getQueryFunction();
                let columns:string = "coalesce(street_name,' ')||' '||house_number||coalesce(house_letter,' ')||' '||coalesce(floor::varchar,' ')||' '||coalesce(apartment,' ')||' '||coalesce(Zip_Code,' ')||' '||coalesce(City,' ')";
                cond.setCondition("to_tsvector('danish',"+columns+") @@ "+tsquery+"('danish',:"+cond.placeholder+")");
            }

            if (cond.column == 'street_name')
            {
                cond.setValue(streetq);
                let tsquery:string = ts.getQueryFunction();
                let columns:string = "street_name";
                cond.setCondition("to_tsvector('danish',"+columns+") @@ "+tsquery+"('danish',:"+cond.placeholder+")");
            }
        });

        return(true);
    }


    @trigger(Trigger.PreQuery,"actions")
    public async prequeryActions(event:SQLTriggerEvent) : Promise<boolean>
    {
        let nameq:string = null;
        let ts:TextSearch = new TextSearch();

        this.actions.searchfilter.forEach((filter) =>
        {
            if (filter.name == "name") 
            {
                nameq = ts.getWordList(filter.value);
            }
        });

        let conditions:Condition[] = event.stmt.getCondition()?.split();

        if (conditions) conditions.forEach((cond) =>
        {
            if (cond.column == 'name')
            {
                cond.setValue(nameq);
                let tsquery:string = ts.getQueryFunction();
                let columns:string = "name";
                cond.setCondition("to_tsvector('danish',"+columns+") @@ "+tsquery+"('danish',:"+cond.placeholder+")");
           }
        });

        return(true);
    }


    @trigger(Trigger.PostQuery)
    public async address(event:SQLTriggerEvent) : Promise<boolean>
    {
        if (event.block != "addresses")
          return(true);
          
        let address:string = "";
        address += this.addresses.getValue(event.record,"street_name")+" "; 
        address += this.addresses.getValue(event.record,"house_number"); 
        address += this.addresses.getValue(event.record,"house_letter")+" ";
        address += this.addresses.getValue(event.record,"floor")+" "; 
        address += this.addresses.getValue(event.record,"apartment")+" ";
        address += this.addresses.getValue(event.record,"zip_code")+" ";
        address += this.addresses.getValue(event.record,"city")+" ";

        address = address.trim();
        while(address.indexOf("  ") >= 0) address = address.replace("  "," ");

        this.addresses.setValue(event.record,"address",address);
        return(true);
    }
}