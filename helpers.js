const Fs = require('fs'),
Axios = require('axios'),
Path = require("path")

// Config
const options = require("./options"),
    {
        soundDirectory,
        url,
        command,
        username
    } = options

downloadFile = async (soundURL, filename) => {
    const path = Path.resolve(soundDirectory, filename)
    const fileURL = url + soundURL

    // axios image download with response type "stream"
    const response = await Axios({
        method: 'GET',
        url: fileURL,
        responseType: 'stream'
    })

    // pipe the result stream into a file on disc
    response.data.pipe(Fs.createWriteStream(path))

    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve()
        })

        response.data.on('error', (error) => {
            reject(error)
        })
    })

}

exports = {}

exports.checkDir = (directory) => {
    try {
      Fs.statSync(directory);
    } catch (e) {
      Fs.mkdirSync(directory);
    }
  }

exports.makeCron = result => {
    let toWrite = ""
    result.forEach((alarm) => {
        var newAlarm = `${alarm.minute} ${alarm.hour} * * ${alarm.dow} ${username} ${command} ${Path.resolve(__dirname, '/tmp/tbapi/', alarm.filename)} # ${alarm.name}`
        toWrite += newAlarm + " \n"
    })

    return toWrite;
}

exports.saveCron = cron => {
    Fs.writeFile('cron.txt', cron, (err) => {
        // throws an error, you could also catch it here
        if (err) {
            return console.log("SAVE ERROR: " + err);
        }
        // success case, the file was saved
        console.log('SAVE: success!');
    });
}

exports.getFiles = result => {
    result.forEach(alarm => {
        try {
        downloadFile(alarm.url, alarm.filename).
        then(() => {
            console.log("SOUND DOWNLOADED: " + alarm.name);
        }).
        catch(err => {
            console.log('SOUND DOWNLOAD ERROR: ' + err);
            throw err
        })
    } catch (err) {
        console.log("GETFILES ERR: " + err)
    }
    })

}

module.exports = exports;
