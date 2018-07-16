const axios = require('axios')

// Helper functions
const helpers = require("./helpers"),
  {
    makeCron,
    saveCron,
    getFiles,
    checkDir
  } = helpers;

// Make sure sounds dir exists
// If not create it
checkDir("./sounds")

// Config
const options = require("./options"),
  {
    hostname,
    uri,
    username
  } = options

// Debug stuff
console.log('USERNAME: ' + username);
console.log("HOSTNAME: " + hostname);
console.log("URI: " + uri);

//  GET to api
axios.get(uri).
then(async response => {
  if (response.data.error) {
    console.log("EXPRESS ERROR: " + JSON.stringify(response.data));

    return response.data.error;
  }
    // Download sound files
    getFiles(response.data.result)
  // Generate cron
  var cron = await makeCron(response.data.result);
  console.log('CRON: ' + cron);
  // Save cron to a file
  saveCron(cron);
}).
catch((error) => {
  console.log("AXIOS ERROR: " + error);
  throw error
})
