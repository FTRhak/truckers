(function (ng, app) {
    app.Logger = ng.core.Injectable({}).Class({
        constructor: function () {
            this.logs = [];


        },
        log: function(message){
            console.log(message);
            this.logs.push(message);
        }

    });

})(ng, (window.app || (window.app = {})));