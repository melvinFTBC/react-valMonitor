var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
//var client = redis.createClient();
var infoSubscribe = redis.createClient();


io.on('connection', function(socket){
  console.log("we have a connection");

    infoSubscribe.subscribe('infolog');
    infoSubscribe.on("message", function(channel, msg) {
        io.emit("infolog-message",msg);
    });

    infoSubscribe.subscribe('errorlog');
    infoSubscribe.on("message", function(channel, msg) {
        io.emit("erorlog-message",msg);
    });

    infoSubscribe.subscribe('debuglog');
    infoSubscribe.on("message", function(channel, msg) {
        io.emit("debuglog-message",msg);
    });

  socket.on("new-message", function(msg){
      console.log(msg);
      io.emit("receive-message",msg);
  })
  socket.on("test", function(){
        console.log("mounted");
  })
});

http.listen('3000',function(){
    console.log("we are connected");
});