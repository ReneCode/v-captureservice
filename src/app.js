const WebServer = require('./web-server');
const dataStorage = require('./datastorage/datastorage');


const OPTIONS = {
  port: process.env.PORT || 3003,
  authorize: false
};

const webServer = new WebServer(OPTIONS);
webServer.createServer();

const storageConnectionString = process.env.AZURE_DATA_STORAGE_CONNECTION_STRING;
if (!storageConnectionString) {
  throw Error("connection string for data storage missing.");
}

dataStorage.connect(storageConnectionString)
  .then(() => {
    return webServer.listen()
  })
  .then(() => {
    console.log("server listen on port:", OPTIONS.port);
  })
  .catch((err) => {
    console.log("can not start to datastorage:", err);
  });
