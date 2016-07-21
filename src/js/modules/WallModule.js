/*global ng:true */

(function(app) {
    'use strict';
    

    app.WallComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/wall/wall.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function(server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }
            
        }]
    });

})(window.app || (window.app = {}));
