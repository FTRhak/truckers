/*global ng:true */

(function (app) {
    app.LoginComponent = ng.core.Component({
        selector: 'app-trucker',
        //template: '<h1>Login page</h1>'
        templateUrl: 'templates/authentication/login.html'
    }).Class({
        constructor: [ng.http.Http, function LoginClass(http) {
            this.http = http;
            this.model = {
                login: "",
                password: ""
            };
            this.message = "";
        }],
        onSubmit: function () {
            //var headers = new ng.http.Headers({ 'Content-Type': 'application/json' });
            //var options = new ng.http.RequestOptions({ headers: headers });

            this.http.post('/api/user/login', JSON.stringify({ data: 1 })).toPromise().then(function (res) {
                console.log(res);
            }).catch(function () { console.error("some error"); });
        }
    });
    
    //---------------------------------------------------------

    app.RegistrateComponent = ng.core.Component({
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
    
    //---------------------------------------------------------

    app.RestoreComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/restore.html'
    }).Class({
        constructor: function () {

        },
        onSubmit: function () {

        }
    });

})(window.app || (window.app = {}));
