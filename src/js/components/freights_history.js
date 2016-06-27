/*global ng:true */

(function(ng, app) {
    
    app.FreightsHistoryComponent = ng.core.Component({
        selector: '[freights-history]',
        templateUrl: 'templates/components/freights_history.html'
    }).Class({
        constructor: [app.Server, function (server) {

        }]
    });

})(ng, window.app || (window.app = {}));