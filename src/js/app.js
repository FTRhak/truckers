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
    
    app.TestDirective = ng.core.Directive({
        selector: 'router-access'
    }).Class({
        constructor: function AccessClass(){
            console.log('call directive');
        }
    });


    app.ApplicationComponent = ng.core.Component({
        selector: 'app-trucker-route',
        template: "<navigate-menu></navigate-menu><router-outlet></router-outlet><router-access></router-access>",
        directives: [ng.router.ROUTER_DIRECTIVES,app.NavigateMenuController,app.TestDirective]
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
        
        new ng.router.Route({ path: '/', component: app.WallComponent, name: 'Index', useAsDefault: true}),

        new ng.router.Route({ path: '/404', component: app.Site404Component, name: 'Page404'}),
        new ng.router.Route({path: '/*path',  component: app.Site404Component})
    ])(app.ApplicationComponent)

})(window.app || (window.app = {}));
