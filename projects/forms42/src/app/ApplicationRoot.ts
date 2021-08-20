import { Component } from '@angular/core';
import { Application, Form, Theme } from 'forms42';
import { defaultTheme } from '../../../../../FormsLibrary/dist/forms/lib/application/Themes';


@Component({
    selector: 'forms-app',
    templateUrl: './ApplicationRoot.html',
    styleUrls: [ './ApplicationRoot.css' ]
})


export class ApplicationRoot
{
    public sidenav:boolean = false;

    constructor(private app:Application)
    {
        let theme:Theme = new defaultTheme();
        theme.topbar = "red";
    }

    public get form() : Form
    {
        return(this.app.form);
    }

    public get popup() : boolean
    {
        return(this.app.form?.popup);
    }

    public get barcolor() : string
    {
        return(this.app.colors.topbar);
    }

    public get btncolor() : string
    {
        return(this.app.colors.menuoption);
    }

    public close() : void
    {
        this.app.closeform(true);
    }
}