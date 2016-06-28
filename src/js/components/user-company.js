/*global ng:true */

(function (ng, app) {

    app.UserCompanyComponent = ng.core.Component({
        selector: '[user-company]',
        templateUrl: 'templates/components/user_company.html'
    }).Class({
        constructor: [app.Server, function (server) {
            let self = this;
            this.model = server.storage.getData("own_company");
            if (!this.model) {
                server.http.get('/api/company/item?rid=' + Math.random(), {}, function (res) {
                    const body = JSON.parse(res._body);
                    self.model = body.user;
                    server.storage.setData("own_company", self.model);
                });
            }
        }],

        actionShowList() {
            console.log("actionShowList");

        }
    });

})(ng, window.app || (window.app = {}));