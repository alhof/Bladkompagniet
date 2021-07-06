import { Form, block } from 'forms42';
import { Component } from '@angular/core';
import { Kunder } from '../blocks/Kunder';



@Component({
    templateUrl: "kundeservice.html",
    styleUrls: ['kundeservice.css']
})

@block({component: Kunder})


export class KundeService extends Form
{

}