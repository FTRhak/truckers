(function (ng, app) {
    ng.localization = ng.localization || {};

    app.Logger = ng.core.Injectable({}).Class({
        constructor: function () {
            this.logs = [];


        },
        log: function(message){
            console.log(message);
            this.logs.push(message);
        }

    });

})(ng, window.app);