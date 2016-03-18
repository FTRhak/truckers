/*global ng:true */

(function(app) {
    'use strict';

    app.WallComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/wall/wall.html',
        directives: [app.UserMenuController]
    }).Class({
        constructor: function() {

        }
    });

})(window.app || (window.app = {}));
