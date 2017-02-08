/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class UserController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageIndex",
                    url: "/user",
                    method: "get",
                    isAjax: false
                },
                {
                    action: "actionUser",
                    url: "/api/user",
                    method: "post",
                    isAjax: true
                },
                {
                    action: "actionEditPersonalData",
                    url: "/api/user/edit/personaldata",
                    method: "post",
                    isAjax: true
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
            app.models.UserModel.findById(user.uid, function (err, row, fields) {
                if (!err && row) {
                    row.security();
                    res.json({ status: 200, user: row.toJson() });
                } else {
                    res.sendStatus(404);
                }
            });
        }

        actionEditPersonalData(req, res) {
            if (!req.session.user) {
                res.sendStatus(404);
                return;
            }
            let self = this;
            const user = req.session.user;
            const model = req.body || {};
            const uid = user._id;
            let newUserData = {};
            if (this.isValidStuctureOfParamsObject(model.personal_data, 7)) {
                newUserData.personal_data = model.personal_data;
            }
            if (this.isValidStuctureOfParamsObject(model.address, 3)) {
                newUserData.address = model.address;
            }
            if (model.description && model.description !== user.description) {
                newUserData.description = model.description;
            }

            app.models.User.update({ _id: uid }, newUserData, false, function (err, data) {
                if (data && data.nModified === 1) {
                    self.updateUserSession(req.session, uid, function(status, user){
                        res.json({ status: true, data: data, error: err });
                    });
                } else {
                    res.json({ status: true, data: data, error: err });
                }
            });
        }
    });
}