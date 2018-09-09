const axios = require("axios");

// Helper functions
const helpers = require("./helpers"),
  {makeCron, saveCron, getFiles, checkDir} = helpers;

// Make sure sounds dir exists
// If not create it
checkDir("/tmp/tbapi");

// Config
const options = require("./options"),
  {apiToken, hostname, uri, username} = options;

// Debug stuff
console.log("USERNAME: " + username);
console.log("HOSTNAME: " + hostname);
console.log("URI: " + uri);
console.log('API: ' + apiToken);


//  GET to api
axios.
  get(uri, {
    headers: {
      'Authorization': apiToken
    }
  }).
  then(async response => {
    try {
      if (response.data.error) {
      console.log("SERVER ERROR: " + JSON.stringify(response.data));

      return response.data.error;
    }
    // Download sound files
    getFiles(response.data.result);
    // Generate cron
    var cron = await makeCron(response.data.result);
    console.log("CRON: " + cron);
    // Save cron to a file
    saveCron(cron);
  } catch (err) {
    console.log("CLIENT ERROR: " + error);
    throw err
  }
  }).
  catch(error => {
    console.log("CLIENT ERROR: " + error);
    throw error;
  });
