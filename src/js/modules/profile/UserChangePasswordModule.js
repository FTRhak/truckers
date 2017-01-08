/*global ng:true */

(function (ng, app) {
    let UserChangePasswordPage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/profile/user_edit_password.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function UserChangePasswordPageConstructor(server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
                return;
            }

            this.model = server.user.getUser();
            console.log(this.model);

        }],
        onSubmit: function () {
            console.log("Edit User", this.model);
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user/edit/password', component: UserChangePasswordPage, name: 'ProfileEditPassword' }));

})(ng, window.app || (window.app = {}));