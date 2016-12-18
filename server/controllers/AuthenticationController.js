/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class AuthenticationController extends ControllerBaseClass {

        get actionMethods() {
            return [
                {
                    action: "actionLogin",
                    url: "/api/login",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionLogout",
                    url: "/api/logout",
                    method: "get",
                    isAjax: true
                }, {
                    action: "actionAccess",
                    url: "/api/access",
                    method: "get",
                    isAjax: true
                }, {
                    action: "actionRegister",
                    url: "/api/register",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionRestore",
                    url: "/api/restore",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionResetPassword",
                    url: "/api/reset-password",
                    method: "post",
                    isAjax: true
                }
            ]
        }

        actionLogin(req, res) {
            if (req.session.user) {
                res.json({ status: true, user: req.session.user });
                return;
            }
            const login = req.body.login;
            const pass = req.body.password;

            app.models.User.findOne({ 'access_data.login': login, 'access_data.password': pass }, function (err, data) {
                data.access_data = null;
                req.session.user = data;
                res.json({ status: true, data: "accept", user: data, error: err });
            });
        }

        actionLogout(req, res) {
            req.session.destroy(function (err) {
                if (err) {
                    res.sendStatus(401);
                } else {
                    res.sendStatus(200);
                }
            });
        }

        actionAccess(req, res) {
            if (req.session.user) {
                res.json({ status: true, user: req.session.user, data: "access", error: null });
            } else {
                res.sendStatus(401);
            }
        }

        actionRegister(req, res) {
            if (req.session.user) {
                res.json({ status: 200, id: req.session.user.id });
                return;
            }

            if (req.body.password !== req.body.passwordConfirm) {
                res.json({ status: 201, error: 'password is not confirmed' });
                return;
            }

            function createUser() {
                let user = new app.models.UserModel();
                user.firstname = req.body.firstName;
                user.secondname = req.body.secondName;
                user.mail = req.body.email;
                user.password = req.body.password;
                user.sex = req.body.sex;

                user.save(function (err, row, fields) {
                    if (!err) {
                        res.json({ status: 200, message: "OK" });
                    } else {
                        res.json({ status: 201, error: "Error insert new user!" });
                    }
                });
            }

            app.models.UserModel.findOne({ 'where': { query: "`mail` = '%s'", data: [req.body.email] } }, function (err, row, fields) {
                if (!err && row && row.uid) {
                    res.json({ status: 201, error: "Email already used!" });
                } else {
                    createUser();
                }
            });
        }

        actionRestore(req, res) {
            if (req.session.user) {
                res.json({ status: 201, error: "You already loggined" });
                return;
            }

            res.json({ status: 200, message: "Email sent!" });
        }

        actionResetPassword(req, res) {
            if (req.session.user) {
                res.json({ status: 201, error: "You already loggined" });
                return;
            }

            res.json({ status: 200, message: "Email sent!" });
        }

    });
};