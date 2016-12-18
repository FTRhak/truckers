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
                res.json({ status: false, error: 'user is logged already' });
                return;
            }

            if (req.body.password !== req.body.passwordConfirm) {
                res.json({ status: false, error: 'password is not confirmed' });
                return;
            }

            function createUser() {
                let model = {
                    personal_data: {},
                    access_data: {},
                    contacts: {},
                    date_created: Date.now(),
                    date_last_visit: Date.now()
                };
                model.personal_data.firstname = req.body.firstName;
                model.personal_data.surname = req.body.secondName;
                model.contacts.email = req.body.email;
                model.access_data.password = req.body.password;
                model.access_data.login = req.body.login;

                let item = new app.models.User(model);
                item.save(function (err, data) {
                    res.json({ status: true, data: data, error: err });
                });
            }

            app.models.User.findOne({ $or: [{ 'access_data.login': req.body.login }, { 'contacts.email': req.body.email }] }, function (err, data) {
                if (data || err) {
                    res.json({ status: true, error: err || "user exist" });
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