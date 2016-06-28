(function(app) {
    'use strict';

    class CompanyModel extends app.ModelBase {

        static get attributes() {
            return [
                'id',
                'uid',
                'company_name',
                'logo',
                'latitude',
                'longitude',
                'country',
                'city',
                'address',
                'email',
                'phone',
                'is_deleted'];
        }

        /*get uid() {
            return this.___.uid;
        }
        set uid(value) {
            this.___.uid = value;
        }
*/
        constructor() {
            super();
        }
    }

    app.CompanyModel = CompanyModel;
})(window.app || (window.app = {}));