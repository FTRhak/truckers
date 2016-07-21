/*global ng:true */

(function(ng, app) {
    app.UserSettingsComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/user/user_settings.html',
        directives: [app.UserMenuController],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function(server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
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

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user/settings', component: app.UserSettingsComponent, name: 'UserSettings' }));

})(ng, window.app || (window.app = {}));
