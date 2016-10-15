(function (ng, app, Component, ROUTER_DIRECTIVES, Server) {
    'use strict';
    
    app.HeaderController = Component({
        selector: '[header-profile]',
        templateUrl: 'templates/navigation/unuser_menu.html',
        directives: [ROUTER_DIRECTIVES],
        providers: [Server]
    }).Class({
        constructor: [Server, function HeaderController(server) {
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