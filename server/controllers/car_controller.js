/*global app:true, DEBUD:true */

module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class CarController extends ControllerBaseClass {
        get actionMethods() {
            return [
                {
                    action: "pageCompanyCars",
                    url: "/company-cars/:id",
                    method: "get",
                    isAjax: true
                }
            ];
        }
        pageCompanyCars(req, res) {
            const user = this.checkAuthentication(req, res);
            app.models.CarModel.findAll({ 'where': { query: "`cid` = '%s' and `is_deleted` = '%s'", data: [1, 0] } }, function (err, row, fields) {
                if (!err && row) {
                    res.json({ status: 200, data: row.toJson() });
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });
};