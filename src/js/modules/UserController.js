/*global ng:true */

(function(app) {
    app.UserProfileComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/profile.html'
    }).Class({
        constructor: [ng.http.Http, function(http) {
            http.get('/api/user/?rid=' + Math.random(), {}).toPromise().then(function(res) {
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
        }]
    });

    app.UserProfileEditComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/user_edit.html'
    }).Class({
        constructor: [ng.http.Http, function(http) {
            this.model = new app.UserModel();
            let self = this;
            http.get('/api/user/?rid=' + Math.random(), {}).toPromise().then(function(res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    if (body.status === 200) {
                        self.model.setData(body.user);
                        //console.log(body.user, self.model);
                    }
                }
            }).catch(function() {
                //TODO bugfix location.go('/user');
                app.tools.location.go('/login');
            });
        }],
        onSubmit: function() {
            console.log("Edit User",this.model);
        }
    });

})(window.app || (window.app = {}));
