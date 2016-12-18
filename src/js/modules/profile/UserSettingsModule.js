/*global ng:true */

(function(ng, app) {
    let UserSettingsPage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/profile/user_settings.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function UserSettingsPageConstructor(server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }
        }],
        onSubmit: function() {
            console.log("Edit User",this.model);
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user/settings', component: UserSettingsPage, name: 'UserSettings' }));

})(ng, window.app || (window.app = {}));
