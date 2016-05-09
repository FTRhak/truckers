(function(app) {
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
            <header header-profile class="header">Hello user</header>
            <side class="side-bar">Side</side>
            <section page-content class="content">
                <router-outlet></router-outlet>
            </section>
            <nav class="navigation">Settings</nav>
            <footer class="footer"></footer>
        `,
        directives: [ng.router.ROUTER_DIRECTIVES, app.NavigateMenuController, app.UserMenuController, app.TestDirective],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [ng.router.Router, app.Auth, function ApplicationComponent(router, user) {
            //user.synchronizeUser();
            router.subscribe(function(path) {
                //console.log("path changed: ",path);
            });
        }]
    });
    //ng.core.enableProdMode();
    app.TruckersApplication = ng.router.RouteConfig([
        //---SITE---
        new ng.router.Route({ path: '/about', component: app.SiteAboutComponent, name: 'About' }),
        new ng.router.Route({ path: '/terms', component: app.SiteTermsComponent, name: 'Terms' }),
        //---Authentication---
        new ng.router.Route({ path: '/login', component: app.LoginComponent, name: 'Login' }),
        new ng.router.Route({ path: '/register', component: app.RegistrateComponent, name: 'Register' }),
        new ng.router.Route({ path: '/restore', component: app.RestoreComponent, name: 'Restore' }),
        new ng.router.Route({ path: '/logout', component: app.LogoutComponent, name: 'Logout' }),
        //---User---
        new ng.router.Route({ path: '/user', component: app.UserProfileComponent, name: 'Profile' }),
        new ng.router.Route({ path: '/user/edit', component: app.UserProfileEditComponent, name: 'ProfileEdit' }),

        new ng.router.Route({ path: '/', component: app.WallComponent, name: 'Index', useAsDefault: true }),

        new ng.router.Route({ path: '/404', component: app.Site404Component, name: 'Page404' }),
        new ng.router.Route({ path: '/*path', component: app.Site404Component })
    ])(app.ApplicationComponent)

})(window.app || (window.app = {}));
