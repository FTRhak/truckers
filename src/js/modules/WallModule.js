/*global ng:true */

(function(app) {
    'use strict';

    app.WallComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/wall/wall.html',
        directives: [app.UserMenuController],
        providers: [app.Http, app.Auth]
    }).Class({
        constructor: [app.Http, app.Auth, function(http, user) {

        }]
    });

})(window.app || (window.app = {}));
