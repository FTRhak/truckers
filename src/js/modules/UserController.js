/*global ng:true */

(function(app) {
    app.UserProfileComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/profile.html',
        directives: [app.UserMenuController],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            let self = this;
            
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
            this.user = {};
            
            server.http.post('/api/user/?rid=' + Math.random(), {}, function(res) {
                if (res.status === 200) {
                    const body = JSON.parse(res._body);
                    if (body.status === 200) {
                        self.user = body.user;
                    } else {
                        self.errorMessage = body.error;
                    }
                }
            });
        }],
        
        getAge() {
            return this.user.birthday;
        },
        getLocation() {
            return this.user.country + ' ' + this.user.city;
        }
    });

    app.UserProfileEditComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/user_edit.html',
        directives: [app.UserMenuController],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
            this.model = new app.UserModel();
            let self = this;
            server.http.post('/api/user/?rid=' + Math.random(), {}, function(res) {
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
    
    app.UserSettingsComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/user_settings.html',
        directives: [app.UserMenuController],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
            this.model = new app.UserModel();
            let self = this;
            server.http.post('/api/user/?rid=' + Math.random(), {}, function(res) {
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
