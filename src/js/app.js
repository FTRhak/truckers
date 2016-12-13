(function(ng, app) {
    'use strict';

    app.TestDirective = ng.core.Directive({
        selector: 'router-access'
    }).Class({
        constructor: function AccessClass() {
            //console.log('call directive');
        }
    });


/*
<section id="page" class="container">
        <app-trucker-route>Loading...</app-trucker-route>
    </section>

    <footer>Trucker@</footer>
*/

    app.ApplicationComponent = ng.core.Component({
        selector: '[app-trucker]',
        //template: "<navigate-menu></navigate-menu><router-outlet></router-outlet><router-access></router-access>",
        template: `
            <header header-profile class="header"></header>
            <side class="side-bar left-side-bar">Side</side>
            <section page-content class="content">
                <router-outlet></router-outlet>
            </section>
            <nav class="navigation">Settings</nav>
            <footer class="footer">
                <a class="user-name" [routerLink]="['About']" >About</a>
            </footer>
        `,
        directives: [ng.router.ROUTER_DIRECTIVES, app.HeaderController, app.TestDirective],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [ng.router.Router, app.Auth, function ApplicationComponent(router, user) {
            //user.synchronizeUser();
            router.subscribe(function(path) {
                //console.log("path changed: ",path);
            });
        }]
    });

    app.Site404Page = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/site/404.html'
    }).Class({
        constructor: function () {

        }
    });

    //ng.core.enableProdMode();
    app.TruckersApplication = ng.router.RouteConfig(app.routeList.concat([
        //---SITE---
        //new ng.router.Route({ path: '/about', component: app.SiteAboutComponent, name: 'About' }),
        //new ng.router.Route({ path: '/terms', component: app.SiteTermsComponent, name: 'Terms' }),

        //new ng.router.Route({ path: '/', component: app.WallComponent, name: 'Index', useAsDefault: true }),

        new ng.router.Route({ path: '/404', component: app.Site404Page, name: 'Page404' }),
        new ng.router.Route({ path: '/*path', component: app.Site404Page })
    ]))(app.ApplicationComponent);

    app.routeList = [];

})(ng, window.app || (window.app = {}));
