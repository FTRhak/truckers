/*global app:true, DEBUD:true */
'use strict';

class AuthenticationController {

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
                method: "get"
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
            res.json({ status: 200, action: 'redirect', url: '/user' });
            return;
        }
        const login = req.body.login;
        const pass = req.body.password;
        app.models.UserModel.findOne({ 'where': { query: "`mail` = '%s' and `password` = '%s'", data: [login, pass] } }, function (err, row, fields) {
            if (!err && row) {
                req.session.user = row;
                res.json({ status: 200, action: 'redirect', url: '/user' });
            } else {
                res.json({ status: 400, error: "User does not exist!" });
            }
        });
    }
    
    actionLogout(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                res.json({ status: 400, error: err });
            } else {
                res.json({ status: 200, action: 'redirect', url: '/' });
            }
        });
    }
    
    actionAccess(req, res) {
        res.json({ status: 200, access: true });
    }

};

module.exports = AuthenticationController;