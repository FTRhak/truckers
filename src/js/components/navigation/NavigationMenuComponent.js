(function (ng, app, Component, ROUTER_DIRECTIVES, Server) {
    'use strict';

    app.NavigationMenuComponent = Component({
        selector: '[navigate-menu]',
        template: `
<md-menu-content class="md-menu-bar-menu md-dense" role="menu">
    <md-menu-item class="md-in-menu-bar">
        <a [routerLink]="['UserProfile']">Profile</a>
    </md-menu-item>
    <md-menu-item class="md-in-menu-bar">
        <a href="#">Map</a>
    </md-menu-item>
</md-menu-content>
        `,
        directives: [ROUTER_DIRECTIVES]
    }).Class({
        constructor: [function NavigationMenuComponentConstructor() {

        }]
    });

})(
    ng,
    window.app,
    ng.core.Component,
    ng.router.ROUTER_DIRECTIVES,
    window.app.Server
    );