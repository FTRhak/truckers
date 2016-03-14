(function (app) {
    'use strict';

    app.NavigateMenuController = ng.core.Component({
        selector: 'navigate-menu',
        template: '<h1>Top menu</h1>',
    }).Class({
        constructor: [ng.http.Http, function DevEs6Class(http) {
            console.log(http,http.post);    
        }],
        onSubmit: function () {

        }
    });
    
    app.UserMenuController = ng.core.Component({
        selector: 'user-menu',
        template: '<h1>user manu</h1>',
    }).Class({
        constructor: [ng.http.Http, function DevEs6Class(http) {
            console.log(http,http.post);    
        }],
        onSubmit: function () {

        }
    });

})(window.app || (window.app = {}));