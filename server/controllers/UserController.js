/*global app:true, DEBUD:true */
'use strict';

class UserController {
    get actionMethods() {
        return [
            {
                action: "pageIndex",
                url: "/user",
                method: "get"
            }
        ];
    }

    pageIndex(req, res) {
        //res.render('index', {data: rows});
        //
        /*db.query('SELECT * from user', function (err, rows, fields) {
            res.render('index', {data: rows});
        });*/
        res.render('profile', { data: "" });
    };
};

module.exports = UserController;