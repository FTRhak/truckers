/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class TranceCompanyController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "actionGetOneItem",
                    url: "/api/trance-company/item/:id",
                    method: "get",
                    isAjax: true
                },
                {
                    action: "actionGetUsersItems",
                    url: "/api/trance-company/uitem/",
                    method: "get",
                    isAjax: true
                },
                {
                    action: "actionCreate",
                    url: "/api/trance-company/create",
                    method: "post",
                    isAjax: true
                }
            ];
        }

        actionGetOneItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const id = req.params.id;
                app.models.TranceCompanyModel.findOne({ 'where': { query: "`id` = '%s' and `is_deleted` = '%s'", data: [id, 0] } }, function (err, row, fields) {
                    if (!err && row) {
                        res.json({ status: 200, data: row.toJson() });
                    } else {
                        res.sendStatus(404);
                    }
                });
            }

        }

        actionGetUsersItems(req, res) {

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