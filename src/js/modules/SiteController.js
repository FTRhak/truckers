/*global ng:true */

(function (app) {
    app.SiteComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/site/index.html'
    }).Class({
        constructor: function () {

        }
    });

    app.SiteAboutComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/site/about.html'
    }).Class({
        constructor: function () {

        }
    });

    app.SiteTermsComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/site/terms.html'
    }).Class({
        constructor: function () {

        }
    });

})(window.app || (window.app = {}));
