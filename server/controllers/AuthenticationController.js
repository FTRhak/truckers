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

        confirmationKeyCrypt(value1, value2) {
            return md5(md5(settings.crypt.confirmation_key_salt + value1) + md5(value2 + Date.now()) + Date.now());
        }

        actionLogin(req, res) {
            if (req.session.user) {
                res.json({ status: false, data: "AC-100", user: req.session.user });
                return;
            }

            const login = (req.body.login || "").substr(0, 64);
            const password = (req.body.password || "").substr(0, 64);

            if (login < 4 || password.length < 5 ) {
                res.json({ status: false, data: "VL-2" });
                return;
            }
            
            const pass = this.passwordCrypt(password);

            app.models.User.findOne({ 'access_data.login': login, 'access_data.password': pass }, function (err, data) {
                if (data && data.access_data) {
                    data.access_data = null;
                    req.session.user = data;
                }
                res.json({ status: !!data, data: (data ? "accept" : ((err) ? "AC-102" : "AC-101")), user: data, error: err });
            });
        }

        actionLogout(req, res) {
            req.session.destroy(function (err) {
                res.json({ status: true, data: null, user: null, error: err });
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
                res.json({ status: false, data: "AC-100", user: req.session.user });
                return;
            }
            const email = req.body.email || "";
            const login = req.body.login || "";
            const password = req.body.password || "";
            const firstName = req.body.firstName;
            const secondName = req.body.secondName;

            if (!validator.isEmail(email)) {
                res.json({ status: false, data: "VL-0" });
                return;
            }

            if (login.length < 4 || password.length < 5 ) {
                res.json({ status: false, data: "VL-2" });
                return;
            }

            if (firstName.length < 4 || secondName.length < 5 ) {
                res.json({ status: false, data: "VL-3" });
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
                model.personal_data.firstname = firstName;
                model.personal_data.surname = secondName;
                model.contacts.email = email;
                model.access_data.password = self.passwordCrypt(password);
                model.access_data.login = login;
                model.access_data.email = email;
                model.access_data.confirmation_key = self.confirmationKeyCrypt(login, password.substr(1, 4));

                let item = new app.models.User(model);
                item.save(function (err, data) {
                    if (data) {
                        app.mailer.Authentication.sendNotification(data);
                        data.access_data = null;
                        data.settings = null;
                    }
                    res.json({ status: !!data, data: data, error: err });
                });
            }

            app.models.User.findOne({ $or: [{ 'access_data.login': login }, { 'access_data.email': email }] }, function (err, data) {
                if (data || err) {
                    res.json({ status: false, data: "AC-103", error: err || "user exist" });
                } else {
                    createUser();
                }
            });
        }

        actionRegisterConfirm(req, res) {
            if (req.session.user) {
                res.json({ status: false, data: "AC-100", user: req.session.user });
                return;
            }
            const key = req.params.key;

            if (!validator.isMD5(key)) {
                res.json({ status: false, data: "VL-1" });
                return;
            }

            app.models.User.update({ 'access_data.confirmation_key': key, 'access_data.is_confirmed': false }, { 'access_data.is_confirmed': true, 'access_data.confirmation_key': '' }, function (err, data) {
                res.json({ status: true, data: data && data.nModified, error: err });
            });
        }

        actionRestore(req, res) {
            if (req.session.user) {
                res.json({ status: true, data: "AC-100", user: req.session.user });
                return;
            }
            const email = req.body.email || "";

            if (!validator.isEmail(email)) {
                res.json({ status: false, data: "VL-0" });
                return;
            }

            const newPassword = md5(new Date()).substr(0, 8);
            DEBUD && console.log("New pass:", newPassword);

            const cryptPassword = this.passwordCrypt(newPassword);

            app.models.User.update({ 'contacts.email': email }, { 'access_data.passwordRestore': cryptPassword }, function (err, data) {
                app.mailer.Authentication.sendNewPassword(email, newPassword);
                res.json({ status: true, error: err });
            });
        }

    });
};