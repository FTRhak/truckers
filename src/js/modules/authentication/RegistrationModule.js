/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationService) {
    'use strict';

    let RegistratePage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/register.html',
        directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES, ng.router.ROUTER_DIRECTIVES],
        pipes: [ng.localization.Translate],
        providers: [Server, AuthenticationService, PageTitle]
    }).Class({
        constructor: [Server, AuthenticationService, ng.router.Router, PageTitle, function RegistratePageConstructor(server, authServer, router, title) {
            if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            title.setTitle("Register");
            /*this.registrationComplete = false;
            this.server = server;
            this.authServer = authServer;

            this.model = {
                firstName: "",
                secondName: "",
                email: "",
                password: "",
                passwordConfirm: "",
                sex: ""
            };
            //this.formControl = new ng.common.Control("Registrate");
            //console.log(this.formControl);
            this.message = "";*/
        }],
        /*registerAccepted: function (data) {
            if (data.error) {
                this.message = data.error;
            } else {
                this.registrationComplete = true;
            }

            console.log('registerAccepted: ', data);
        },
        registerError: function (data) {
            console.log('registerError: ', data);
        },
        onSubmit: function () {
            this.message = "";
            this.authServer.register(this.model, this.registerAccepted.bind(this), this.registerError.bind(this));
        }*/
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/register', component: RegistratePage, name: 'Register' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.AuthenticationServerComponent
    );