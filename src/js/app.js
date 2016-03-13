(function (app) {
    app.ApplicationComponent = ng.core.Component({
        selector: 'app-trucker-route',
        template: "<router-outlet></router-outlet>",
        directives: [ng.router.ROUTER_DIRECTIVES]
    }).Class({
        constructor: [ng.router.Router, function (router) {
            console.log("router:",router);
            router.subscribe((val) => console.error('change:',val));
        }],
        locationChangeStart: function(){
            console.log("locationChangeStart");
            //router.subscribe((val) => /*detect changes*/)
        }
    });

    app.TruckersApplication = ng.router.RouteConfig([
        //---SITE---
        new ng.router.Route({ path: '/about', component: app.SiteAboutComponent, name: 'About' }),
        new ng.router.Route({ path: '/terms', component: app.SiteTermsComponent, name: 'Terms' }),
        //---Authentication---
        new ng.router.Route({ path: '/login', component: app.LoginComponent, name: 'Login' }),
        new ng.router.Route({ path: '/register', component: app.RegistrateComponent, name: 'Register' }),
        new ng.router.Route({ path: '/restore', component: app.RestoreComponent, name: 'Restore' }),
        //---User---
        new ng.router.Route({ path: '/user', component: app.UserProfileComponent, name: 'Profile' }),
        
        new ng.router.Route({ path: '/', component: app.LoginComponent, name: 'Index' }),
    ])(app.ApplicationComponent)

})(window.app || (window.app = {}));
