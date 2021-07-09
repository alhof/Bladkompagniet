import { key, Block, table, column, Column, field, FieldType, trigger, Trigger, FieldTriggerEvent, SQLTriggerEvent, Condition } from 'forms42';

@key("primary",true,"id")
@table({name: "bk_kunder", limit: 'limit 100'})

@column({name: "id"                 , type: Column.integer})
@column({name: "abon_nr"            , type: Column.integer})
@column({name: "konto_nr"           , type: Column.integer})
@column({name: "navn"               , type: Column.varchar})
@column({name: "co_navn"            , type: Column.varchar})
@column({name: "supl_adr"           , type: Column.varchar})
@column({name: "afleverings_kode"   , type: Column.varchar})
@column({name: "afleverings_tekst"  , type: Column.varchar})
@column({name: "gadenavn"           , type: Column.varchar})
@column({name: "hus_nr"             , type: Column.integer})
@column({name: "litra"              , type: Column.varchar})
@column({name: "etage"              , type: Column.varchar})
@column({name: "side_lejlighed"     , type: Column.varchar})
@column({name: "postnr"             , type: Column.varchar})
@column({name: "postdistrikt"       , type: Column.varchar})
@column({name: "abde_id"            , type: Column.varchar})

@field({name: "adresse", type: FieldType.text })



export class Kunder extends Block
{
    @trigger(Trigger.PreQuery)
    public async prequery(event:SQLTriggerEvent) : Promise<boolean>
    {
        // Adresse is not a database field
        // and not set as condition
        this.searchfilter.forEach((filter) =>
        {
            if (filter.name == 'adresse')
                event.stmt.whand(filter.name,filter.value);
        });

        let conditions:Condition[] = event.stmt.getCondition()?.split();

        conditions.forEach((cond) =>
        {
            if (cond.column == 'navn')
                cond.setCondition("to_tsvector('danish',navn) @@ websearch_to_tsquery('danish',:"+cond.placeholder+")");

            if (cond.column == 'adresse')
                cond.setCondition("to_tsvector('danish',coalesce(gadenavn,' ')||' '||coalesce(postnr,' ')||coalesce(postdistrikt,' ')||' '||coalesce(hus_nr::varchar,' ')||' '||coalesce(litra,' ')||' '||coalesce(etage,' ')) @@ websearch_to_tsquery('danish',:"+cond.placeholder+")");
        });

        return(true);
    }



    @trigger(Trigger.PostChange,["gadenavn","hus_nr","litra","etage","postnr","postdistrikt"])
    public async adresse(event:FieldTriggerEvent) : Promise<boolean>
    {
        let adresse:string = "";

        adresse += this.getValue(event.record,"gadenavn"    ) + " ";
        adresse += this.getValue(event.record,"hus_nr"      ) + " ";
        adresse += this.getValue(event.record,"litra"       ) + " ";
        adresse += this.getValue(event.record,"etage"       ) + " ";
        adresse += this.getValue(event.record,"postnr"      ) + " ";
        adresse += this.getValue(event.record,"postdistrikt") + " ";

        this.setValue(event.record,"adresse",adresse.replace(/\s{2,}/g,' '));
        return(true);
    }
}