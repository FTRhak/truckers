(function (ng, app, Component, ROUTER_DIRECTIVES, Server) {
    'use strict';

    app.HeaderComponent = Component({
        selector: 'md-toolbar.header',
        template: `
            <div class="layout-row">
                <nav navigate-side-menu class="flex-none"></nav>
                <div class="flex-auto header-content"></div>
                <nav settins-user class="flex-none"></nav>
            </div>
        `,
        directives: [ROUTER_DIRECTIVES, app.SettinsComponent, app.NavigationSideMenuComponent],
        providers: [Server]
    }).Class({
        constructor: [Server, function HeaderComponentConstructor(server) {
            this.isShown = false;
            this.isLogin = false;
            this.isLogin = server.user.isLogin();
        }],
        showMenu: function () {
            this.isShown = true;
        },
        hideMenu: function () {
            this.isShown = false;
        }
    });

})(
    ng,
    window.app,
    ng.core.Component,
    ng.router.ROUTER_DIRECTIVES,
    window.app.Server
    );