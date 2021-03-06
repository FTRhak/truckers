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
            return { _id: 1001, name: "Test Account" };
        }
        if (!this.isLogin(req)) {
            res.sendStatus(401);
            return false;
        }
        return req.session.user;
    }
    updateUserSession(session, uid, callback) {
        app.models.User.findOne({ _id: uid }, function (err, row, fields) {
            if (!err && row) {
                row.access_data = null;
                session.user = row;
                callback(true, row);
            } else {
                callback(false, {});
            }
        });
    }
    isValidStuctureOfParamsObject(obj, countParams) {
        if (!obj || typeof obj !== "object") {
            return false;
        }
        const keys = Object.keys(obj);
        if (countParams && keys.length !== countParams) {
            return false;
        }

        return true;
    }
    sendEmail() {

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

    //initUrlControllers(require(__dirname + '/SiteController'));
    //initUrlControllers(require(__dirname + '/UserController'));
    //initUrlControllers(require(__dirname + '/AuthenticationController'));
    //initUrlControllers(require(__dirname + '/MessageController'));
    initUrlControllers(require(__dirname + '/api/TranceCompanyController'));
    initUrlControllers(require(__dirname + '/api/TruckController'));
    //initUrlControllers(require(__dirname + '/api/UserController'));
    initUrlControllers(require(__dirname + '/AuthenticationController'));
    initUrlControllers(require(__dirname + '/UserController'));
    //initUrlControllers(require(__dirname + '/car_controller'));

    DEBUD && initUrlControllers(require(__dirname + '/AppInstallationController'));


};
