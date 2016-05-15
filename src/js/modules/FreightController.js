/*global ng:true */

(function(app) {
    'use strict';
    

    app.FreightsController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/list.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
        }]
    });
    
    app.FreightController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/index.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
        }]
    });
    
    app.FreightCreateController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/edit.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
        }]
    });
    
    app.FreightEditController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/edit.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
        }]
    });
    
    app.FreightDeleteController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/freight/delete.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, function(server) {
            if (!server.user.isLogin()) {
                app.tools.location.go('/login');
            }
            
        }]
    });
    

})(window.app || (window.app = {}));
