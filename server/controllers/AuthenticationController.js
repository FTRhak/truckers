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
        var user = new app.models.UserModel();

        /*app.models.UserModel.findOne({ 'where': { query: "`mail` = '%s' and `password` = '%s'", data: ['admin', 'Aa124'] } }, function (err, rows, fields) {
            console.log(err, rows);
        });*/
        app.models.UserModel.findById(1, function (err, rows, fields) {
            console.log(err, rows);
        });
        
        /*app.models.UserModel.findOne({ 'where': { query: "`mail` = '%s' and `password` = '%s'", data: ['admin', 'Aa124'] } },
            function (err, rows, fields) {
                console.log(err, rows.toJson());
                res.json({ status: rows });
            });*/
        user.uid = 123;
        user.mail = "ftr@fd.sd";
        user.phone = 123;
        res.json({ status: user, data: user.mail });
        /*user.test();
        var user2 = new app.models.UserModel();*/


    };

};