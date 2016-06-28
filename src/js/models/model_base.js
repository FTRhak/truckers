(function(app) {
    'use strict';

    class ModelBase {
        constructor() {
            let attributes = this.constructor.attributes;
            for (let i = 0; i < attributes.length; i++) {
                const attributeName = attributes[i];
                this[attributeName] = null;
            }
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
            return {};
        }
    }

    app.ModelBase = ModelBase;
})(window.app || (window.app = {}));