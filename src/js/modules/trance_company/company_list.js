/*global ng:true */

(function (ng, app) {
    app.CompaniesController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/trance_company/list.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function (server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }

        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/trance-companies', component: app.CompaniesController, name: 'Companies' }));

})(ng, window.app || (window.app = {}));
