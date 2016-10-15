/*global ng:true */

(function (app) {
    let ChangeLanguageComponent = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/site/languages.html'
    }).Class({
        constructor: function () {

        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/languages', component: ChangeLanguageComponent, name: 'ChangeLanguage' }));

})(window.app || (window.app = {}));