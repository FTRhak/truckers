
function dbRequest(query, callback) {
    console.log('\x1b[35m%s\x1b[0m', "Query : " + query);
    db.query(query, callback);
}
function MySQLModelConstructor(modelClass) {
    modelClass.prototype.query = function (query, callback) {
        dbRequest(query, function (err, result, fields) {
            if (callback) {
                callback(err, result, fields);
            }
        });
    };
    modelClass.prototype.find = function (method, conditions, callback) {
        var query = "";
        if (typeof (method) == "function") {
            callback = method;
            method = 'all';
            conditions = {};
        } else if (typeof (conditions) == "function") {
            callback = conditions;
            conditions = {};
        }
        var tableName = this.tableName;
        
        // building query conditions
        var qcond = '';
        var fields = this.attributes.join(', ');
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
                        callback(err, result[0], fields);
                    }
                });
                break;
            // method returning only value of one field (if specified in 'fields') form first result 
            case 'field':
                query = "SELECT " + fields + " FROM " + tableName + qcond;
                dbRequest(query, function (err, result, fields) {
                    for (var key in result[0]) break;
                    if (callback) {
                        callback(err, result[0][key], fields);
                    }
                });
                break;
        }
    };
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
        var query = "DELETE FROM " + tableName + " WHERE " + primaryKey + "=" + this.data[primaryKey];
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
        //modelsList[modelClass.name] = _mysqlModel.extend(obj);
        modelsList[modelClass.name] = MySQLModelConstructor(modelClass);
        console.log('\x1b[33m%s\x1b[0m: ', "Init model ", modelClass.name);
    }

    initUrlControllers(require(__dirname + '/UserModel'));
};
