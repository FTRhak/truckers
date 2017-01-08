/*global ng:true */

(function (ng, app) {
    let UserProfileEditPage = ng.core.Component({
        selector: 'app-trucker',
        templateUrl: '/templates/profile/user_edit.html',
        directives: [ng.router.ROUTER_DIRECTIVES, /*app.ui.MdInput, */app.ui.MdInputContainer],
        providers: [app.Server, app.UserService]
    }).Class({
        constructor: [app.Server, ng.router.Router, app.UserService, function UserProfileEditPageConstructor(server, router, userService) {
            if (!server.user.isLogin()) {
                router.navigate(['Login']);
                return;
            }
            this.userService = userService;

            let year = (new Date).getFullYear();
            this.years = Array(60).fill().map((x, i) => (year - 15 - i));
            this.monthes = Array(12).fill().map((x, i) => i + 1);
            this.days = Array(30).fill().map((x, i) => i + 1);

            const user = server.user.getUser();
            this.model = {
                personal_data: Object.assign({}, user.personal_data),
                address: Object.assign({}, user.address),
                description: user.description
            };
            console.log(this.model);

        }],
        onSubmit: function () {
            console.log("Edit User", this.model);
            this.userService.editPersonalData(this.model, function (res) {
                console.log("Edit data res: ", res);
            });
        },
        ff(ev) {
            console.log("FF", arguments);
        },
        /*test: function(ev){
            console.log('test22',ev);
        },*/
        /*test2: function(ev){
            console.log('test33',ev);
        }*/
    });

    app.routeList = app.routeList || [];
    app.routeList.push(new ng.router.Route({ path: '/user/edit/personaldata', component: UserProfileEditPage, name: 'ProfileEdit' }));

})(ng, window.app || (window.app = {}));