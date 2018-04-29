// 'use strict'
const axios = require('axios'),
  Fs = require('fs'),
  Path = require('path'),
  async = require('async');
var url = "http://localhost:3000/api/hosts/192.168.1.1"
var command = "omxplayer /home/pi/"
var file = "sound.mp3"
var toWrite = ""

// Make a request
axios.get(url)
  .then(function(response) {
    response.data.forEach(function(alarm) {
      newAlarm = alarm.minute + " " + alarm.hour + " * * " + alarm.dow + " " + command + file
      toWrite += newAlarm + " \n"
    })
    console.log(toWrite);
    // write to a new file named 2pac.txt
    Fs.writeFile('new.txt', toWrite, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('Lyric saved!');
    });
  })
  .catch(function(error) {
    throw (err)
  });