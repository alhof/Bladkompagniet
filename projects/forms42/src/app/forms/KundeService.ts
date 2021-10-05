import { Component } from '@angular/core';
import { Addresses } from '../blocks/Addresses';
import { Form, block, trigger, Trigger, SQLTriggerEvent, Condition } from 'forms42';


@Component({
    templateUrl: "KundeService.html",
    styleUrls: ['KundeService.css']
})

export class KundeService extends Form
{
    @block({component: Addresses})
    private addresses:Addresses = null;


    @trigger(Trigger.PreQuery,"addresses")
    public async prequeryKunder(event:SQLTriggerEvent) : Promise<boolean>
    {
        let ok:boolean = false;

        this.addresses.searchfilter.forEach((filter) =>
        {
            if (filter.name == "street_name") ok = true;
        });

        if (!ok)
        {
            this.alert("Der skal søges på mindst et af felterne navn, adresse, abonent eller konto");
            return(false);
        }

        let conditions:Condition[] = event.stmt.getCondition()?.split();

        if (conditions) conditions.forEach((cond) =>
        {
            console.log("streetname query, search <"+cond.getValue()+'>');
            if (cond.column == 'street_name')
                cond.setCondition("to_tsvector('danish',coalesce(street_name,' ')||' '||house_number||' '||coalesce(house_letter,' ')||' '||coalesce(floor::varchar,' ')||' '||coalesce(apartment,' ')) @@ websearch_to_tsquery('danish',:"+cond.placeholder+")");
        });

        return(true);
    }
}
