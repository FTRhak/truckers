/*global app:true, DEBUD:true, __dirname:true */
'use strict';

class ControllerBase {
    constructor() {

    }
}

module.exports = function (express) {
    function initUrlControllers(controllerClassBuild) {
        let controllerClass = controllerClassBuild(ControllerBase);
        let obj = new controllerClass();
        obj.actionMethods.forEach(function (el) {
            let action = el.action;
            let method = el.method;
            let url = el.url;
            express[method](url, obj[action]);
        });
        DEBUD && console.log('\x1b[33m%s\x1b[0m: ', "Init controller ", controllerClass.name);
    }

    initUrlControllers(require(__dirname + '/SiteController'));
    initUrlControllers(require(__dirname + '/UserController'));
    initUrlControllers(require(__dirname + '/AuthenticationController'));
    initUrlControllers(require(__dirname + '/MessageController'));
    initUrlControllers(require(__dirname + '/TranceCompanyController'));
    initUrlControllers(require(__dirname + '/car_controller'));

};
