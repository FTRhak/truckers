/*global ng:true */

(function(app) {
    'use strict';

    app.LoginComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/login.html',
        directives: [ng.router.ROUTER_DIRECTIVES]
    }).Class({
        constructor: [ng.http.Http, ng.router.Location, ng.router.Router, function(http, location, router) {
            this.http = http;

            this.errorMessage = "";
            this.model = {
                login: "",
                password: ""
            };
            this.message = "";

            this.onSubmit = function() {
                const self = this;
                const headers = new ng.http.Headers({ 'Content-Type': 'application/json' });
                const options = new ng.http.RequestOptions({ headers: headers });

                this.http.post('/api/user/login?rid=' + Math.random(), JSON.stringify(this.model), options).toPromise().then(function(res) {
                    if (res.status === 200) {
                        const body = JSON.parse(res._body);
                        if (body.status === 200) {
                            //TODO bugfix location.go('/user');
                            app.tools.location.go('/user');
                        } else {
                            self.errorMessage = body.error;
                        }
                    }
                }).catch(function() { console.error("some error"); });
            }
        }]
    });

    //---------------------------------------------------------

    app.RegistrateComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/register.html',
        directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES]
    }).Class({
        constructor: [ng.http.Http, function(http) {
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
        onSubmit: function() {
            console.log("onSubmit login:", this.model, this.message);
        }
    });

    //---------------------------------------------------------

    app.RestoreComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/restore.html'
    }).Class({
        constructor: function() {

        },
        onSubmit: function() {

        }
    });

    //---------------------------------------------------------

    app.LogoutComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/logout.html'
    }).Class({
        constructor: [ng.http.Http, function(http) {
            http.post('/api/logout?rid=' + Math.random()).toPromise().then(function(res) {
                //TODO bugfix location.go('/user');
                app.tools.location.go('/login');
            }).catch(function() { console.error("some error"); });
        }]
    });

})(window.app || (window.app = {}));
