/*System.config({
		baseURL: '/app'
	});*/
	
	//System.import('bootstrap');



(function (app) {
    app.AppComponent = ng.core.Component({
        selector: 'my-app',//<a [routerLink]="[\'Main\']">Main Center</a><a [routerLink]="[\'Index\']">Index</a>
        template: '<h1>Component Router</h1><nav></nav><router-outlet></router-outlet>'
    }).Class({
        constructor: function () {
            
            
         }
    });
    
    app.Ro = ng.router.RouteConfig([
                {path: "/", name: "Main", component: app.MainComponent},
                {path: "/home", name: "Index", component: app.IndexComponent}
            ]);
    
    app.IndexComponent = ng.core.Component({
        selector: 'my-app',
        template: '<h1>Index</h1>'
    }).Class({
        constructor: function () { }
    });
    
    app.MainComponent = ng.core.Component({
        selector: 'my-app',
        template: '<h1>Main</h1>'
    }).Class({
        constructor: function () { }
    });
})(window.app || (window.app = {}));

(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        
        ng.platform.browser.bootstrap(app.Ro);
    });
})(window.app || (window.app = {}));

//ng.router.Router
