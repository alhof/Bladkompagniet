<div class='addresses'>
  <table>
    <tr>
      <th style='padding-left: 0;'><span class='filter' [style.background-color]='getBlockFilter("addresses")'></span></th>
      <th>Id            </th>
      <th>HusnId        </th>
      <th>StreetName    </th>
    </tr>

    <tr *ngFor='let item of [].constructor(4); let row = index'>
      <td class='indicator' [style.background-color]='getRowIndicator("addresses",row)'></td>
      <td><field row='{{row}}' name='id'             size='12' id='table' block='addresses'></field></td>
      <td><field row='{{row}}' name='husn_id'        size='12' id='table' block='addresses'></field></td>
      <td><field row='{{row}}' name='street_name'    size='12' id='table' block='addresses'></field></td>
    </tr>
  </table>

  <div class=addresses-detail>
    <div> <span class='label'>Id            </span> : <field name='id'             size='12' block='addresses'></field></div>
    <div> <span class='label'>HusnId        </span> : <field name='husn_id'        size='12' block='addresses'></field></div>
    <div> <span class='label'>StreetName    </span> : <field name='street_name'    size='12' block='addresses'></field></div>
    <div> <span class='label'>HouseNumber   </span> : <field name='house_number'   size='12' block='addresses'></field></div>
    <div> <span class='label'>HouseLetter   </span> : <field name='house_letter'   size='12' block='addresses'></field></div>
    <div> <span class='label'>Floor         </span> : <field name='floor'          size='12' block='addresses'></field></div>
    <div> <span class='label'>Apartment     </span> : <field name='apartment'      size='12' block='addresses'></field></div>
    <div> <span class='label'>ZipCode       </span> : <field name='zip_code'       size='12' block='addresses'></field></div>
    <div> <span class='label'>City          </span> : <field name='city'           size='12' block='addresses'></field></div>
    <div> <span class='label'>OprettetDato  </span> : <field name='oprettet_dato'  size='12' block='addresses'></field></div>
    <div> <span class='label'>OprettetAf    </span> : <field name='oprettet_af'    size='12' block='addresses'></field></div>
    <div> <span class='label'>RettetDato    </span> : <field name='rettet_dato'    size='12' block='addresses'></field></div>
    <div> <span class='label'>RettetAf      </span> : <field name='rettet_af'      size='12' block='addresses'></field></div>
  </div>
</div>