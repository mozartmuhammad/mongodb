const division = require('express').Router();
var mongoClient = require('mongodb').MongoClient;

var url = require('../../config.json').cosmosDBUrl;

division.get('/', function (req, res) {
    res.status(200).json({
        message: 'Connected! Get'
    });
});

division.get('/:id', function (req, res) {
    res.status(200).json({
        message: 'Connected! Get with id'
    });
});

division.post('/', function (req, res) {


    mongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("MasterDB");
        var myobj = {
            name: req.query.name
        };
        dbo.collection("Division").insertOne(myobj, function (err, resDb) {
            if (err) throw err;
            console.log("1 document inserted");
            res.status(200).json({
                message: 'Successfully added!'
            });
            db.close();
        });
    })




});

division.put('/', function (req, res) {
    res.status(200).json({
        message: 'Connected! put'
    });
});

division.delete('/', function (req, res) {
    res.status(200).json({
        message: 'Connected! delete'
    });
});

module.exports = division;