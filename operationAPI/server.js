
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
const cors = require('cors');

var port = process.env.PORT || 3200;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoute'); //importing route
routes(app);



process.on('uncaughtException', function(err) {
   
    console.log("Node NOT Exiting...",err.message);
});
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port)
});