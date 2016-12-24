/*global ng:true */

(function (ng, PageTitle, app, Server, AuthenticationService) {
    'use strict';

    let RegistratePage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/authentication/register.html',
        directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES, ng.router.ROUTER_DIRECTIVES],
        providers: [Server, AuthenticationService, PageTitle]
    }).Class({
        constructor: [ng.router.Router, PageTitle, Server, AuthenticationService, function RegistratePageConstructor(router, title, server, authServer) {
            if (server.user.isLogin()) {
                router.navigate(['Index']);
            }
            title.setTitle("Register");

            this.model = {
                login: "",
                firstName: "",
                secondName: "",
                email: "",
                password: "",
                passwordConfirm: ""
            };
           
            this.server = server;
            this.authServer = authServer;
            this.router = router;

            
            //this.formControl = new ng.common.Control("Registrate");
            //console.log(this.formControl);
            this.message = "";
        }],
        registerAccepted: function (data) {
            if (data.error) {
                this.message = data.error;
            } else {
                this.router.navigate(['RegisterCompleted']);
            }
        },
        registerError: function (data) {
            console.log('registerError: ', data);
        },
        onSubmit: function () {
            this.message = "";
            this.authServer.register(this.model, this.registerAccepted.bind(this), this.registerError.bind(this));
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/register', component: RegistratePage, name: 'Register' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.AuthenticationService
    );