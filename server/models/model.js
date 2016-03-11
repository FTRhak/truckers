/*global app:true, db:true, DEBUD:true, __dirname:true */

'use strict';

/**
 * @param {string} query
 * @param {function} callback
 */
function dbRequest(query, callback) {
    DEBUD && console.log('\x1b[35m%s\x1b[0m', "Query : " + query);
    db.query(query, function(err, result, fields) {
        if (err.code === 'ECONNREFUSED') {
            console.error('\x1b[31m%s\x1b[0m', "DB error connection!");
        }
        callback(err, result, fields)
    });
}

function activeRecordParser(str, variables) {
    var pattern = /%s|%d/g;
    var i = 0;
    var res = str.replace(pattern, function(capture) {
        return variables[i++];
    });
    return res;
}

class ModelBase {
    setData(data) {
        let i, key, attributes = this.constructor.attributes;
        for (i = 0; i < attributes.length; i++) {
            key = attributes[i];
            if (data[key] !== undefined) {
                this[key] = data[key];
            }
        }
    }

    /**
     * @param {string} query
     * @param {function} callback
     */
    static query(query, callback) {
        dbRequest(query, function(err, result, fields) {
            if (callback) {
                callback(err, result, fields);
            }
        });
    }

    /**
     * @param {string} method
     * @param {Object} conditions
     * @param {function} callback
     */
    static find(method, conditions, callback) {
        let self = this;
        let query = "";
        if (arguments.length === 1 && typeof (method) == "function") {
            callback = method;
            method = 'all';
            conditions = {};
        } else if (arguments.length === 2 && typeof (conditions) == "function") {
            callback = conditions;
            conditions = {};
        }

        let tableName = self.tableName;

        // building query conditions
        let qcond = '';
        let fields = self.attributes.join(', ');
        if (conditions['fields']) {
            fields = conditions['fields'];
        }
        if (conditions['where']) {
            qcond += " WHERE " + activeRecordParser(conditions['where'].query, conditions['where'].data);
        }
        if (conditions['group']) {
            qcond += " GROUP BY " + conditions['group'];
            if (conditions['groupDESC']) {
                qcond += " DESC";
            }
        }
        if (conditions['having']) {
            qcond += " HAVING " + conditions['having'];
        }
        if (conditions['order']) {
            qcond += " ORDER BY " + conditions['order'];
            if (conditions['orderDESC']) {
                qcond += " DESC";
            }
        }
        if (conditions['limit']) {
            qcond += " LIMIT " + conditions['limit'];
        }

        switch (method) {
            // default method
            case 'all':
                query = "SELECT " + fields + " FROM " + tableName + qcond;
                dbRequest(query, function(err, result, fields) {
                    if (callback) {
                        if (!err && result) {
                            result = result.map(function(record) {
                                let el = new self;
                                el.setData(record);
                                return el;
                            });
                        }
                        callback(err, result, fields);
                    }
                });

                break;
            // method returning value of COUNT(*)
            case 'count':
                query = "SELECT COUNT(*) FROM " + tableName + qcond;
                dbRequest(query, function(err, result, fields) {
                    if (callback) {
                        callback(err, result[0]['COUNT(*)'], fields);
                    }
                });
                break;
            // method returning only first result (to use when you expect only one result)				
            case 'first':
                query = "SELECT " + fields + " FROM " + tableName + qcond;
                dbRequest(query, function(err, result, fields) {
                    if (callback) {
                        if (!err && result && result.length) {
                            let el = new self;
                            el.setData(result[0]);
                            result = el;
                        } else if (result && result.length) {
                            result = result[0];
                        }
                        callback(err, result, fields);
                    }
                });
                break;
        }
    }

    static findOne(conditions, callback) {
        this.find('first', conditions, callback);
    }

    static findAll(conditions, callback) {
        this.find('all', conditions, callback);
    };
    static findById(id, callback) {
        this.find('first', { 'where': { query: " `" + this.primaryKey + "` = %d ", data: [id] } }, callback);
    };

    save(callback) {
        let tableName = this.constructor.tableName;
        let primaryKey = this.constructor.primaryKey || 'id';
        let query = "UPDATE " + tableName + " SET " + db.escape(this.attributes) + " WHERE " + primaryKey + "=" + this.data[primaryKey];
        //var q = "INSERT INTO "+tableName+" SET "+ connection.escape(this.attributes);
        dbRequest(query, function(err, result) {
            if (callback) {
                callback(err, result);
            }
        });
    }

    remove(callback) {
        var tableName = this.constructor.tableName;
        var primaryKey = this.constructor.primaryKey || 'id';
        var query = "DELETE FROM " + tableName + " WHERE " + primaryKey + "=" + this[primaryKey];
        dbRequest(query, function(err, result) {
            if (callback) {
                callback(err, result);
            }
        });
    }

    toJson() {
        return this.___;
    }

    constructor() {
        let attributes = this.constructor.attributes;
        let i;
        let privateProperties = {};
        attributes.forEach(function(key) {
            privateProperties[key] = null;
        });
        this.___ = privateProperties;
    }
}

module.exports = function(modelsList) {
    modelsList['ModelBase'] = ModelBase;

    function initUrlControllers(modelClass) {
        modelsList[modelClass.name] = modelClass;//MySQLModelConstructor(modelClass);
        DEBUD && console.log('\x1b[33m%s\x1b[0m: ', "Init model ", modelClass.name);
    }

    initUrlControllers(require(__dirname + '/UserModel'));
};
