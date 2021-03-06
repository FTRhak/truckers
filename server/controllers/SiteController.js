/*global app:true, DEBUD:true */

module.exports = function(ControllerBaseClass) {
    'use strict';

    return (class SiteController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageIndex",
                    url: "/",
                    method: "get",
                    isAjax: false
                },
                {
                    action: "page404",
                    url: "/404",
                    method: "get",
                    isAjax: false
                },
                {
                    action: "pageDev",
                    url: "/dev",
                    method: "get",
                    isAjax: false
                }
            ];
        }
        pageIndex(req, res) {console.log("session:",req.session.user);
            res.render('index', { title: 'Hey', message: 'Hello there!' });
        }
        page404(req, res) {
            res.status(404);
            res.render('404', {});
        }
        pageDev(req, res) {
            res.render('dev', { title: 'Hey', message: 'Hello there!' });
        }
    });
};