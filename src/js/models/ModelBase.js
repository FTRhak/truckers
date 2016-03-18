(function(app) {
    'use strict';

    class ModelBase {
        constructor() {
            this.___ = {};
        }
        setData(data) {
            let i, key, attributes = this.constructor.attributes;
            for (i = 0; i < attributes.length; i++) {
                key = attributes[i];
                if (data[key] !== undefined) {
                    this[key] = data[key];
                }
            }
        }
        toJson() {
            return this.____;
        }
    }

    app.ModelBase = ModelBase;
})(window.app || (window.app = {}));