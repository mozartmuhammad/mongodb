const employee = require('express').Router();
var mongoClient = require('mongodb').MongoClient;

var url = require('../../config.json').cosmosDBUrl;

employee.get('/', function (req, res) {
    var array = [];
    mongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) {
            console.log(err.message);
        } else {
            var dbo = db.db("MasterDB");
            var cursor = dbo.collection('Employee').find();

            cursor.forEach(function (item) {
                if (item != null) {
                    array.push(item);
                }
            }, function (err) {
                if (err) {
                    res.status(200).json({
                        message: err.message
                    });
                }
                res.status(200).json(array);
                db.close();
            });
            db.close();
        }
    })
});

employee.get('/:id', function (req, res) {
    mongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) {
            console.log(err.message);
        } else {
            var dbo = db.db("MasterDB");
            var query = {
                employeeId: req.query.id
            };
            var cursor = dbo.collection('Employee').findOne(query, function (err, result) {
                res.status(200).json(result);
                db.close();
            });


            db.close();
        }
    })
});

employee.post('/', function (req, res) {
    if (err) throw err;
    var dbo = db.db("MasterDB");
    var myobj = {
        name: req.query.name
    };
    dbo.collection("Division").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

employee.put('/', function (req, res) {
    res.status(200).json({
        message: 'Connected! put'
    });
});

employee.delete('/', function (req, res) {
    res.status(200).json({
        message: 'Connected! delete'
    });
});

module.exports = employee;