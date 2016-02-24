module.exports = function (express) {
    function initUrlControllers(controllerClass) {
        var obj = new controllerClass();
        obj.actionMethods.forEach(function (el) {
            var action = el.action;
            var method = el.method;
            var url = el.url;
            express[method](url, obj[action]);
        });
    }

    initUrlControllers(require(__dirname+ '/SiteController'));
    initUrlControllers(require(__dirname+ '/UserController'));
    initUrlControllers(require(__dirname+ '/MessageController'));
};
