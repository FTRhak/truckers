/*global ng:true */

(function(app) {
    'use strict';

    app.LoginComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/login.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [app.Http, app.Auth, ng.router.Location, ng.router.Router, function(http, user, location, router) {
            if (user.isLogin()) {
                app.tools.location.go('/');
            }
            this.errorMessage = "";
            this.model = {
                login: "",
                password: ""
            };
            this.message = "";

            this.onSubmit = function() {
                const self = this;
                console.log('model:', this.model);
                http.post('/api/user/login?rid=' + Math.random(), this.model, function(res) {
                    if (res.status === 200) {
                        const body = JSON.parse(res._body);
                        if (body.status === 200) {
                            user.login(body.user.id);
                            //TODO bugfix location.go('/user');
                            app.tools.location.go('/user');
                        } else {
                            self.errorMessage = body.error;
                        }
                    }
                });
            }
        }]
    });

    //---------------------------------------------------------

    app.RegistrateComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/register.html',
        directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [app.Http, app.Auth, function(http, user) {
            if (user.isLogin()) {
                app.tools.location.go('/');
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
        onSubmit: function() {
            console.log("onSubmit login:", this.model, this.message);
        }
    });

    //---------------------------------------------------------

    app.RestoreComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/restore.html',
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [app.Http, app.Auth, function(http, user) {
            if (user.isLogin()) {
                app.tools.location.go('/login');
            }
        }],
        onSubmit: function() {

        }
    });

    //---------------------------------------------------------

    app.LogoutComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/logout.html',
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [app.Http, app.Auth, function(http, user) {
            if (!user.isLogin()) {
                app.tools.location.go('/login');
                return;
            }
            http.post('/api/logout?rid=' + Math.random(), {}, function(res) {
                user.loguot();
                app.tools.location.go('/login');
            });
        }]
    });

})(window.app || (window.app = {}));
