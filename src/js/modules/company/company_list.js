/*global ng:true */

(function (ng, app) {
    app.CompaniesController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/company/list.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function (server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }

        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/companies', component: app.CompaniesController, name: 'Companies' }));

})(ng, window.app || (window.app = {}));
