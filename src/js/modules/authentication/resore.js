/*global ng:true */

(function (ng, app) {
    'use strict';

    app.RestoreComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/authentication/restore.html',
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function (server, router) {
            if (server.user.isLogin()) {
                router.navigate(['Login']);
            }
        }],
        onSubmit: function () {

        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/restore', component: app.RestoreComponent, name: 'Restore' }));

})(ng, window.app || (window.app = {}));