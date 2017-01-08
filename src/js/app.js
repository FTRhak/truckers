(function (ng, app) {
    'use strict';

    app.TestDirective = ng.core.Directive({
        selector: 'router-access'
    }).Class({
        constructor: function AccessClass() {
            //console.log('call directive');
        }
    });




    app.ApplicationComponent = ng.core.Component({
        selector: '[app-trucker]',
        template: `
            <md-toolbar class="header"></md-toolbar>
            <section class="layout-row layout-row-sm layout-row-xs layout-row-md">
                <div class="flex-20 hide-sm hide-xs flex-md-10"></div>
                <div class="flex-auto flex-sm-auto flex-xs-auto">
                    <router-outlet></router-outlet>
                </div>
                <div class="flex-20 hide-sm hide-xs flex-md-10"></div>
            </section>
            <md-toast md-theme="default" ng-class="{'md-capsule': toast.capsule}" class="hidden _md md-default-theme md-top md-right">
                <div class="md-toast-content">
                    <span class="md-toast-text ng-binding" role="alert" aria-relevant="all" aria-atomic="true">
                        Simple Toast!
                    </span>
                </div>
            </md-toast>
        `,
        directives: [ng.router.ROUTER_DIRECTIVES, app.HeaderComponent],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [ng.router.Router, app.Auth, function ApplicationComponent(router, user) {
            //this.name ="ApplicationComponent";
            console.log('synchronizeUser');
            user.synchronizeUser();
            //router.subscribe(function(path) {
            //console.log("path changed: ",path);
            //});
        }]
    });

    app.Site404Page = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/site/404.html'
    }).Class({
        constructor: function () {

        }
    });

    app.routeList = app.routeList || [];
    ng.core.enableProdMode();
    app.TruckersApplication = ng.router.RouteConfig(app.routeList.concat([
        new ng.router.Route({ path: '/404', component: app.Site404Page, name: 'Page404' }),
        new ng.router.Route({ path: '/*path', component: app.Site404Page })
    ]))(app.ApplicationComponent);

    app.routeList = [];

})(ng, window.app || (window.app = {}));

(function (app) {
    document.addEventListener('DOMContentLoaded', function () {

        ng.platform.browser.bootstrap(app.TruckersApplication, [
            ng.router.ROUTER_PROVIDERS,
            ng.core.provide(ng.router.LocationStrategy, { useClass: ng.router.PathLocationStrategy }),
            //ng.core.provide(ng.router.LocationStrategy, { useClass: ng.router.HashLocationStrategy }),
            ng.core.provide(ng.router.APP_BASE_HREF, { useValue: '/' }),
            ng.http.HTTP_PROVIDERS
        ]);
    });
})(window.app || (window.app = {}));

//https://github.com/angular/quickstart/blob/master/index.html