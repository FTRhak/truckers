module.exports = function(ModelBaseClass) {
    'use strict';
    return (class CarModel extends ModelBaseClass {
        static get tableName() {
            return "cars";
        }

        static get primaryKey() {
            return "id";
        }

        static get attributes() {
            return [
                'id',
                'cid',
                'model',
                'car_number',
                'is_deleted'];
        }

        get id() {
            return this.___.id;
        }
        set id(value) {
            this.___.id = value;
        }

        get cid() {
            return this.___.cid;
        }
        set cid(value) {
            this.___.cid = value;
        }

        get model() {
            return this.___.model;
        }
        set model(value) {
            this.___.model = value;
        }

        get car_number() {
            return this.___.car_number;
        }
        set car_number(value) {
            this.___.car_number = value;
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