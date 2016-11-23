/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class MessageController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageIndex",
                    url: "/api/message/index",
                    method: "get",
                    isAjax: true
                }
            ];
        }

        pageIndex(req, res) {
            res.json({ message: 'index' });
        }
    });
};