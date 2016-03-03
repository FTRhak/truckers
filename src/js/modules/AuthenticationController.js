/*global ng:true */

(function (app) {
    app.AuthenticationLoginComponent = ng.core.Component({
        selector: 'app-trucker',
        //template: '<h1>Login page</h1>'
        templateUrl: 'templates/authentication/login.html'
    }).Class({
        constructor: function () {
            this.http = new ng.http.Http();
            this.model = {
                login: "",
                password: ""
            };
            this.message = "";
        },
        onSubmit: function () {
            try{
                var headers = new ng.http.Headers({ 'Content-Type': 'application/json' });
                var options = new ng.http.RequestOptions({ headers: headers });

                this.http.post('/api/user/login', JSON.stringify({data:1}),options).then(function(res){
                    console.log(res);
                }).catch(function(){console.error("some error");});
                console.log("onSubmit login:", this.model, this.message);
            } catch(er){console.error(er);}
            
        }
    });
    
    //---------------------------------------------------------

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
    
    //---------------------------------------------------------

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
