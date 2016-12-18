/*global ng:true */

(function (ng, PageTitle, app, Server, UserServerComponent) {
    'use strict';

    let UserProfilePage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/profile/user.html',
        directives: [
            ng.router.ROUTER_DIRECTIVES,
            //app.UserMenuController,
            //app.FreightsHistoryComponent,
            //app.UserCarsComponent,
            //app.UserTranceCompanyComponent
            ],
        providers: [PageTitle, Server]
    }).Class({
        constructor: [ng.router.Router, PageTitle, Server, function UserProfilePageController(router, title, server) {
            let self = this;
            title.setTitle("User profile");
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }

            this.user = server.user.getUser();
        }],
    });


    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user', component: UserProfilePage, name: 'UserProfile' }));

})(
    ng,
    ng.platform.browser.Title,
    window.app,
    window.app.Server,
    window.app.UserServerComponent);