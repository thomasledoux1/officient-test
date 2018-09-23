'use strict'

var express = require('express')
var request = require('request')
var moment = require('moment')

var employeeRoutes = express.Router()

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCkjnVEj3Gyev_M-HKfjrwXpYcGQjCeiCk'
});

var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// get all employees from API

employeeRoutes.route('/employees').get(function (req, res) {
    var options = {
        url: 'https://api.officient.io/1.0/people/list',
        headers: {
            'Authorization': 'Bearer cd2ec3ef454f9a22b314a516dbcc7159e732bcd8',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (err, result, body) {
        if (!err && res.statusCode == 200) {
            var info = JSON.parse(body);
            if (info.error) {
                res.status(400).send();
            } else {
                res.jsonp(info);
            }
        } else {
            res.status(400).send();
        }
    });
});

//get specific employee
employeeRoutes.route('/employee').get(function (req, res) {
    var options = {
        url: 'https://api.officient.io/1.0/people/' + req.query.id + '/detail',
        headers: {
            'Authorization': 'Bearer 2c6399a5976393a5c268efd42b8cb87f94787f25',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (err, result, body) {
        if (!err && res.statusCode == 200) {
            var info = JSON.parse(body);
            if (info.error) {
                res.status(400).send();
            } else {
                if (info.data.address) {
                    //get latlng from address of employee
                    googleMapsClient.geocode({
                        address: info.data.address.line_1 + info.data.address.line_2 + info.data.address.zipcode + info.data.address.city
                    }, function (err, response) {
                        if (err) {
                            return res.status(400).send({
                                message: err
                            });
                        } else {
                            var coordinates = response.json.results[0].geometry.location;
                            info.data.address.coordinates = coordinates.lat + ',' + coordinates.lng;
                            res.jsonp(info);
                        }
                    });
                } else {
                    res.jsonp(info);
                }
            }
        } else {
            res.status(400).send();
        }
    });
});

employeeRoutes.route('/directions').get(function (req, res) {
    //get wages from specific employee
    var options = {
        url: 'https://api.officient.io/1.0/wages/' + req.query.id + '/current',
        headers: {
            'Authorization': 'Bearer 2c6399a5976393a5c268efd42b8cb87f94787f25',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (err, result, body) {
        if (!err && result.statusCode == 200 || (result.statusCode === 400 && JSON.parse(body).reason_phrase === ('No wage was found for this person.'))) {
            var info = JSON.parse(body);
            //check if the employee has specific wage/time_engagement entered
            var weeklyTimeEngagement = info.data ? info.data.weekly_time_engagement_minutes : null;
            //map every weekday to promise
            var promises = [0, 1, 2, 3, 4].map(function (numberDay) {
                //get hours and minutes employee will work for this day
                var hoursWorkToday = weeklyTimeEngagement ? Math.floor(weeklyTimeEngagement[days[numberDay]] / 60) : 7;
                var minutesWorkToday = weeklyTimeEngagement ? weeklyTimeEngagement[days[numberDay]] % 60 : 36;
                return new Promise(function (resolve, reject) {
                    //datetime start navigation to work based on time_engagement
                    var dateGoToWork = numberDay === 0 ? moment().startOf('isoWeek').add(1, 'week').hour(9).minute(0).toDate() : moment().startOf('isoWeek').add(numberDay + 7, 'd').hour(9).minute(0).toDate();
                    //datetime start navigation from work based on time_engagement
                    var dateGoHome = numberDay === 0 ? moment().startOf('isoWeek').add(1, 'week').hour(hoursWorkToday + 9).minute(minutesWorkToday).toDate() : moment().startOf('isoWeek').add(numberDay + 7, 'd').hour(hoursWorkToday + 9).minute(minutesWorkToday).toDate();
                    var googleDirections = callGoogleApi(req.query.toWork ? {
                        origin: req.query.address,
                        destination: 'Kortrijksesteenweg 181, 9000 Gent',
                        mode: 'transit',
                        arrival_time: dateGoToWork,
                        language: 'nl'
                    } : {
                        origin: 'Kortrijksesteenweg 181, 9000 Gent',
                        destination: req.query.address,
                        mode: 'transit',
                        arrival_time: dateGoHome,
                        language: 'nl'
                    });
                    googleDirections.then(function (result) {
                        resolve(result);
                    }, function (error) {
                        reject(error);
                    });
                });
            });
            //execute all promises for weekdays
            Promise.all(promises).then(function (resultPromise) {
                res.jsonp(resultPromise);
            }, function (errorPromise) {
                return res.status(400).send({
                    message: 'Route niet gevonden'
                });
            });
        } else {
            res.status(400).send();
        }
    });
});

function callGoogleApi(directionsObj) {
    return new Promise(function (resolve, reject) {
        //get directions with public transport from google maps api
        googleMapsClient.directions(directionsObj, function (err, response) {
            if (err) {
                console.log(err);
                reject(null);
            } else {
                resolve(response.json.routes[0].legs[0]);
            }
        });
    });
}

module.exports = employeeRoutes;