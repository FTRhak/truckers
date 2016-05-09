/*global app:true, DEBUD:true */

module.exports = function(ControllerBaseClass) {
    'use strict';

    return (class AuthenticationController extends ControllerBaseClass {

        get actionMethods() {
            return [
                {
                    action: "pageLogin",
                    url: "/login",
                    method: "get"
                },
                {
                    action: "pageRegister",
                    url: "/register",
                    method: "get"
                },
                {
                    action: "pageRestore",
                    url: "/restore",
                    method: "get"
                },
                //-------------------
                {
                    action: "actionLogin",
                    url: "/api/user/login",
                    method: "post"
                }, {
                    action: "actionLogout",
                    url: "/api/logout",
                    method: "post"
                }, {
                    action: "actionAccess",
                    url: "/api/user/access",
                    method: "post"
                }
            ]
        }


        pageLogin(req, res) {
            res.render('login', { title: 'Hey', message: 'Hello there!' });
        }

        pageRegister(req, res) {
            res.render('register', { title: 'Hey', message: 'Hello there!' });
        }

        pageRestore(req, res) {
            res.render('restore', { title: 'Hey', message: 'Hello there!' });
        }

        //-------------------------------
        actionLogin(req, res) {
            if (req.session.user) {
                res.json({ status: 200, user: req.session.user });
                return;
            }
            console.log("BODY:", req.body);
            const login = req.body.login;
            const pass = req.body.password;
            app.models.UserModel.findOne({ 'where': { query: "`mail` = '%s' and `password` = '%s'", data: [login, pass] } }, function(err, row, fields) {
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
            req.session.destroy(function(err) {
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

    });
};