/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class TruckController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "actionGetOneItem",
                    url: "/api/user/:id",
                    method: "get",
                    isAjax: true
                },
                {
                    action: "actionGetUsersItems",
                    url: "/api/user/",
                    method: "get",
                    isAjax: true
                },
                {
                    action: "actionGetItemsByIDs",
                    url: "/api/user/list",
                    method: "post",
                    isAjax: true
                },
                {
                    action: "actionCreateItem",
                    url: "/api/user/create",
                    method: "post",
                    isAjax: true
                },
                {
                    action: "actionEditItem",
                    url: "/api/user/edit",
                    method: "post",
                    isAjax: true
                },
                /*{
                    action: "actionDeleteItems",
                    url: "/api/user/delete/list",
                    method: "delete",
                    isAjax: true
                },*/
                {
                    action: "actionDeleteItem",
                    url: "/api/user/delete",
                    method: "delete",
                    isAjax: true
                },
                /*{
                    action: "actionUnDeleteItems",
                    url: "/api/user/undelete/list",
                    method: "delete",
                    isAjax: true
                },*/
                {
                    action: "actionSearch",
                    url: "/api/user/search",
                    method: "get",
                    isAjax: true
                }
            ];
        }

        getAvailableFields() {
            const availableFields = Object.keys(app.models.User.schema.paths);
            availableFields.forEach(
                (el) => {
                    if (el.indexOf('.') > 0) {
                        let temp = el.split('.');
                        availableFields.push(temp[0]);
                    }
                }
            );
            return availableFields.filter(
                (el) => { return ['_id', '__v', 'is_deleted', 'uid'].indexOf(el) == -1 }
            );
        }

        actionGetOneItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const id = req.params.id;
                app.models.User.findOne({ _id: id, is_deleted: false }, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }
        }
        actionGetUsersItems(req, res) {
            const user = this.checkAuthentication(req, res);

            if (user) {
                const id = user._id;
                const limit = req.query.limit ? req.query.limit * 1 : 1000;
                const offset = req.query.offset ? req.query.offset * 1 : 0;
                const order = 'id';
                app.models.User.find({ _id: id, is_deleted: false }, function (err, data) {
                    res.json({ status: true, data: data, error: err });

                }).limit(limit).skip(offset);
            }
        }
        actionGetItemsByIDs(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const ids = req.body.ids || [];
                const limit = req.query.limit ? req.query.limit * 1 : 1000;
                const offset = req.query.offset ? req.query.offset * 1 : 0;
                const order = 'id';
                app.models.User.find({ _id: { $in: ids }, is_deleted: false }, function (err, data) {
                    res.json({ status: true, data: data, error: err });

                }).limit(limit).skip(offset);
            }
        }
        actionCreateItem(req, res) {
            const model = req.body.model || {};
            const availableFields = this.getAvailableFields();

            /*if (model.login && model.password && model.email && model.firstname && model.surname) {
                let data = {
                    is_deleted: false,
                    access_data: {
                        login: model.login,
                        password: model.password,
                    },
                    personal_data: {
                        firstname: model.firstname,
                        surname: model.surname
                    },
                    contacts: {
                        email: model.email
                    },
                    date_created: new Date()
                };


                let item = new app.models.User(data);
                item.save(function (err, data) {
                    res.json({ status: true, item_id: data._id, error: err });
                });
            } else {
                res.json({ status: true, error: { message: "Invalid data" } });
            }*/
            let item = new app.models.User(model);
            item.save(function (err, data) {
                res.json({ status: true, item_id: data._id, error: err });
            });
        }
        actionEditItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const model = req.body.model || {};
                const uid = user._id;

                app.models.User.update({ _id: uid, is_deleted: false }, model, false, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }
        }
        actionDeleteItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const uid = user._id;
                /*app.models.TranceCompany.remove({ _id: id, uid: uid, is_deleted: false }, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });*/
                app.models.User.update({ _id: uid, is_deleted: false }, { is_deleted: true }, false, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }
        }
        actionDeleteItems(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const uid = user._id;
                const ids = req.body.ids || [];
                app.models.User.update({ _id: { $in: ids }, is_deleted: false }, { is_deleted: true }, false, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }
        }
        actionUnDeleteItems(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const uid = user._id;
                const ids = req.body.ids || [];
                app.models.User.update({ _id: { $in: ids }, is_deleted: true, uid: uid }, { is_deleted: false }, false, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }
        }
        actionSearch(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                let query = { is_deleted: false };

                const limit = req.query.limit ? req.query.limit * 1 : 1000;
                const offset = req.query.offset ? req.query.offset * 1 : 0;
                const order = req.query.order || 'name';

                if (req.query.name) {
                    query.name = req.query.name;
                }

                app.models.User.find(query, function (err, data) {
                    res.json({ status: true, data: data, error: err });

                }).limit(limit).skip(offset);

            }
        }

    });
}