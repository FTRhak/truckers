/*global ng:true */

(function (ng, app) {
    app.CompanyEditController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/trance_company/edit.html',
        directives: [],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function (server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }
            this.model = {};

        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/trance-company/:id/edit', component: app.CompanyEditController, name: 'Trance company edit' }));

})(ng, window.app || (window.app = {}));
