function UserModel() {
    var data = {};

    Object.defineProperty(this, 'data', {
        enumerable: true,
        configurable: false,
        get: function () {
            return data;
        }
    });


    this.constructor = function () {
        var self = this;
        this.attributes.forEach(function (key) {
            data[key] = null;

            Object.defineProperty(self, key, {
                enumerable: true,
                configurable: false,
                get: function () {
                    return data[key];
                },
                set: function (value) {
                    if (self.attributes.indexOf(key) !== -1) {
                        data[key] = value;
                    }
                }
            });
        });
    };
    
    this.constructor();
};

UserModel.prototype.tableName = "users";

UserModel.prototype.attributes = ['uid', 'mail', 'password'];

UserModel.prototype.primaryKey = 'uid';


module.exports = UserModel;