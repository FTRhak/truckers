/*global ng:true */

(function(ng, app) {
    let UserProfileEditPage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/profile/user_edit.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function UserProfileEditPageConstructor(server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }

            this.model = server.user.getUser();
            console.log(this.model);
            
        }],
        onSubmit: function() {
            console.log("Edit User",this.model);
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user/edit', component: UserProfileEditPage, name: 'ProfileEdit' }));

})(ng, window.app || (window.app = {}));