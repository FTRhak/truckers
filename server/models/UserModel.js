module.exports = function UserModel() {
    this.tableName = "users";

    this.primaryKey = 'uid';

    this.attributes = ['uid', 'mail', 'password'];

    var data = {};

    Object.defineProperty(this, 'data', {
        get: function () {
            return data;
        }
    });


    this.constructor = function () {
        this.attributes.forEach(function (key) {
            data[key] = null;
        });
    };
};