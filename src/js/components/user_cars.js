/*global ng:true */

(function (ng, app) {

    app.UserCarsComponent = ng.core.Component({
        selector: '[user-cars]',
        templateUrl: 'templates/components/user_cars.html'
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