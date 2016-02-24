module.exports = function UserController() {
    this.actionMethods = [
        {
            action: "index",
            url: "/edit",
            method: "get"
        },
        {
            action: "user",
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
        res.json({a:1});
    };
    

    this.user = function (req, res) {
        res.json({a:2});
        /*db.query('SELECT * from User', function (err, rows, fields) {
            res.json({user: rows[0]});
        });*/
    };
};