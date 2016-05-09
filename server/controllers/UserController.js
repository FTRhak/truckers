/*global app:true, DEBUD:true */

module.exports = function(ControllerBaseClass) {
    'use strict';

    return (class UserController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageIndex",
                    url: "/user",
                    method: "get"
                },
                {
                    action: "actionUser",
                    url: "/api/user",
                    method: "post"
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

        actionUser(req, res) {
            if (!req.session.user) {
                res.sendStatus(404);
                return;
            }
            const user = req.session.user;
            app.models.UserModel.findById(user.uid, function(err, row, fields) {
                if (!err && row) {
                    row.security();
                    res.json({ status: 200, user: row.toJson() });
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });
}