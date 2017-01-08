(function (Pipe, app) {
    app.pipes = app.pipes || {};

    app.pipes.DateFormat = Pipe({
        name: 'dateformat'
    }).Class({
        constructor: function () {

        },
        transform: function (value) {
            return "" + value + "";
        }

    });

})(ng.core.Pipe, window.app);