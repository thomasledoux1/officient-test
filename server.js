'use strict'

var cors = require('cors')

var express = require('express')

var morgan = require('morgan')

var path = require('path')

var app = express()

app.use(cors())

var bodyParser = require('body-parser')

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '/public')))

// Use morgan to log request in dev mode
app.use(morgan('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

var port = process.env.PORT || 5000

app.listen(port) // Listen on port defined in config file

var employeeRoutes = require('./app/routes')

//  Use routes defined in Route.js and prefix it with api
app.use('/api', employeeRoutes)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'https://officient-test.herokuapp.com/')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
    next()
})
// Server index.html page when request to the root is made
app.get('/', function (req, res) {
    res.sendfile('./dist/index.html')
})