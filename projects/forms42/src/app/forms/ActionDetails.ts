import { Component } from '@angular/core';
import { Actions } from '../blocks/Actions';
import { Form, block, show, trigger, Column, Trigger, SQLTriggerEvent} from 'forms42';




@Component({
    templateUrl: "ActionDetails.html",
    styleUrls: ['ActionDetails.css']
})

@block({component: Actions, databaseopts: {insert: false, update: false, delete: false, query: false}})

export class ActionDetails extends Form
{
    @show
    public async autoquery()
    {
        console.log("Autoquery ? "+this.parameters.size);
        if (this.parameters.size > 0)
            this.executequery(true);
    }


    @trigger(Trigger.PreQuery)
    public async prequery(event:SQLTriggerEvent) : Promise<boolean>
    {
        let id:number = this.parameters.get("id");
        console.log("Action details for "+id);

        if (id != null)
        {
            event.stmt.whand("id",id,Column.integer);
            return(true);
        }

        return(false);
    }
}