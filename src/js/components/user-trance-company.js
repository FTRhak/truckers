/*global ng:true */

(function (ng, app) {

    app.UserTranceCompanyComponent = ng.core.Component({
        selector: '[user-trance-company]',
        templateUrl: 'templates/components/user_company.html'
    }).Class({
        constructor: [app.Server, function (server) {
            let self = this;
            this.model = server.storage.getData("own_company");
            console.log(server.storage.getData("own_company"));
            if (!this.model) {
                server.http.get('/api/trance-company/uitem?rid=' + Math.random(), {}, function (res) {
                    const body = JSON.parse(res._body);
                    self.model = body.data;
                    server.storage.setData("own_company", self.model);
                });
            }
        }],

        actionShowList() {
            console.log("actionShowList");

        }
    });

})(ng, window.app || (window.app = {}));