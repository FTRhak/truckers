(function (ng, app) {
    ng.localization = ng.localization || {};

    ng.localization.DateFormat = ng.core.Pipe({
        name: 'dateformat'
    }).Class({
        constructor: function () {

        },
        transform: function (value) {
            return "" + value + "";
        }

    });

})(ng, window.app);