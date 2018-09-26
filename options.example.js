const ip = require("ip");

var url = "", // Fill me in with url
  hostname = ip.address(),
  uri = url + "/api/hosts/" + hostname

var optionsObj = {
  url,
  hostname,
  uri,
  downloadDir: "/tmp/tbapi/", // Where to save the files
  apiToken: "", // API Token
  command: "", // Command to run when cron is hit
  username: "" // User
}
module.exports = optionsObj;
