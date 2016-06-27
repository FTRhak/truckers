/*global ng:true */

(function(ng, app) {
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

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user/edit', component: app.UserProfileEditComponent, name: 'ProfileEdit' }));

})(ng, window.app || (window.app = {}));