var http = require('http');
var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var fs = require('fs');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var connection = mysql.createConnection({
    host: 'bgabgb3vi-mysql.services.clever-cloud.com',
    user: 'uawpqbdrl3llqjpt',
    password: 'Dlff4WOTqvDqpTfu3a5',
	database: "bgabgb3vi"
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req,res,next) {

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers","X-Requested-With,X-HTTP-Methods-Override,Content-Type,Accept,Cache-Control, Pragma, Origin,Authorization, Content-Type");
    res.header("Access-Control-Allow-Credentials","true");
    if ('OPTIONS' == req.method){
        return res.sendStatus(200);
    }
    next();
});

require("./routes/tblUser")(app);
require("./routes/tblAkun")(app);
require("./routes/tblJurnal")(app);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3100;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

//app.listen(3100);
//console.log("port web service : 3100");

/*server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});*/
app.listen(server_port);


app.use(express.static(path.join(__dirname, 'public')));

process.on('uncaughtException', (err) => {
  fs.writeSync(1, 'Caught exception: '+err+'\n');
});


setTimeout(() => {
  console.log('This will still run.');
}, 500);

//nonexistentFunc();


module.exports = app;