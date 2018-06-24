const axios = require('axios'),
  Fs = require('fs'),
  Path = require('path'),
  async = require('async'),
  ip = require("ip");
//Vars
var url = "", //Fill me in with hostname
  command = "omxplayer ",
  toWrite = "",
  hostname = ip.address(),
  uri = url + "/api/hosts/" + hostname,
  username = "" // Fill me in with hostname

console.log("hostname detected is: " + hostname)

// Make a request
axios.get(uri)
  .then(function(response) {
    if (response.data.error) {
      console.log(response.data.error);
    }
    response.data.result.forEach((alarm) => {
      var newAlarm = alarm.minute + " " + alarm.hour + " * * " + alarm.dow + " " + "robinson_cal" + " " + command + url + alarm.url + " # " + alarm.name
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
    return console.log(error);
  });