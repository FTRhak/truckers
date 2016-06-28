/*global ng:true */

(function (ng, app) {
    app.CompanyController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/company/index.html',
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
    app.routeList.push(new ng.router.Route({ path: '/company/:id/', component: app.CompanyController, name: 'Car' }));

})(ng, window.app || (window.app = {}));
