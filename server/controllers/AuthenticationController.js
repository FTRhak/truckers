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
        },
        //-------------------
        {
            action: "actionLogin",
            url: "/api/user/login",
            method: "post"
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
    
    //-------------------------------
    this.actionLogin = function (req, res) {
        res.json({ title: 'Hey', message: 'Hello there!' });
    };
    
};