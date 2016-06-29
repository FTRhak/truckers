/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class TranceCompanyController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageCreate",
                    url: "/api/trance-company/create",
                    method: "get"
                },
                {
                    action: "pageItem",
                    url: "/api/trance-company/item/:id",
                    method: "get"
                },
                {
                    action: "pageUserItem",
                    url: "/api/trance-company/uitem/",
                    method: "get"
                },
                {
                    action: "actionCreate",
                    url: "/api/trance-company/create",
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

        pageUserItem(req, res) {
            if (!req.session.user) {
                res.sendStatus(404);
                return;
            }
            const user = req.session.user;
            app.models.TranceCompanyModel.findOne({ 'where': { query: "`uid` = '%s' and `is_deleted` = '%s'", data: [user.uid, 0] } }, function (err, row, fields) {
                if (!err && row) {
                    res.json({ status: 200, data: row.toJson() });
                } else {
                    res.sendStatus(404);
                }
            });
        }

        pageItem(req, res) {
            if (!req.session.user) {
                res.sendStatus(404);
                return;
            }
            const user = req.session.user;
            const cid = req.params.id;
            app.models.TranceCompanyModel.findOne({ 'where': { query: "`id` = '%s' and `is_deleted` = '%s'", data: [cid, 0] } }, function (err, row, fields) {
                if (!err && row) {
                    res.json({ status: 200, data: row.toJson() });
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