import { Component } from '@angular/core';
import { Addresses } from '../blocks/Addresses';
import { Form, block, field, FieldType, trigger, Trigger, SQLTriggerEvent, Condition } from 'forms42';


@Component({
    templateUrl: "KundeService.html",
    styleUrls: ['KundeService.css']
})

@field({name: "addresses.address", type: FieldType.text })


export class KundeService extends Form
{
    @block({component: Addresses})
    private addresses:Addresses = null;


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

        address = this.address_trim(address);
        this.addresses.setValue(event.record,"address",address);
        return(true);
    }


    @trigger(Trigger.PreQuery,"addresses")
    public async prequeryKunder(event:SQLTriggerEvent) : Promise<boolean>
    {
        let ok:boolean = false;

        this.addresses.searchfilter.forEach((filter) =>
        {
            if (filter.name == "address") 
            {
                ok = true;
                filter.value = this.address_search(filter.value);
            }

            if (filter.name == "street_name") ok = true;
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
            console.log("address query, search <"+cond.getValue()+'>');
            if (cond.column == 'address')
            {
                let tsquery:string = this.address_tsquery();
                let columns:string = "coalesce(street_name,' ')||' '||house_number||coalesce(house_letter,' ')||' '||coalesce(floor::varchar,' ')||' '||coalesce(apartment,' ')||' '||coalesce(Zip_Code,' ')||' '||coalesce(City,' ')";
                cond.setCondition("to_tsvector('danish',"+columns+") @@ "+tsquery+"('danish',:"+cond.placeholder+")");
            }
        });

        return(true);
    }


    public address_trim(crit:string) : string
    {
        crit = crit.trim();
        while(crit.indexOf("  ") >= 0) crit = crit.replace("  "," ");
        return(crit);
    }


    public address_tsquery() : string
    {
        return("to_tsquery");
    }


    public address_search(crit:string) : string
    {
        let words:string[] = crit.split(" ");

        crit = "";
        for (let i = 0; i < words.length; i++) 
            crit += "& "+words[i]+":* ";

        return(crit.substr(2).trim());
    }


    public street_search(crit:string) : string
    {
        return(crit);
    }
}
