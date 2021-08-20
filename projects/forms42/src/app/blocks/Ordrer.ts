import { alias, Block, table, column, key, Column, trigger, Trigger, SQLTriggerEvent } from "forms42";

@alias("ordrer")
@table({name: "ks.bk_ordrer", order: "dist_dato", where: "bkku_id is not null"})

@column({name: "id"                , type: Column.integer   , mandatory: true})
@column({name: "bkku_id"           , type: Column.integer   , mandatory: true})
@column({name: "dist_dato"         , type: Column.date      , mandatory: true})
@column({name: "udkomst_dato"      , type: Column.date      , mandatory: true})
@column({name: "abol_id"           , type: Column.integer })
@column({name: "ordf_id"           , type: Column.integer })
@column({name: "konto_nr"          , type: Column.integer })
@column({name: "abonnr"            , type: Column.integer })
@column({name: "subtype"           , type: Column.varchar })
@column({name: "ordre_type"        , type: Column.varchar })
@column({name: "afleveringskode"   , type: Column.integer })
@column({name: "afleverings_tekst" , type: Column.varchar })
@column({name: "produkt_nr"        , type: Column.integer   , mandatory: true})
@column({name: "produkt_navn"      , type: Column.varchar   , mandatory: true})
@column({name: "leverings_antal"   , type: Column.integer })

@key("primary",true,"id")
@key("kunde",true,"bkku_id")

export class Ordrer extends Block
{
}