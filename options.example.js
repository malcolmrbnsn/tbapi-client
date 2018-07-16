const ip = require("ip");

var url = "", //Fill me in with url
  hostname = ip.address(),
  uri = url + "/api/hosts/" + hostname

var optionsObj = {
  url,
  hostname,
  uri,
  command: "", //Command to run when cron is hit
  username: process.env.USER
}
module.exports = optionsObj;
