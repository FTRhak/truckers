(function (app) {
    app.AuthenticationLoginComponent = ng.core.Component({
        selector: 'app-trucker',
        //template: '<h1>Login page</h1>'
        templateUrl: 'templates/authentication/login.html'
    }).Class({
        constructor: function () {
            this.model = {
                login: "user",
                password: "user"
            };
            this.message = "hello";
        },
        onSubmit: function () {
            console.log("onSubmit login:", this.model, this.message);
        }
    });
    app.AuthenticationRegistrateComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/register.html'
    }).Class({
        constructor: function () {
            this.model = {
                login: "user",
                password: "user",
                passwordConfirm: ""
            };
            this.message = "hello";
        },
        onSubmit: function () {
            console.log("onSubmit login:", this.model, this.message);
        }
    });
    app.AuthenticationRestoreComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/restore.html'
    }).Class({
        constructor: function () {

        },
        onSubmit: function () {

        }
    });

})(window.app || (window.app = {}));
