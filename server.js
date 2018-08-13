var express = require('express');
var mongoClient = require('mongodb').MongoClient;

var apiRoutes = require('./apiRoutes');
var config = require('./config.json');

var app = express();
var url = config.cosmosDBUrl;

app.set('view engine', 'pug');
app.use('/api', apiRoutes);

app.route('/').get(function (req, res) {
    res.send("Tutorial on root");
});

app.route('/Node1').get(function (req, res) {
    res.send("Tutorial on Node1");
});

app.route('/Node2').get(function (req, res) {
    res.send("Tutorial on Node2");
});

app.get('/welcome', function (req, res) {
    res.render('index', {
        title: 'welcome page',
        message: 'Welcome page'
    });
});

app.get('/error', function (req, res) {
    res.render('index', {
        title: 'handling',
        message: 'Error Handling Page'
    });
});

app.get('/Employee', function (req, res) {
    var str = [];
    mongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) {
            console.log(err.message);
        } else {
            var dbo = db.db("MasterDB");
            var cursor = dbo.collection('Employee').find();
            
            cursor.forEach(function(item) {
                if (item != null) {
                        str.push(item.name);
                }
            }, function(err) {
                console.log('err: ' + err);
                res.render('index', {
                    title: 'handling',
                    message: 'Hai ' + str.join(', ')
                });
                db.close();
               }
            );
            db.close();
        }
    })
});

app.get('/Employee/:id', function (req, res) {
    var str = [];
    mongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) {
            console.log(err.message);
        } else {
            var dbo = db.db("MasterDB");
            var query = { employeeId : req.query.id };
            var cursor = dbo.collection('Employee').findOne(query, function (err, result) {
                res.render('index', {
                    title: 'handling',
                    message: 'Hola ' + result.name
                });
                db.close();
            });
            
            
            db.close();
        }
    })
});

app.listen(7000, function () {
    console.log('listening on port 7000');
});