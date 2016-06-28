/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class CompanyController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageCreate",
                    url: "/api/company/create",
                    method: "get"
                },
                {
                    action: "actionCreate",
                    url: "/api/company/create",
                    method: "post"
                }
            ];
        }

        pageCreate(req, res) {
            if (!req.session.user) {
                res.sendStatus(404);
                return;
            }
            const user = req.session.user;
            app.models.UserModel.findById(user.uid, function (err, row, fields) {
                if (!err && row) {
                    res.json({ status: 200, user: row.nickname || (row.firstname + ' ' + row.surname) });
                } else {
                    res.sendStatus(404);
                }
            });
        }

        actionCreate(req, res) {
            //res.render('index', {data: rows});
            //
            /*db.query('SELECT * from user', function (err, rows, fields) {
                res.render('index', {data: rows});
            });*/
            //res.render('profile', { data: "" });
            const model = req.body;
            console.log("actionCreate", model);
            res.json({ status: 200, company: model });

        }

    });
}