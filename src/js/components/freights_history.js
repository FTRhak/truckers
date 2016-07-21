/*global ng:true */

(function (ng, app) {

    app.FreightsHistoryComponent = ng.core.Component({
        selector: '[freights-history]',
        templateUrl: 'templates/components/freights_history.html',
        directives: [ng.router.ROUTER_DIRECTIVES],
        /*styles: [`
            h3{color:red;}
        `]*/
    }).Class({
        constructor: [app.Server, function (server) {
            this.model = [];
            
        }],

        _loadData() {
            this.model = [{
                id: 1,
                name: "First race"
            }, {
                    id: 2,
                    name: "Second race"
                }];
        },
        actionShowList() {
            console.log("actionShowList");
            this._loadData();
        }
    });

})(ng, window.app || (window.app = {}));