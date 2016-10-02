/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class AuthenticationController extends ControllerBaseClass {

        get actionMethods() {
            return [
                {
                    action: "actionLogin",
                    url: "/api/user/login",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionLogout",
                    url: "/api/logout",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionAccess",
                    url: "/api/user/access",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionRegister",
                    url: "/api/user/register",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionRestore",
                    url: "/api/user/restore",
                    method: "post",
                    isAjax: true
                }, {
                    action: "actionResetPassword",
                    url: "/api/user/reset-password",
                    method: "post",
                    isAjax: true
                }
            ]
        }

        actionLogin(req, res) {
            if (req.session.user) {
                res.json({ status: 200, user: req.session.user });
                return;
            }
            const login = req.body.login;
            const pass = req.body.password;
            app.models.UserModel.findOne({ 'where': { query: "`mail` = '%s' and `password` = '%s'", data: [login, pass] } }, function (err, row, fields) {
                if (!err && row) {
                    row.security();
                    req.session.user = row.toJson();
                    res.json({ status: 200, user: row.toJson() });
                } else {
                    res.json({ status: 400, error: "User does not exist!" });
                }
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
                res.json({ status: 200, id: req.session.user.id });
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