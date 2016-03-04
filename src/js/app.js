(function (app) {
    app.IndexDevComponent = ng.core.Component({
        selector: 'router',
        template: '<h1>Index</h1>'
    }).Class({
        constructor: function () { }
    });

    app.ApplicationComponent = ng.core.Component({
        selector: 'app-trucker',
        template: `<h1>ROUT</h1>
        <ul>
            <li><a href="#/">Index</a></li>
            <li><a href="#/login">Login</a></li>
            <li><a href="#/register">Register</a></li>
            <li><a href="#/restore">Restore</a></li>
            
            <li><a href="#/about">About</a></li>
            <li><a href="#/terms">Terms</a></li>
        </ul>
        <router-outlet></router-outlet>
        `,
        directives: [ng.router.ROUTER_DIRECTIVES]
    }).Class({
        constructor: function () {

        }
    });

    app.TruckersApplication = ng.router.RouteConfig([
        //---SITE---
        { path: '/about', component: app.SiteAboutComponent, name: 'About' },
        { path: '/terms', component: app.SiteTermsComponent, name: 'Terms' },
        //---Authentication---
        { path: '/login', component: app.LoginComponent, name: 'Login' },
        { path: '/register', component: app.RegistrateComponent, name: 'Register' },
        { path: '/restore', component: app.RestoreComponent, name: 'Restore' },
        
        { path: '/', component: app.IndexDevComponent, name: 'Index' },
    ])(app.ApplicationComponent)

})(window.app || (window.app = {}));
