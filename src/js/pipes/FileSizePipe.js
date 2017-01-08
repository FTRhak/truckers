(function (Pipe, app) {
    app.pipes = app.pipes || {};

    app.pipes.FileSize = Pipe({
        name: 'filesize',
        implements: [ng.core.PipeTransform]
    }).Class({
        constructor: function () {

        },
        transform: function (value) {
            return "K" + value + "K";
        }

    });

})(ng.core.Pipe, window.app);