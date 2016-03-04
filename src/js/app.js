(function (app) {
    app.ApplicationComponent = ng.core.Component({
        selector: 'app-trucker-route',
        template: "<router-outlet></router-outlet>",
        directives: [ng.router.ROUTER_DIRECTIVES]
    }).Class({
        constructor: [ng.router.Router, function (router) {
            //console.log("router:",router);
        }]
    });

    app.TruckersApplication = ng.router.RouteConfig([
        //---SITE---
        { path: '/about', component: app.SiteAboutComponent, name: 'About' },
        { path: '/terms', component: app.SiteTermsComponent, name: 'Terms' },
        //---Authentication---
        { path: '/login', component: app.LoginComponent, name: 'Login' },
        { path: '/register', component: app.RegistrateComponent, name: 'Register' },
        { path: '/restore', component: app.RestoreComponent, name: 'Restore' },
        
        { path: '/', component: app.LoginComponent, name: 'Index' },
    ])(app.ApplicationComponent)

})(window.app || (window.app = {}));
