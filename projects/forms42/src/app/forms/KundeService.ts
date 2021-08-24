import { Component } from '@angular/core';
import { Kunder } from '../blocks/Kunder';
import { Ordrer } from '../blocks/Ordrer';
import { Form, Block, block, field, FieldType, trigger, Trigger, keytrigger, KeyTriggerEvent, FieldTriggerEvent, SQLTriggerEvent, Condition, Column, DateUtils, keymap, join, show, connect } from 'forms42';


@Component({
    templateUrl: "kundeservice.html",
    styleUrls: ['kundeservice.css']
})


@field({name: "ctrl.type",      type: FieldType.text })
@field({name: "ctrl.fra_dato",  type: FieldType.date })
@field({name: "ctrl.til_dato",  type: FieldType.date })

@join({master: {alias: "kunder", key: "primary"}, detail: {alias: "ordrer", key: "kunde"}})


export class KundeService extends Form
{
    @block({component: Kunder, databaseopts: {insert: false, update: false, delete: false}})
    private kunder:Kunder = null;

    @block({component: Ordrer, databaseopts: {insert: false, update: false, delete: false}})
    private ordrer:Ordrer = null;


    @keytrigger(keymap.clearblock)
    public async clrctrl(event:KeyTriggerEvent) : Promise<boolean>
    {
        if (event.block == 'ctrl') return(false);
        return(true);
    }


    @keytrigger(keymap.clearform)
    public async clrform(event:KeyTriggerEvent) : Promise<boolean>
    {
        await this.clear();
        this.kunder.enterquery();
        return(false);
    }



    @trigger(Trigger.PostChange,"ctrl")
    public async ctrlChange(event:FieldTriggerEvent) : Promise<boolean>
    {
        if (this.connected && !this.kunder.querymode)
            this.ordrer.executequery();

        return(true);
    }


    @keytrigger(keymap.executequery)
    public async alwaysQuery(event:KeyTriggerEvent) : Promise<boolean>
    {
        if (event.block == "kunder")
        {
            await this.kunder.executequery();
            if (this.kunder.empty()) this.kunder.enterquery(true);
            return(false);
        }

        if (event.block == "ordrer")
        {
            this.kunder.sendKey(keymap.executequery);
            return(false);
        }

        return(true);
    }


    @trigger(Trigger.PreQuery,"kunder")
    public async prequeryKunder(event:SQLTriggerEvent) : Promise<boolean>
    {
        let ok:boolean = false;

        this.kunder.searchfilter.forEach((filter) =>
        {
            if (filter.name == "navn") ok = true;
            if (filter.name == "adresse") ok = true;
            if (filter.name == "abon_nr") ok = true;
            if (filter.name == "konto_nr") ok = true;
        });

        if (!ok)
        {
            this.alert("Der skal søges på mindst et af felterne navn, adresse, abonent eller konto");
            return(false);
        }

        // Adresse is not a database field
        // and not set as condition
        this.kunder.searchfilter.forEach((filter) =>
        {
            if (filter.name == 'adresse')
                event.stmt.whand(filter.name,'"'+filter.value+'"');
        });

        let conditions:Condition[] = event.stmt.getCondition()?.split();

        if (conditions) conditions.forEach((cond) =>
        {
            if (cond.column == 'navn')
                cond.setCondition("to_tsvector('danish',navn) @@ websearch_to_tsquery('danish',:"+cond.placeholder+")");

            if (cond.column == 'adresse')
                cond.setCondition("to_tsvector('danish',coalesce(gadenavn,' ')||' '||coalesce(postnr,' ')||' '||coalesce(postdistrikt,' ')||' '||coalesce(hus_nr::varchar,' ')||' '||coalesce(litra,' ')||' '||coalesce(etage,' ')) @@ websearch_to_tsquery('danish',:"+cond.placeholder+")");
        });

        return(true);
    }


    @trigger(Trigger.PreQuery,"ordrer")
    public async prequeryOrdrer(event:SQLTriggerEvent) : Promise<boolean>
    {
        let dates:DateUtils = new DateUtils();
        let ctrl:Block = this.getBlock("ctrl");

        let datefr:string = ">= "+dates.format(ctrl.getValue(0,"fra_dato"));
        let dateto:string = "<= "+dates.format(ctrl.getValue(0,"til_dato"));

        event.stmt.whand("udkomst_dato",datefr,Column.date);
        event.stmt.whand("udkomst_dato",dateto,Column.date);

        let type:string = ctrl.getValue(0,"type");

        if (type != null && type.length > 0)
            event.stmt.whand("subtype",type.toUpperCase());

        return(true);
    }


    @connect
    public async onConnect() : Promise<boolean>
    {
        this.kunder.enterquery();
        return(true);
    }


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
        types.add("Post");
        types.add("Depo");

        ctrl.setPossibleValues("type",types,true);

        let fra:Date = new Date();
        let til:Date = new Date();
        fra.setDate(fra.getDate()-7);

        ctrl.setValue(0,"fra_dato",fra);
        ctrl.setValue(0,"til_dato",til);

        return(true);
    }
}