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
                    url: "/api/trance-company/uitems/",
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
                    url: "/api/trance-company/edit/:id",
                    method: "post",
                    isAjax: true
                },
                {
                    action: "actionDeleteItems",
                    url: "/api/trance-company/delete/list",
                    method: "delete",
                    isAjax: true
                },
                {
                    action: "actionDeleteItem",
                    url: "/api/trance-company/delete/:id",
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
                    method: "get",
                    isAjax: true
                }
            ];
        }

        getAvailableFields() {
            const availableFields = Object.keys(app.models.TranceCompany.schema.paths);
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
                app.models.TranceCompany.findOne({ _id: id, is_deleted: false }, function (err, data) {
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
                app.models.TranceCompany.find({ uid: id, is_deleted: false }, function (err, data) {
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
                app.models.TranceCompany.find({ _id: { $in: ids }, is_deleted: false }, function (err, data) {
                    res.json({ status: true, data: data, error: err });

                }).limit(limit).skip(offset);
            }
        }
        actionCreateItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const model = req.body.model || {};
                const uid = user.uid;
                const availableFields = this.getAvailableFields();

                let data = {
                    uid: user._id,
                    is_deleted: false
                };
                Object.keys(model).forEach(function (key) {
                    const value = model[key];

                    if (availableFields.indexOf(key) !== -1) {
                        data[key] = value;
                    }
                });


                let item = new app.models.TranceCompany(data);
                item.save(function (err, data) {
                    res.json({ status: true, item_id: data._id, error: err });
                });
            }
        }
        actionEditItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const model = req.body.model || {};
                const uid = user._id;
                const iid = req.params.id;

                app.models.TranceCompany.update({ _id: iid, is_deleted: false, uid: uid }, model, false, function (err, data) {
                    res.json({ status: true, data: { modified: data.nModified, n: data.n }, error: err });
                });
            }
        }
        actionDeleteItem(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const id = req.params.id;
                const uid = user._id;
                /*app.models.TranceCompany.remove({ _id: id, uid: uid, is_deleted: false }, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });*/
                app.models.TranceCompany.update({ _id: id, is_deleted: false, uid: uid }, { is_deleted: true }, false, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }
        }
        actionDeleteItems(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const uid = user._id;
                const ids = req.body.ids || [];
                app.models.TranceCompany.update({ _id: { $in: ids }, is_deleted: false, uid: uid }, { is_deleted: true }, false, function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }
        }
        actionUnDeleteItems(req, res) {
            const user = this.checkAuthentication(req, res);
            if (user) {
                const uid = user._id;
                const ids = req.body.ids || [];
                app.models.TranceCompany.update({ _id: { $in: ids }, is_deleted: true, uid: uid }, { is_deleted: false }, false, function (err, data) {
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

                if (req.query.email) {
                    query.email = req.query.email;
                }

                if (req.query.phone) {
                    query.phone = req.query.phone;
                }
                const radius = (req.query.rad || 3000) / 6371;
                if (req.query.lat && req.query.lng) {
                    query.location = {
                        $near: [req.query.lng * 1, req.query.lat * 1],
                        $maxDistance: radius
                    };

                }
                app.models.TranceCompany.find(query, function (err, data) {
                    res.json({ status: true, data: data, error: err });

                }).limit(limit).skip(offset);

            }
        }

    });
}