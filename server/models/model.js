
function dbRequest(query, callback) {
    DEBUD && console.log('\x1b[35m%s\x1b[0m', "Query : " + query);
    db.query(query, callback);
}
function MySQLModelConstructor(modelClass) {
    modelClass.prototype.setData = function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            //self[key] = data[key];
        });
    };


    modelClass.query = function (query, callback) {
        dbRequest(query, function (err, result, fields) {
            if (callback) {
                callback(err, result, fields);
            }
        });
    };

    modelClass.find = function (method, conditions, callback) {
        var query = "";
        if (arguments.length === 1 && typeof (method) == "function") {
            callback = method;
            method = 'all';
            conditions = {};
        } else if (arguments.length === 2 && typeof (conditions) == "function") {
            callback = conditions;
            conditions = {};
        }

        var tableName = modelClass.prototype.tableName;
        
        // building query conditions
        var qcond = '';
        var fields = this.prototype.attributes.join(', ');
        if (conditions['fields']) {
            fields = conditions['fields'];
        }
        if (conditions['where']) {
            qcond += " WHERE " + conditions['where'];
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
                dbRequest(query, function (err, result, fields) {
                    if (callback) {
                        if (!err && result) {
                            result = result.map(function (record) {
                                var el = new (modelClass)();
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
                dbRequest(query, function (err, result, fields) {
                    if (callback) {
                        callback(err, result[0]['COUNT(*)'], fields);
                    }
                });
                break;		
            // method returning only first result (to use when you expect only one result)				
            case 'first':
                query = "SELECT " + fields + " FROM " + tableName + qcond;
                dbRequest(query, function (err, result, fields) {
                    if (callback) {
                        if (!err && result) {
                            var el = new (modelClass)();
                            el.setData(result[0]);
                            result = el;
                        }
                        callback(err, result, fields);
                    }
                });
                break;
        }
    };

    modelClass.findOne = function () { };
    modelClass.findAll = function () { };
    modelClass.findById = function () { };

    modelClass.prototype.save = function (callback) {
        var tableName = this.tableName;
        var primaryKey = this.primaryKey || 'id';
        var query = "UPDATE " + tableName + " SET " + db.escape(this.attributes) + " WHERE " + primaryKey + "=" + this.data[primaryKey];
        //var q = "INSERT INTO "+tableName+" SET "+ connection.escape(this.attributes);
        dbRequest(query, function (err, result) {
            if (callback) {
                callback(err, result);
            }
        });
    };
    modelClass.prototype.remove = function (callback) {
        var tableName = this.tableName;
        var primaryKey = this.primaryKey || 'id';
        var query = "DELETE FROM " + tableName + " WHERE " + primaryKey + "=" + this[primaryKey];
        dbRequest(query, function (err, result) {
            if (callback) {
                callback(err, result);
            }
        });
    };


    return modelClass;
}


module.exports = function (modelsList) {
    function initUrlControllers(modelClass) {
        modelsList[modelClass.name] = MySQLModelConstructor(modelClass);
        DEBUD && console.log('\x1b[33m%s\x1b[0m: ', "Init model ", modelClass.name);
    }

    initUrlControllers(require(__dirname + '/UserModel'));
};
