/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class AppInstallationController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "actionDbTrace",
                    url: "/install/db/trace",
                    method: "get",
                    isAjax: true
                },
                {
                    action: "actionDbAddBaseData",
                    url: "/install/db/addbasedata",
                    method: "get",
                    isAjax: true
                },
                {
                    action: "actionDbAddTestData",
                    url: "/install/db/addtrestdata",
                    method: "get",
                    isAjax: true
                },
                {
                    action: "actionDbDump",
                    url: "/install/db/dump",
                    method: "get",
                    isAjax: true
                }
            ];
        }
        actionDbTrace(req, res) {

        }
        actionDbAddBaseData(req, res) {

        }
        actionDbAddTestData(req, res) {

        }
        actionDbDump(req, res) {

        }
    });
};