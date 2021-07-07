import { alias, Block, table, column, key, Column } from "forms42";

@alias("ordrer")
@table({name: "bk_ordrer", order: "id"})

@column({name: "id"                , type: Column.decimal   , mandatory: true})
@column({name: "dist_dato"         , type: Column.date      , mandatory: true})
@column({name: "udkomst_dato"      , type: Column.date      , mandatory: true})
@column({name: "abol_id"           , type: Column.decimal })
@column({name: "ordf_id"           , type: Column.decimal })
@column({name: "konto_nr"          , type: Column.decimal })
@column({name: "abonnr"            , type: Column.decimal })
@column({name: "subtype"           , type: Column.varchar })
@column({name: "ordre_type"        , type: Column.varchar })
@column({name: "afleveringskode"   , type: Column.decimal })
@column({name: "afleverings_tekst" , type: Column.varchar })
@column({name: "produkt_nr"        , type: Column.decimal   , mandatory: true})
@column({name: "leverings_antal"   , type: Column.decimal })

@key("primary",true,"id")

export class Ordrer extends Block
{
}