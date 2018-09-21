'use strict'

var express = require('express')
var request = require('request')
var moment = require('moment')

var employeeRoutes = express.Router()

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCkjnVEj3Gyev_M-HKfjrwXpYcGQjCeiCk'
});

// get all todos in the db

employeeRoutes.route('/employees').get(function (req, res) {
    var options = {
        url: 'https://api.officient.io/1.0/people/list',
        headers: {
            'Authorization': 'Bearer 73f4009cbc5a7828084cfab9ad66e4b9178c18ea',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (err, result, body) {
        if (!err && res.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
            res.jsonp(info);
        } else {
            console.log(err);
            res.status(400).send();
        }
    });
});

employeeRoutes.route('/employee').get(function (req, res) {
    var options = {
        url: 'https://api.officient.io/1.0/people/' + req.query.id + '/detail',
        headers: {
            'Authorization': 'Bearer 73f4009cbc5a7828084cfab9ad66e4b9178c18ea',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (err, result, body) {
        if (!err && res.statusCode == 200) {
            var info = JSON.parse(body);
            if (info.data.address) {
                googleMapsClient.geocode({
                    address: info.data.address.line_1 + info.data.address.line_2 + info.data.address.zipcode + info.data.address.city
                }, function (err, response) {
                    if (err) {
                        return res.status(400).send({
                            message: err
                        });
                    } else {
                        var coordinates = response.json.results[0].geometry.location;
                        console.log(coordinates);
                        info.data.address.coordinates = coordinates.lat + ',' + coordinates.lng;
                        res.jsonp(info);
                    }
                });
            } else {
                res.jsonp(info);
            }
        } else {
            console.log(err);
            res.status(400).send();
        }
    });
});

employeeRoutes.route('/directions').get(function (req, res) {
    var routes = [];
    var promises = [];
    [0, 1, 2, 3, 4].forEach(function (numberDay) {
        /*googleMapsClient.directions({
            origin: req.query.address,
            destination: 'Kortrijksesteenweg 181, 9000 Gent',
            mode: 'transit',
            arrival_time: numberDay === 0 ? moment().startOf('isoWeek').hour(9).minute(0).toDate() : moment().startOf('isoWeek').add(numberDay, 'd').hour(9).minute(0).toDate(),
            language: 'nl'
        }, function (err, response) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                routes.push(response.json.routes[0].legs[0]);
                if (routes.length === 5) {
                    res.jsonp(routes);
                }
            }
        });*/
        console.log(req.query.toWork);
        var googleDirections = callGoogleApi(req.query.toWork ? {
            origin: req.query.address,
            destination: 'Kortrijksesteenweg 181, 9000 Gent',
            mode: 'transit',
            arrival_time: numberDay === 0 ? moment().startOf('isoWeek').hour(9).minute(0).toDate() : moment().startOf('isoWeek').add(numberDay, 'd').hour(9).minute(0).toDate(),
            language: 'nl'
        } : {
            origin: 'Kortrijksesteenweg 181, 9000 Gent',
            destination: req.query.address,
            mode: 'transit',
            arrival_time: numberDay === 0 ? moment().startOf('isoWeek').hour(18).minute(0).toDate() : moment().startOf('isoWeek').add(numberDay, 'd').hour(18).minute(0).toDate(),
            language: 'nl'
        });
        /*if (googleDirections) {
            routes.push(googleDirections);
            if (routes.length === 5) {
                res.jsonp(routes);
            }
        } else {
            console.log('error');
            return res.status(400).send({
                message: 'Route niet gevonden'
            });
        }*/
        promises.push(googleDirections);
        if (promises.length === 5) {
            Promise.all(promises).then(function(result) {
                console.log(result);
                res.jsonp(result);
            }, function(error) {
                console.log(error);
                return res.status(400).send({
                    message: 'Route niet gevonden'
                });
            });
        }
        /*googleDirections.then(function (result) {
            routes.push(googleDirections);
            if (routes.length === 5) {
                res.jsonp(routes);
            }
        }, function (error) {
            return res.status(400).send({
                message: 'Route niet gevonden'
            });
        });*/
    });
});

function callGoogleApi(directionsObj) {
    return new Promise(function (resolve, reject) {
        googleMapsClient.directions(directionsObj, function (err, response) {
            if (err) {
                reject(null);
            } else {
                resolve(response.json.routes[0].legs[0]);
            }
        });
    });
}

module.exports = employeeRoutes;