
/*global ng:true */

(function (ng, app) {

    app.TranceCompanyCarsComponent = ng.core.Component({
        selector: '[trance-company-cars]',
        templateUrl: 'templates/components/trance_company_cars.html'
    }).Class({
        constructor: [app.Server, function (server) {
            let self = this;
            this.model = server.storage.getData("company_cars");
            /*if (!this.model) {
                server.http.get('/api/company-cars/:id?rid=' + Math.random(), {}, function (res) {
                    const body = JSON.parse(res._body);
                    self.model = body.data;
                    server.storage.setData("own_company", self.model);
                });
            }*/
        }],

        actionShowList() {
            console.log("actionShowList");

        }
    });

})(ng, window.app || (window.app = {}));