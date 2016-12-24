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
                    action: "actionRegisterConfirm",
                    url: "/api/register/confirm/:key",
                    method: "get",
                    isAjax: true

                },
                {
                    action: "actionRestore",
                    url: "/api/restore",
                    method: "post",
                    isAjax: true
                }
            ]
        }

        passwordCrypt(value) {
            return md5(settings.crypt.salt_prefix + value + settings.crypt.salt);
        }

        confirmationKeyCrypt(value) {
            return md5(settings.crypt.confirmation_key_salt + value);
        }

        actionLogin(req, res) {
            if (req.session.user) {
                req.session.user = null;
                res.json({ status: false, data: "error", user: req.session.user });
                return;
            }
            const login = req.body.login;
            const pass = this.passwordCrypt(req.body.password);

            app.models.User.findOne({ 'access_data.login': login, 'access_data.password': pass }, function (err, data) {
                if (data && data.access_data) {
                    data.access_data = null;
                    req.session.user = data;
                }
                res.json({ status: !!data, data: (data ? "accept" : "error"), user: data, error: err });
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
            let self = this;
            if (req.session.user) {
                res.json({ status: false, data: "error", error: 'user is logged already' });
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
                model.access_data.password = self.passwordCrypt(req.body.password);
                model.access_data.login = req.body.login;
                model.access_data.confirmation_key = self.confirmationKeyCrypt(req.body.login + req.body.password);

                let item = new app.models.User(model);
                item.save(function (err, data) {
                    if (data) {
                        app.mailer.Authentication.sendNotification(data);
                        data.access_data = null;
                    }
                    res.json({ status: !!data, data: data, error: err });
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

        actionRegisterConfirm(req, res) {
            if (req.session.user) {
                res.json({ status: false, data: "error", error: 'user is logged already' });
                return;
            }
            const key = req.params.key;
            app.models.User.update({ 'access_data.confirmation_key': key, 'access_data.is_confirmed':false }, {'access_data.is_confirmed':true}, function (err, data) {
                res.json({ status: true, error: err, data: data && data.nModified });
            });
        }

        actionRestore(req, res) {
            if (req.session.user) {
                res.json({ status: 201, error: "You already loggined" });
                return;
            }
            const email = req.body.email;
            const newPassword = md5(new Date()).substr(0, 8);
            console.log("New pass:",newPassword);

            const cryptPassword = this.passwordCrypt(newPassword);

            app.models.User.update({ 'contacts.email': email }, {'access_data.password':cryptPassword}, function (err, data) {
                app.mailer.Authentication.sendNewPassword(email, newPassword);
                res.json({ status: true, error: err, data: data && data.nModified });
            });
        }

    });
};