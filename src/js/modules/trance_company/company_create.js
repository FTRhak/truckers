/*global ng:true */

(function (ng, app) {
    app.CompanyCreateController = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: 'templates/trance_company/edit.html',
        directives: [app.MapNavigatorComponent],
        providers: [app.Server]
    }).Class({
        constructor: [app.Server, ng.router.Router, function (server, router) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
            }
            let self = this;
            this.owner = "";
            this.model = {
                uid: "",
                company_name: "",
                logo: "",
                latitude: "",
                longitude: "",
                country: "",
                city: "",
                address: "",
                email: "",
                phone: ""
            };

            server.http.get('/api/trance-company/create?rid=' + Math.random(), {}, function (res) {
                const body = JSON.parse(res._body);
                self.owner = body.user;
            });


            this.onSubmit = function () {
                console.log("onSubmit", this.model);


                const self = this;
                console.log('model:', this.model);
                server.http.post('/api/trance-company/create?rid=' + Math.random(), this.model, function (res) {
                    if (res.status === 200) {
                        const body = JSON.parse(res._body);
                        if (body.status === 200) {
                            router.navigate(['UserProfile']);
                        } else {
                            self.errorMessage = body.error;
                        }
                    }
                });
            }

        }],

    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/trance-company/create/', component: app.CompanyCreateController, name: 'Car create' }));

})(ng, window.app || (window.app = {}));
