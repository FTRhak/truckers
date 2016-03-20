/*global ng:true */

(function(app) {
    app.UserProfileComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/profile.html',
        directives: [app.UserMenuController],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [app.Http, app.Auth, function(http, user) {
            if (!user.isLogin()) {
                app.tools.location.go('/login');
            }
            
            
            http.post('/api/user/?rid=' + Math.random(), {}, function(res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    if (body.status === 200) {
                        //TODO bugfix location.go('/user');
                        app.tools.location.go('/user');
                    } else {
                        self.errorMessage = body.error;
                    }
                }
            });
        }]
    });

    app.UserProfileEditComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/user_edit.html',
        directives: [app.UserMenuController],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [app.Http, app.Auth, function(http, user) {
            if (!user.isLogin()) {
                app.tools.location.go('/login');
            }
            
            this.model = new app.UserModel();
            let self = this;
            http.post('/api/user/?rid=' + Math.random(), {}, function(res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    if (body.status === 200) {
                        self.model.setData(body.user);
                        //console.log(body.user, self.model);
                    }
                }
            });
        }],
        onSubmit: function() {
            console.log("Edit User",this.model);
        }
    });

})(window.app || (window.app = {}));
