/*global ng:true */

(function(ng, app) {
    


    app.UserProfileComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/profile.html',
        directives: [
            ng.router.ROUTER_DIRECTIVES,
            app.UserMenuController, 
            app.FreightsHistoryComponent, 
            app.UserCarsComponent, 
            app.UserTranceCompanyComponent],
        providers: [app.Server, ng.platform.browser.Title]
    }).Class({
        constructor: [app.Server, ng.router.Router, ng.platform.browser.Title, function(server, router, title) {
            let self = this;
            title.setTitle("User profile");
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
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
    app.routeList.push(new ng.router.Route({ path: '/user', component: app.UserProfileComponent, name: 'UserProfile' }));

})(ng, window.app || (window.app = {}));