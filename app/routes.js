'use strict'

var express = require('express')
var request = require('request')

var employeeRoutes = express.Router()

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCkjnVEj3Gyev_M-HKfjrwXpYcGQjCeiCk'
});

// get all todos in the db

employeeRoutes.route('/employees').get(function (req, res, next) {
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

employeeRoutes.route('/employee').get(function (req, res, next) {
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


module.exports = employeeRoutes;