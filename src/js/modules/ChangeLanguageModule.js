/*global ng:true */

(function (ng, Component, PageTitle, Route, app) {
    let ChangeLanguageComponent = Component({
        selector: 'app-trucker',
        templateUrl: 'templates/site/languages.html'
    }).Class({
        constructor: function () {

        }
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new Route({ path: '/languages', component: ChangeLanguageComponent, name: 'ChangeLanguage' }));

})(
    ng,
    ng.core.Component,
    ng.platform.browser.Title,
    ng.router.Route, 
    window.app);