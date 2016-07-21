/*global ng:true */

(function (ng, app) {
    'use strict';

    app.RegistrateComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/register.html',
        directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function (server, router) {
            if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            this.model = {
                firstName: "",
                secondName: "",
                email: "",
                password: "",
                passwordConfirm: "",
                sex: ""
            };
            this.formControl = new ng.common.Control("Registrate");
            console.log(this.formControl);
            this.message = "hello";
        }],
        onSubmit: function () {
            console.log("onSubmit login:", this.model, this.message);
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/register', component: app.RegistrateComponent, name: 'Register' }));

})(ng, window.app || (window.app = {}));