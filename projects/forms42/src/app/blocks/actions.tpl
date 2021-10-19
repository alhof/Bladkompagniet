<div class='actions'>
  <table>
    <tr>
      <th style='padding-left: 0;'><span class='filter' [style.background-color]='getBlockFilter("actions")'></span></th>
      <th>Id                        </th>
      <th>OradId                    </th>
      <th>ActionType                </th>
    </tr>

    <tr *ngFor='let item of [].constructor(4); let row = index'>
      <td class='indicator' [style.background-color]='getRowIndicator("actions",row)'></td>
      <td><field row='{{row}}' name='id'                         size='12' id='table' block='actions'></field></td>
      <td><field row='{{row}}' name='orad_id'                    size='12' id='table' block='actions'></field></td>
      <td><field row='{{row}}' name='action_type'                size='12' id='table' block='actions'></field></td>
    </tr>
  </table>

  <div class=actions-detail>
    <div> <span class='label'>Id                        </span> : <field name='id'                         size='12' block='actions'></field></div>
    <div> <span class='label'>OradId                    </span> : <field name='orad_id'                    size='12' block='actions'></field></div>
    <div> <span class='label'>ActionType                </span> : <field name='action_type'                size='12' block='actions'></field></div>
    <div> <span class='label'>ActionLocationType        </span> : <field name='action_location_type'       size='12' block='actions'></field></div>
    <div> <span class='label'>OrderType                 </span> : <field name='order_type'                 size='12' block='actions'></field></div>
    <div> <span class='label'>OrderSubType              </span> : <field name='order_sub_type'             size='12' block='actions'></field></div>
    <div> <span class='label'>OrderSource               </span> : <field name='order_source'               size='12' block='actions'></field></div>
    <div> <span class='label'>OrderReference            </span> : <field name='order_reference'            size='12' block='actions'></field></div>
    <div> <span class='label'>Name                      </span> : <field name='name'                       size='12' block='actions'></field></div>
    <div> <span class='label'>AdditionalName            </span> : <field name='additional_name'            size='12' block='actions'></field></div>
    <div> <span class='label'>AbolId                    </span> : <field name='abol_id'                    size='12' block='actions'></field></div>
    <div> <span class='label'>OrdfId                    </span> : <field name='ordf_id'                    size='12' block='actions'></field></div>
    <div> <span class='label'>PrpdId                    </span> : <field name='prpd_id'                    size='12' block='actions'></field></div>
    <div> <span class='label'>Quantity                  </span> : <field name='quantity'                   size='12' block='actions'></field></div>
    <div> <span class='label'>AdditionalDeliveryCode    </span> : <field name='additional_delivery_code'   size='12' block='actions'></field></div>
    <div> <span class='label'>AdditionalDeliveryText    </span> : <field name='additional_delivery_text'   size='12' block='actions'></field></div>
    <div> <span class='label'>OrderLabel                </span> : <field name='order_label'                size='12' block='actions'></field></div>
    <div> <span class='label'>Dimension1                </span> : <field name='dimension_1'                size='12' block='actions'></field></div>
    <div> <span class='label'>Dimension2                </span> : <field name='dimension_2'                size='12' block='actions'></field></div>
    <div> <span class='label'>Dimension3                </span> : <field name='dimension_3'                size='12' block='actions'></field></div>
    <div> <span class='label'>Weight                    </span> : <field name='weight'                     size='12' block='actions'></field></div>
    <div> <span class='label'>SizeCategory              </span> : <field name='size_category'              size='12' block='actions'></field></div>
    <div> <span class='label'>DistributionDatePlanned   </span> : <field name='distribution_date_planned'  size='12' block='actions'></field></div>
    <div> <span class='label'>EtaPlanned                </span> : <field name='eta_planned'                size='12' block='actions'></field></div>
    <div> <span class='label'>ActionDateTime            </span> : <field name='action_date_time'           size='12' block='actions'></field></div>
    <div> <span class='label'>ActionLongitude           </span> : <field name='action_longitude'           size='12' block='actions'></field></div>
    <div> <span class='label'>ActionLatitude            </span> : <field name='action_latitude'            size='12' block='actions'></field></div>
    <div> <span class='label'>ActionSwipeDistance       </span> : <field name='action_swipe_distance'      size='12' block='actions'></field></div>
    <div> <span class='label'>DistributionDistributor   </span> : <field name='distribution_distributor'   size='12' block='actions'></field></div>
    <div> <span class='label'>DistributionArea          </span> : <field name='distribution_area'          size='12' block='actions'></field></div>
    <div> <span class='label'>DistributionProfile       </span> : <field name='distribution_profile'       size='12' block='actions'></field></div>
    <div> <span class='label'>DistributionJob           </span> : <field name='distribution_job'           size='12' block='actions'></field></div>
    <div> <span class='label'>AccessInformation         </span> : <field name='access_information'         size='12' block='actions'></field></div>
    <div> <span class='label'>MailpieceId               </span> : <field name='mailpiece_id'               size='12' block='actions'></field></div>
    <div> <span class='label'>ElabelCode                </span> : <field name='elabel_code'                size='12' block='actions'></field></div>
    <div> <span class='label'>BoxId                     </span> : <field name='box_id'                     size='12' block='actions'></field></div>
    <div> <span class='label'>BoxShelf                  </span> : <field name='box_shelf'                  size='12' block='actions'></field></div>
    <div> <span class='label'>PinCode                   </span> : <field name='pin_code'                   size='12' block='actions'></field></div>
    <div> <span class='label'>BarcodeType               </span> : <field name='barcode_type'               size='12' block='actions'></field></div>
    <div> <span class='label'>Barcode                   </span> : <field name='barcode'                    size='12' block='actions'></field></div>
    <div> <span class='label'>DistributedBy             </span> : <field name='distributed_by'             size='12' block='actions'></field></div>
    <div> <span class='label'>InvoiceBy                 </span> : <field name='invoice_by'                 size='12' block='actions'></field></div>
    <div> <span class='label'>Cancelled                 </span> : <field name='cancelled'                  size='12' block='actions'></field></div>
    <div> <span class='label'>OprettetDato              </span> : <field name='oprettet_dato'              size='12' block='actions'></field></div>
    <div> <span class='label'>OprettetAf                </span> : <field name='oprettet_af'                size='12' block='actions'></field></div>
    <div> <span class='label'>RettetDato                </span> : <field name='rettet_dato'                size='12' block='actions'></field></div>
    <div> <span class='label'>RettetAf                  </span> : <field name='rettet_af'                  size='12' block='actions'></field></div>
  </div>
</div>