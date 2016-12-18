(function(ng, app) {
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
            <header header-profile class="header"></header>
            <side class="side-bar left-side-bar">Side</side>
            <section page-content class="content">
                <router-outlet></router-outlet>
            </section>
            <nav class="navigation">Settings</nav>
            <footer class="footer">Hello</footer>
        `,
        directives: [ng.router.ROUTER_DIRECTIVES, app.TestDirective],
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
        templateUrl: 'templates/site/404.html'
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
            ng.core.provide(ng.router.LocationStrategy, {useClass: ng.router.PathLocationStrategy}),
            //ng.core.provide(ng.router.LocationStrategy, {useClass: ng.router.HashLocationStrategy}),
            ng.core.provide(ng.router.APP_BASE_HREF, {useValue: '/'}),
            ng.http.HTTP_PROVIDERS
            ]);
    });
})(window.app || (window.app = {}));

//https://github.com/angular/quickstart/blob/master/index.html