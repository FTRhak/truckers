/*global ng:true */

(function(app) {
    'use strict';
    

    app.WallComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/wall/wall.html',
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
