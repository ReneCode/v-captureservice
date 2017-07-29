var WebServer = require('../src/web-server');
let dataStorage = require('../src/datastorage/datastorage');

const OPTIONS = {
  port: 3103,
  authorize: false,
  logging: false
};

let API = undefined;

/*
  start & stop the backend server for the mocha tests

  before() and after() are used before and after *ALL* test.spec.files
*/

before('start server', () => {
  const storageConnectionString = process.env.AZURE_DATA_STORAGE_CONNECTION_STRING;
  return dataStorage.connect(storageConnectionString)
    .then(() => {
      // create Server
      let webServer = new WebServer(OPTIONS);
      webServer.createServer();
      return webServer.listen()
    })
    .then((api) => {
      API = api;
      // console.log("TESTING start server v-capture-service on port:", OPTIONS.port)
    })
});

after('close server', (done) => {
  // console.log("stop testing backend server")
  API.close(() => {
    done();
  });
});
