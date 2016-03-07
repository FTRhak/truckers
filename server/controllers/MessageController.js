/*global app:true, DEBUD:true */
'use strict';

class MessageController {
    get actionMethods() {
        return [
            {
                action: "pageIndex",
                url: "/message/index",
                method: "get"
            }
        ];
    }

    pageIndex(req, res) {
        res.json({ message: 'index' });
    };
};

module.exports = MessageController;