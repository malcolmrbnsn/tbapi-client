'use strict'
const axios = require('axios'),
  Fs = require('fs'),
  Path = require('path'),
  async = require('async'),
  ip = require("ip");
//Vars
var url = "http://localhost:3000/api/hosts/",
  command = "omxplayer " + Path.resolve(__dirname) + "/",
  toWrite = "",
  hostname = ip.address(),
  uri = url + hostname

console.log("hostname detected is: " + hostname)

// Make a request
axios.get(uri)
  .then(function(response) {
    console.log(response.data);
    response.data.forEach(function(alarm) {
      var newAlarm = alarm.minute + " " + alarm.hour + " * * " + alarm.dow + " " + command + alarm.file.name
      toWrite += newAlarm + " \n"
    })
    console.log(toWrite);
    // write to a new file
    Fs.writeFile('new' + Date.now() + '.txt', toWrite, (err) => {
      // throws an error, you could also catch it here
      if (err) {
        console.log(err);
      }
      // success case, the file was saved
      console.log('saved!');
    });
  })
  .catch(function(error) {
    console.log(error);
  });