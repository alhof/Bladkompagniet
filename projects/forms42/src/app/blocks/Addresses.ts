import { alias, Block, table, column, key, Column } from "forms42";

@alias("addresses")
@table({name: "ks.order_addresses", order: "street_name,zip_code,city,house_number,house_letter,floor,apartment"})

@column({name: "id"            , type: Column.integer })
@column({name: "husn_id"       , type: Column.integer })
@column({name: "street_name"   , type: Column.varchar })
@column({name: "house_number"  , type: Column.integer })
@column({name: "house_letter"  , type: Column.varchar })
@column({name: "floor"         , type: Column.varchar })
@column({name: "apartment"     , type: Column.varchar })
@column({name: "zip_code"      , type: Column.varchar })
@column({name: "city"          , type: Column.varchar })
@column({name: "oprettet_dato" , type: Column.datetime})
@column({name: "oprettet_af"   , type: Column.varchar })
@column({name: "rettet_dato"   , type: Column.datetime})
@column({name: "rettet_af"     , type: Column.varchar })

@key("primary",true,"id")



export class Addresses extends Block
{
}