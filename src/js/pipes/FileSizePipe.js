(function (ng, app) {
    ng.localization = ng.localization || {};

    ng.localization.DateFormat = ng.core.Pipe({
        name: 'filesize'
    }).Class({
        constructor: function () {

        },
        transform: function (value) {
            return "" + value + "";
        }

    });

})(ng, window.app);