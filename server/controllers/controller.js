/*global app:true, DEBUD:true, __dirname:true */
'use strict';

class ControllerBase {
    constructor() {

    }
    isAjax(req) {
        return req.xhr;
    }
    isLogin(req) {
        return !!req.session.user;
    }
    checkAuthentication(req, res) {
        if (DEBUD && req.headers['access-for-test']) {
            return {uid: 1, name: "Test Account"};
        }
        if (!this.isLogin(req)) {
            res.sendStatus(401);
            return false;
        }
        return req.session.user;
    }
}

module.exports = function (express) {
    function initUrlControllers(controllerClassBuild) {
        let controllerClass = controllerClassBuild(ControllerBase);
        let obj = new controllerClass();
        DEBUD && console.log('\x1b[33m%s\x1b[0m: ', "Init controller ", controllerClass.name);
        obj.actionMethods.forEach(function (el) {
            let action = el.action;
            let method = el.method;
            let url = el.url;
            const isAjax = el.isAjax;
            if (isAjax) {
                express[method](url, obj[action].bind(obj));
            }
        });
    }

    initUrlControllers(require(__dirname + '/SiteController'));
    initUrlControllers(require(__dirname + '/UserController'));
    initUrlControllers(require(__dirname + '/AuthenticationController'));
    initUrlControllers(require(__dirname + '/MessageController'));
    initUrlControllers(require(__dirname + '/TranceCompanyController'));
    initUrlControllers(require(__dirname + '/car_controller'));

    DEBUD && initUrlControllers(require(__dirname + '/AppInstallationController'));
    

};
