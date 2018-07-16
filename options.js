const ip = require("ip");

var url = "http://localhost",
  hostname = ip.address(),
  uri = url + "/api/hosts/" + hostname

var optionsObj = {
  url,
  hostname,
  uri,
  command: "omxplayer",
  username: process.env.USER
}
module.exports = optionsObj;
