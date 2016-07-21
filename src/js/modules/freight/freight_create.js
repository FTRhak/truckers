/*global ng:true */

(function (ng, app) {
    app.FreightCreateController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/edit.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function (server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }

        }],

        onSubmit() {

        },

        ngOnInit() {
            this.model = {
                freightName: "-no name-"
            };
        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/freight/create/', component: app.FreightCreateController, name: 'FreightCreate' }));

})(ng, window.app || (window.app = {}));
