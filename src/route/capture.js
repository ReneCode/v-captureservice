
let crossSpawn = require('cross-spawn');
let fs = require('fs');

class Capture {

  take(options, callback) {
    this.removeFile(options.filePath, () => {
      this.spanPhantom(options, callback);
    })
  }

  // --------------

  removeFile(filePath, callback) {
    if (!filePath) {
      callback();
    }
    fs.unlink(filePath, (err) => {
      return callback();
    });
  }

  spanPhantom(options, callback) {
    const phantomPath = require('phantomjs-prebuilt').path;
    const phantomScript = __dirname + "/phantom.script.js"

    let phantomArgs = [phantomScript, JSON.stringify(options)];

    let phantomProc = crossSpawn.spawn(phantomPath, phantomArgs);
    phantomProc.on('exit', (code) => {
      callback(code);
    })
  }
}

module.exports = Capture;

