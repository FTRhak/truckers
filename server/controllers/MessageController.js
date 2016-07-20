/*global app:true, DEBUD:true */
'use strict';
module.exports = function(ControllerBaseClass) {
    'use strict';

    return (class MessageController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageIndex",
                    url: "/message/index",
                    method: "get",
                    isAjax: true
                }
            ];
        }

        pageIndex(req, res) {
            res.json({ message: 'index' });
        };
    });
};