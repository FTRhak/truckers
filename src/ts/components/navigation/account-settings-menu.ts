import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'account-settings-menu',
    template: `
        <button md-icon-button [mdMenuTriggerFor]="menuAccountSettings">
            <md-icon>more_vert</md-icon>
        </button>
        <md-menu #menuAccountSettings="mdMenu">
            <button md-menu-item [routerLink]="['/user']">
                <md-icon>&#xE7FD;</md-icon>
                <span>{{ 'accountSettingsMenu.profile' | translate:lang }}</span>
            </button>
            <button md-menu-item  [routerLink]="['/user/settings']">
                <md-icon>&#xE8B8;</md-icon>
                <span>{{ 'accountSettingsMenu.setting' | translate:lang }}</span>
            </button>
            <button md-menu-item [routerLink]="['/logout']">
                <md-icon>&#xE8AC;</md-icon>
                <span>{{ 'accountSettingsMenu.logout' | translate:lang }}</span>
            </button>
        </md-menu>
        `,
})
export class AccountSettingsMenu implements OnInit {
    constructor() { }
    ngOnInit() {

    }
}