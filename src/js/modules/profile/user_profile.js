/*global ng:true */

(function(ng, app) {
    


    app.UserProfileComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/profile.html',
        directives: [app.UserMenuController, app.FreightsHistoryComponent],
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


    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user', component: app.UserProfileComponent, name: 'Profile' }));

})(ng, window.app || (window.app = {}));