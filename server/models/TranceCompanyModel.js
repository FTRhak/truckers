module.exports = function(ModelBaseClass) {
    'use strict';
    return (class TranceCompanyModel extends ModelBaseClass {
        static get tableName() {
            return "trance_companies";
        }

        static get primaryKey() {
            return "id";
        }

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

        get id() {
            return this.___.id;
        }
        set id(value) {
            this.___.id = value;
        }

        get uid() {
            return this.___.uid;
        }
        set uid(value) {
            this.___.uid = value;
        }

        get company_name() {
            return this.___.company_name;
        }
        set company_name(value) {
            this.___.company_name = value;
        }

        get logo() {
            return this.___.logo;
        }
        set logo(value) {
            this.___.logo = value;
        }

        get latitude() {
            return this.___.latitude;
        }
        set latitude(value) {
            this.___.latitude = value;
        }

        get longitude() {
            return this.___.longitude;
        }
        set longitude(value) {
            this.___.longitude = value;
        }

        get country() {
            return this.___.country;
        }
        set country(value) {
            this.___.country = value;
        }

        get city() {
            return this.___.city;
        }
        set city(value) {
            this.___.city = value;
        }

        get address() {
            return this.___.address;
        }
        set address(value) {
            this.___.address = value;
        }

        get email() {
            return this.___.email;
        }
        set email(value) {
            this.___.email = value;
        }

        get phone() {
            return this.___.phone;
        }
        set phone(value) {
            this.___.phone = value;
        }

        get is_deleted() {
            return this.___.is_deleted;
        }
        set is_deleted(value) {
            this.___.is_deleted = value;
        }

        constructor() {
            super();

        }

        security() {
            this.password = "";
        }
    });
};