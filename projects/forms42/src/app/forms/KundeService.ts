import { Component } from '@angular/core';
import { Actions } from '../blocks/Actions';
import { Addresses } from '../blocks/Addresses';
import { TextSearch } from '../classes/TextSearch';
import { Form, block, join, field, FieldType, trigger, Trigger, SQLTriggerEvent, Condition } from 'forms42';


@Component({
    templateUrl: "KundeService.html",
    styleUrls: ['KundeService.css']
})

@field({name: "addresses.address", type: FieldType.text })
@join({master: {alias: "addresses", key: "primary"}, detail: {alias: "actions", key: "address"}})


export class KundeService extends Form
{
    @block({component: Addresses})
    private addresses:Addresses = null;

    @block({component: Actions})
    private actions:Actions = null;


    @trigger(Trigger.PreQuery,"addresses")
    public async prequeryKunder(event:SQLTriggerEvent) : Promise<boolean>
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
                let columns:string = "coalesce(street_name,' ')";
                cond.setCondition("to_tsvector('danish',"+columns+") @@ "+tsquery+"('danish',:"+cond.placeholder+")");
            }
        });

        return(true);
    }


    @trigger(Trigger.PostQuery)
    public async address(event:SQLTriggerEvent) : Promise<boolean>
    {
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