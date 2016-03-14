(function (app) {
    app.tools = {
        location: {
            go: function(path){
                let a = document.createElement('a');
                a.href='#'+path;
                a.click();
                a.remove();
            }
        }
    };
    
    
    app.ApplicationComponent = ng.core.Component({
        selector: 'app-trucker-route',
        template: "<navigate-menu></navigate-menu><user-menu></user-menu><router-outlet></router-outlet>",
        directives: [ng.router.ROUTER_DIRECTIVES],
        providers: [app.NavigateMenuController, app.UserMenuController]
    }).Class({
        constructor: [ng.router.Router, ng.http.Http, function (router, http) {
            router.subscribe(function(path){
                console.log("path changed: ", path,router);
                /*const headers = new ng.http.Headers({ 'Content-Type': 'application/json' });
                const options = new ng.http.RequestOptions({ headers: headers });

                http.post('/api/user/access?rid=' + Math.random(), JSON.stringify({path: path}), options).toPromise().then(function(res) {
                    //console.log("resp::",res);
                }).catch(function() { console.error("some error"); });*/
            });
        }]
    });

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
        
        new ng.router.Route({ path: '/', component: app.LoginComponent, name: 'Index' }),
    ])(app.ApplicationComponent)

})(window.app || (window.app = {}));
