(function (ng) {
    ng.localization = ng.localization || {};

    ng.localization.Translate = ng.core.Pipe({
        name: 'translate'
    }).Class({
        constructor: function () {

        },
        transform: function (value) {
            return ""+value+"";
        }

    });

})(ng);