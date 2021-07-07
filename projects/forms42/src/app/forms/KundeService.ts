import { Component } from '@angular/core';
import { Kunder } from '../blocks/Kunder';
import { Ordrer } from '../blocks/Ordrer';
import { Form, Block, block, field, FieldType, FieldDefinition, show } from 'forms42';



@Component({
    templateUrl: "kundeservice.html",
    styleUrls: ['kundeservice.css']
})


@field({name: "ctrl.type",      type: FieldType.text })
@field({name: "ctrl.fra_dato",  type: FieldType.date })
@field({name: "ctrl.til_dato",  type: FieldType.date })

@block({component: Kunder})
@block({component: Ordrer})


export class KundeService extends Form
{
    @show
    public async init() : Promise<boolean>
    {
        let ctrl:Block = this.getBlock("ctrl");
        await ctrl.createControlRecord();

        ctrl.setFieldDefinition({name: "type", type: FieldType.dropdown});

        let types:Set<string> = new Set<string>();

        types.add("");
        types.add("Salg");
        types.add("Abon");

        ctrl.setPossibleValues("type",types,true);
        
        let fra:Date = new Date();
        let til:Date = new Date();
        fra.setDate(fra.getDate()-7);

        ctrl.setValue(0,"fra_dato",fra);
        ctrl.setValue(0,"til_dato",til);
        return(true);
    }
}