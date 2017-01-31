import { Component, OnInit } from '@angular/core';

import { AppSettins } from './../../settings';

@Component({
    selector: 'header[anonymous]',
    template: `<md-toolbar>{{appName}}</md-toolbar>`,
    providers: [AppSettins]
})
export class Header implements OnInit {
    appName:string;
    constructor(private settins: AppSettins) { }
    ngOnInit() {
        this.appName = this.settins.appName;
    }

}