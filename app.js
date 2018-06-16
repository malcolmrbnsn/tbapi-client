'use strict'
const axios = require('axios'),
  Fs = require('fs'),
  Path = require('path'),
  async = require('async'),
  ip = require("ip");
require("dotenv").config();
//Vars
var url = process.env.URL,
  command = "omxplayer ",
  toWrite = "",
  hostname = ip.address(),
  uri = url + "/api/hosts/" + hostname

console.log("hostname detected is: " + hostname)

// Make a request
axios.get(uri)
  .then(function(response) {
    if (response.data.error) {
      console.log(response.data.error);
    }
    response.data.result.forEach((alarm) => {
      var newAlarm = alarm.minute + " " + alarm.hour + " * * " + alarm.dow + " " + process.env.USERNAME + " " + command + url + alarm.url + " # " + alarm.name
      toWrite += newAlarm + " \n"
    })
    console.log(toWrite);
    // write to a new file
    Fs.writeFile('new.txt', toWrite, (err) => {
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