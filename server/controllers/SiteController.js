module.exports = function SiteController() {
    this.actionMethods = [
        {
            action: "index",
            url: "/",
            method: "get"
        },
        {
            action: "dev",
            url: "/dev",
            method: "get"
        }
    ];
    this.index = function (req, res) {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    };
    this.dev = function(req, res){
        res.render('dev', { title: 'Hey', message: 'Hello there!' });
    }
};