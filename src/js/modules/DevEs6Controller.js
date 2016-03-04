//DevEs6Controller.js
//import {Component} from 'ng.core.Component';

/*@ng.core.Component({
    selector: 'app-trucker',
    template: '<h1>TEST ES6</h1>'
    //injectables: [TodoStorage]
})*/
/*class DevEs6Controller {
    constructor() {
        this.todos = [];
    }
}*/
//ng.http.Http

(function (app) {
    'use strict';

    app.DevEs6Controller = ng.core.Component({
        selector: 'app-trucker',
        template: '<h1>TEST ES6</h1>',
        //templateUrl: 'templates/authentication/restore.html'
        //injectables: [ng.http.Http],
        //providers: [ng.http.Http],
        //directives: [ng.http.Http]
    }).Class({
        constructor: [ng.http.Http, function DevEs6Class(http) {
            console.log(http,http.post);    
        }],
        onSubmit: function () {

        }
    });

})(window.app || (window.app = {}));