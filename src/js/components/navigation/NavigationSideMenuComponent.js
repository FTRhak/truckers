(function (ng, app, Component, ROUTER_DIRECTIVES, Server) {
    'use strict';

    app.NavigationSideMenuComponent = Component({
        selector: '[navigate-side-menu]',
        template: `
<button class="md-icon-button md-button" type="button" (click)="openMenu()" aria-label="Toggle Menu">
    <md-icon class="material-icons" tabindex="0">&#xE5D2;</md-icon>
</button>
<md-sidenav class="md-sidenav-left" md-component-id="right" tabindex="-1" *ngIf="showMenu" (blur)="hideMenu()">
    <md-content navigate-menu></md-content>
</md-sidenav>
        `,
        directives: [ROUTER_DIRECTIVES, app.NavigationMenuComponent]
    }).Class({
        constructor: [function NavigationSideMenuComponentConstructor() {
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