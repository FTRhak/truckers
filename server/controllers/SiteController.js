/*global app:true, DEBUD:true */
'use strict';

class SiteController {
    get actionMethods() {
        return [
            {
                action: "pageIndex",
                url: "/",
                method: "get"
            },
            {
                action: "pageDev",
                url: "/dev",
                method: "get"
            }
        ];
    }
    pageIndex(req, res) {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    }
    pageDev(req, res) {
        res.render('dev', { title: 'Hey', message: 'Hello there!' });
    }
};

module.exports = SiteController;