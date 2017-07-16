
var system = require('system');
var page = require('webpage').create();

// !! do not use ES6   -   that is phantom.js  code !!

var args = system.args[1];
var options = JSON.parse( system.args[1] );

if (options.viewportSize) {
  page.viewportSize = options.viewportSize;
}

if (!options.url) {
  console.log("url missing");
  phantom.exit(1);
}
if (!options.fileName) {
  console.log("fileName missing");
  phantom.exit(1);
}


page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};

page.onLoadFinished = function (status) {
  console.log("finished");
}

function onPageReady() {
  console.log("start render");
  page.render(options.fileName);
  phantom.exit();
}


page.open(options.url, function () {
  function checkReadyState() {
    setTimeout(function () {
      var readyState = page.evaluate(function () {
        return document.readyState;
      });

      if ("complete" === readyState) {
        onPageReady();
      } else {
        checkReadyState();
      }
    }, 1000);
  }

  checkReadyState();
});
