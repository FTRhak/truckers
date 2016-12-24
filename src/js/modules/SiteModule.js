/*global ng:true */

(function (ng, Component, PageTitle, Route, app) {
    let SitePage = Component({
        selector: 'app-trucker',
        templateUrl: '/templates/site/index.html',
        providers: [PageTitle]
    }).Class({
        constructor: [PageTitle, function SitePageConstructor(title) {
            title.setTitle("Index");
        }]
    });

    let SiteAboutPage = Component({
        selector: 'app-trucker',
        templateUrl: '/templates/site/about.html',
        providers: [PageTitle]
    }).Class({
        constructor: [PageTitle, function SiteAboutPageConstructor(title) {
            title.setTitle("About");
        }]
    });

    let SiteTermsPage = Component({
        selector: 'app-trucker',
        templateUrl: '/templates/site/terms.html',
        providers: [PageTitle]
    }).Class({
        constructor: [PageTitle, function SiteTermsPageConstructor(title) {
            title.setTitle("Terms");
        }]
    });

    app.routeList = app.routeList || [];

    app.routeList.push(new Route({ path: '/about', component: SiteAboutPage, name: 'About' }));
    app.routeList.push(new Route({ path: '/terms', component: SiteTermsPage, name: 'Terms' }));
    app.routeList.push(new Route({ path: '/', component: SitePage, name: 'Index', useAsDefault: true }))

})(
    ng,
    ng.core.Component,
    ng.platform.browser.Title,
    ng.router.Route, 
    window.app || (window.app = {}));
