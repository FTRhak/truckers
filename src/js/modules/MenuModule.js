(function (app) {
    'use strict';

    app.NavigateMenuController = ng.core.Component({
        selector: 'navigate-menu',
        templateUrl: 'templates/navigation/top_menu.html',
        directives: [ng.router.ROUTER_DIRECTIVES]
    }).Class({
        constructor: [ng.http.Http, function (http) {
 
        }],
        onSubmit: function () {

        }
    });
    
    app.UserMenuController = ng.core.Component({
        selector: '[header-profile]',
        templateUrl: 'templates/navigation/user_menu.html',
        directives: [ng.router.ROUTER_DIRECTIVES]
    }).Class({
        constructor: [ng.http.Http, function (http) {

        }],
        onSubmit: function () {

        }
    });

})(window.app || (window.app = {}));