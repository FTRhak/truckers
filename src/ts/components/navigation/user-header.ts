import { Component, OnInit } from '@angular/core';

import { AppSettins } from './../../settings';

@Component({
    selector: 'header[user]',
    template: `
        <md-toolbar>
            <span>{{appName}}</span>
            <div class="flex-auto"></div>
            <account-settings-menu></account-settings-menu>
        </md-toolbar>`,
    providers: [AppSettins]
})
export class UserHeader implements OnInit {
    appName: string;
    constructor(private settins: AppSettins) { }
    ngOnInit() {
        this.appName = this.settins.appName;
    }

}