(function (ng, app, Component, ROUTER_DIRECTIVES, Server) {
    'use strict';

    app.SettinsComponent = Component({
        selector: '[settins-user]',
        template: `
<button class="md-icon-button md-button" type="button" (click)="openMenu()" aria-label="Settins Menu">
    <md-icon class="material-icons" tabindex="0">&#xE8B8;</md-icon>
</button>
<md-sidenav class="md-sidenav-right" md-component-id="right" tabindex="-1" *ngIf="showMenu">
    <md-content>
        <md-menu-content class="md-menu-bar-menu md-dense" width="5" role="menu">
            <md-menu-item class="md-in-menu-bar">
                <a [routerLink]="['ProfileEdit']" (click)="hideMenu()">Edit</a>
            </md-menu-item>
            <md-menu-item class="md-in-menu-bar">
                <a [routerLink]="['UserSettings']" (click)="hideMenu()">User Settings</a>
            </md-menu-item>
            <md-menu-item class="md-in-menu-bar">
                <a [routerLink]="['ProfileEditPassword']" (click)="hideMenu()">Change Password</a>
            </md-menu-item>
            <md-menu-item class="md-in-menu-bar">
                <a [routerLink]="['ProfileEditContactData']" (click)="hideMenu()">Change Contact Data</a>
            </md-menu-item>
            <md-menu-item class="md-in-menu-bar">
                <a [routerLink]="['Logout']">Logout</a>
            </md-menu-item>
        </md-menu-content>
    </md-content>
</md-sidenav>
        `,
        directives: [ROUTER_DIRECTIVES]
    }).Class({
        constructor: [function SettinsComponentConstructor() {
            this.showMenu = false;
        }],
        openMenu() {
            this.showMenu = !this.showMenu;
        },
        hideMenu() {
            this.showMenu = false;
        }
    });

})(
    ng,
    window.app,
    ng.core.Component,
    ng.router.ROUTER_DIRECTIVES,
    window.app.Server
    );