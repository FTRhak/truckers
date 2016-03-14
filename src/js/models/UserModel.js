(function(app) {
    class UserModel extends app.ModelBase {

        static get attributes() {
            return [
                'uid',
                'mail',
                'password',
                'fb_key',
                'tw_key',
                'vk_key',
                'gplus_key',
                'date_registration',
                'date_last_login',
                'firstname',
                'surname',
                'nickname',
                'sex',
                'country',
                'city',
                'address',
                'birthday',
                'phone'];
        }

        get uid() {
            return this.___.uid;
        }
        set uid(value) {
            this.___.uid = value;
        }

        get mail() {
            return this.___.mail;
        }
        set mail(value) {
            this.___.mail = value;
        }

        get password() {
            return this.___.password;
        }
        set password(value) {
            this.___.password = value;
        }

        get fb_key() {
            return this.___.fb_key;
        }
        set fb_key(value) {
            this.___.fb_key = value;
        }

        get tw_key() {
            return this.___.tw_key;
        }
        set tw_key(value) {
            this.___.tw_key = value;
        }

        get vk_key() {
            return this.___.vk_key;
        }
        set vk_key(value) {
            this.___.vk_key = value;
        }

        get gplus_key() {
            return this.___.gplus_key;
        }
        set gplus_key(value) {
            this.___.gplus_key = value;
        }

        get date_registration() {
            return this.___.date_registration;
        }
        set date_registration(value) {
            this.___.date_registration = value;
        }

        get date_last_login() {
            return this.___.date_last_login;
        }
        set date_last_login(value) {
            this.___.date_last_login = value;
        }

        get firstname() {
            return this.___.firstname;
        }
        set firstname(value) {
            this.___.firstname = value;
        }

        get surname() {
            return this.___.surname;
        }
        set surname(value) {
            this.___.surname = value;
        }

        get nickname() {
            return this.___.nickname;
        }
        set nickname(value) {
            this.___.nickname = value;
        }

        get sex() {
            return this.___.sex;
        }
        set sex(value) {
            this.___.sex = value;
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

        get birthday() {
            return this.___.birthday;
        }
        set birthday(value) {
            this.___.birthday = value;
        }

        get phone() {
            return this.___.phone;
        }
        set phone(value) {
            this.___.phone = value;
        }

        constructor() {
            super();
        }
    }

    app.UserModel = UserModel;
})(window.app || (window.app = {}));