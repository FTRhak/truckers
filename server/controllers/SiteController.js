module.exports = function UserController() {
    this.actionMethods = [
        {
            action: "index",
            url: "/",
            method: "get"
        }
    ];
    this.index = function (req, res) {
        res.render('index', { title: 'Hey', message: 'Hello there!'});
    };
};