(function (Pipe, app) {
    app.pipes = app.pipes || {};

    app.pipes.AgeFormat = Pipe({
        name: 'age'
    }).Class({
        constructor: function () {

        },
        transform: function (value) {
            return "Age:" + value + "";
        }

    });

})(ng.core.Pipe, window.app);