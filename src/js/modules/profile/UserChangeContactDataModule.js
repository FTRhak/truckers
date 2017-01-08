/*global ng:true */

(function (ng, app) {
    let UserChangeContactDataPage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/profile/user_edit_contact_data.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function UserChangeContactDataPageConstructor(server, router) {
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
    app.routeList.push(new ng.router.Route({ path: '/user/edit/contactdata', component: UserChangeContactDataPage, name: 'ProfileEditContactData' }));

})(ng, window.app || (window.app = {}));