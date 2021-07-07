<div class='bk_ordrer'>
  <table>
    <tr>
      <th style='padding-left: 0;'><span class='filter' [style.background-color]='getBlockFilter("bk_ordrer")'></span></th>
      <th>Id                </th>
      <th>DistDato          </th>
      <th>UdkomstDato       </th>
    </tr>

    <tr *ngFor='let item of [].constructor(4); let row = index'>
      <td class='indicator' [style.background-color]='getRowIndicator("bk_ordrer",row)'></td>
      <td><field row='{{row}}' name='id'                 size='12' id='table' block='bk_ordrer'></field></td>
      <td><field row='{{row}}' name='dist_dato'          size='12' id='table' block='bk_ordrer'></field></td>
      <td><field row='{{row}}' name='udkomst_dato'       size='12' id='table' block='bk_ordrer'></field></td>
    </tr>
  </table>

  <div class=bk_ordrer-detail>
    <div> <span class='label'>Id                </span> : <field name='id'                 size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>DistDato          </span> : <field name='dist_dato'          size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>UdkomstDato       </span> : <field name='udkomst_dato'       size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>AbolId            </span> : <field name='abol_id'            size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>OrdfId            </span> : <field name='ordf_id'            size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>KontoNr           </span> : <field name='konto_nr'           size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>Abonnr            </span> : <field name='abonnr'             size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>Subtype           </span> : <field name='subtype'            size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>OrdreType         </span> : <field name='ordre_type'         size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>Afleveringskode   </span> : <field name='afleveringskode'    size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>AfleveringsTekst  </span> : <field name='afleverings_tekst'  size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>ProduktNr         </span> : <field name='produkt_nr'         size='12' block='bk_ordrer'></field></div>
    <div> <span class='label'>LeveringsAntal    </span> : <field name='leverings_antal'    size='12' block='bk_ordrer'></field></div>
  </div>
</div>