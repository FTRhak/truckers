/*System.config({
		baseURL: '/app'
	});*/
	
//System.import('bootstrap');



(function (app) {
    app.IndexComponent = ng.core.Component({
        selector: 'router-outlet',
        template: '<h1>Index</h1>'
    }).Class({
        constructor: function () { }
    });

    app.MainComponent = ng.core.Component({
        //selector: 'router-outlet',
        template: '<h1>Main</h1>'
    }).Class({
        constructor: function () { }
    });

    /*app.Ro = ng.router.RouteConfig([
        { path: "/", name: "Main", component: app.MainComponent },
        { path: "/home", name: "Index", component: app.IndexComponent }
    ]);*/

    app.AppComponent = ng.core.Component({
        selector: 'my-app',//<a [routerLink]="[\'Main\']">Main Center</a><a [routerLink]="[\'Index\']">Index</a>
        template: '<h1>Component Router</h1><nav></nav>'//<a [routerLink]="[\'IndexComponent\']">IndexComponent Center</a><a [routerLink]="[\'MainComponent\']">Heroes</a><router-outlet></router-outlet>',
        //providers: [app.MainComponent, app.IndexComponent],
        //directives: [ng.router.ROUTER_DIRECTIVES]
    })
    .Class({
        constructor: function(){}
    })
    /*.Class({
        constructor: ng.router.RouteConfig([
            { path: "/", name: "Main", component: app.MainComponent },
            { path: "/home", name: "Index", component: app.IndexComponent }
        ])
    })*/
    ;
//ng.router.AsyncRoute
    /*app.Ro = ng.router.RouteConfig([
        { path: "/", name: "Main", component: app.MainComponent },
        { path: "/home", name: "Index", component: app.IndexComponent }
    ]);*/

})(window.app || (window.app = {}));

(function (app) {
    document.addEventListener('DOMContentLoaded', function () {

        ng.platform.browser.bootstrap(app.AppComponent, [ng.router.ROUTER_PROVIDERS]);
    });
})(window.app || (window.app = {}));

//ng.router.Router
