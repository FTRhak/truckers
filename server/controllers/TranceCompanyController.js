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
                    action: "actionGetItemsByIDs",
                    url: "/api/trance-company/list",
                    method: "post",
                    isAjax: true
                },
                {
                    action: "actionCreateItem",
                    url: "/api/trance-company/create",
                    method: "post",
                    isAjax: true
                },
                {
                    action: "actionEditItem",
                    url: "/api/trance-company/edit",
                    method: "post",
                    isAjax: true
                },
                {
                    action: "actionDeleteItem",
                    url: "/api/trance-company/delete/:id",
                    method: "delete",
                    isAjax: true
                },
                {
                    action: "actionDeleteItems",
                    url: "/api/trance-company/delete/list",
                    method: "delete",
                    isAjax: true
                },
                {
                    action: "actionUnDeleteItems",
                    url: "/api/trance-company/undelete/list",
                    method: "delete",
                    isAjax: true
                },
                {
                    action: "actionSearch",
                    url: "/api/trance-company/search",
                    method: "delete",
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
            const user = this.checkAuthentication(req, res);
            if (user) {
                const id = user.uid;
                const limit = req.body.limit ? req.body.limit * 1 : 1000;
                const offset = req.body.offset ? req.body.offset * 1 : 0;
                const order = 'id';
                app.models.TranceCompanyModel.find({ 'where': { query: "`uid` = '%s' and `is_deleted` = '%s'", data: [id, 0] } }, function (err, row, fields) {
                    if (!err && row) {
                        res.json({ status: 200, data: row.toJson() });
                    } else {
                        res.sendStatus(404);
                    }
                });
            }
        }
        actionGetItemsByIDs(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const id = user.uid;
                const listIds = req.body.list;
                const limit = req.body.limit ? req.body.limit * 1 : 1000;
                const offset = req.body.offset ? req.body.offset * 1 : 0;
                const order = 'id';
                app.models.TranceCompanyModel.find({ 'where': { query: "`id` in '%s' and `is_deleted` = '%s'", data: [listIds, 0] } }, function (err, row, fields) {
                    if (!err && row) {
                        res.json({ status: 200, data: row.toJson() });
                    } else {
                        res.sendStatus(404);
                    }
                });
            }
        }
        actionCreateItem(req, res) {
            //res.render('index', {data: rows});
            //
            /*db.query('SELECT * from user', function (err, rows, fields) {
                res.render('index', {data: rows});
            });*/
            //res.render('profile', { data: "" });
            const user = this.checkAuthentication(req, res);
            if (user) {
                const model = req.body;
                console.log("actionCreate", model);
                res.json({ status: 200, company: model });
            }

        }
        actionEditItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const model = req.body.model;
                const uid = user.uid;
                console.log("actionEditItem", model, uid);
                res.json({ status: 200, company: model });
            }
        }
        actionDeleteItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const id = req.body.id;
                const uid = user.uid;
                console.log("actionDeleteOwnItem", id, uid);
                res.json({ status: 200, company: id });
            }
        }
        actionDeleteItems(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                res.json({ status: 200, company: 1 });
            }
        }
        actionUnDeleteItems(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                res.json({ status: 200, company: 1 });
            }
        }
        actionSearch(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                res.json({ status: 200, company: 1 });
            }
        }

    });
}