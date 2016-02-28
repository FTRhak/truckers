module.exports = function AuthenticationController() {
    this.actionMethods = [
        {
            action: "pageLogin",
            url: "/login",
            method: "get"
        },
        {
            action: "pageRegister",
            url: "/register",
            method: "get"
        },
        {
            action: "pageRestore",
            url: "/restore",
            method: "get"
        }
    ];


    this.pageLogin = function (req, res) {
        res.render('login', { title: 'Hey', message: 'Hello there!' });
    };

    this.pageRegister = function (req, res) {
        res.render('register', { title: 'Hey', message: 'Hello there!' });
    };

    this.pageRestore = function (req, res) {
        res.render('restore', { title: 'Hey', message: 'Hello there!' });
    };
};