/*global ng:true */

(function (ng, app) {
    app.CompanyController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/trance_company/index.html',
        directives: [app.TranceCompanyCarsComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, ng.router.RouteParams, function (server, router, params) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }
            let self = this;
            const id = params.get('id') * 1;
            server.http.get('/api/trance-company/item/' + id + '?rid=' + Math.random(), {}, function (res) {
                const body = JSON.parse(res._body);
                self.model = body.data;
                server.storage.setData("own_company", self.model);
            });

        }]
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/trance-company/:id/', component: app.CompanyController, name: 'Car' }));

})(ng, window.app || (window.app = {}));
