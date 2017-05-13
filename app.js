var express = require('express')
var app = express()
app.set('view engine', 'html');
var path = require('path');



app.use('/build', express.static(__dirname + '/build/'));
app.use('/public', express.static(__dirname + '/public/'));
app.get('/', function (req, res) {
    console.log(path.join(__dirname, 'views/index'))
    res.sendFile(path.join(__dirname, 'views/index.html'))
})

var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
//var client = redis.createClient();
var infoSubscribe = redis.createClient();
var errorSubscribe = redis.createClient();
var debugSubscripe = redis.createClient();


io.on('connection', function(socket){

    infoSubscribe.subscribe('infolog');

    infoSubscribe.on("message", function(channel, msg) {
        io.emit("infolog-message",msg);
    });

    errorSubscribe.subscribe('errorlog');
    errorSubscribe.on("message", function(channel, msg) {
        io.emit("errorlog-message",msg);
    });

    debugSubscripe.subscribe('debuglog');
    debugSubscripe.on("message", function(channel, msg) {
        io.emit("debuglog-message",msg);
    });

    socket.on("new-message", function(msg){
        io.emit("receive-message",msg);
    })
    socket.on("test", function(){
        console.log("mounted");
    })
});

http.listen('3000',function(){
    console.log("we are connected");
});
