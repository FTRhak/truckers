module.exports = function UserController() {
    this.actionMethods = [
        {
            action: "index",
            url: "/user",
            method: "get"
        }
    ];
    this.index = function (req, res) {
        //res.render('index', {data: rows});
        //
        /*db.query('SELECT * from user', function (err, rows, fields) {
            res.render('index', {data: rows});
        });*/
        res.render('profile', {data: ""});
    };
};