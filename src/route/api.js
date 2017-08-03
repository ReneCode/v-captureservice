var express = require('express');
var router = express.Router();

const os = require('os');
const path = require('path');

let Capture = require('./capture')
let dataStorage = require('../datastorage/datastorage');


function getFileName(pageId) {
  const fileName = `capture/${pageId}.png`;
  return fileName.toLowerCase();
}

function getContainerName(projectId) {
  return "prj-" + projectId;
}

function getCapture(req, res) {
  const projectId = req.params.projectId;
  const pageId = req.params.pageId;

  const containerName = getContainerName(projectId);
  const fileName = getFileName(pageId);
  dataStorage.loadCapture(containerName, fileName, res)
  .then( () => {
    res.end();
  })
  .catch( (err) => {
    // console.error(err);
    res.sendStatus(500);
  })
}

function takeCapture(req, res) {
  // inspired by:
  // https://github.com/brenden/node-webshot
  //

  const projectId = req.body.projectId;
  const pageId = req.body.pageId;
  const url = req.body.url;

  const viewportSize = req.body.viewportSize || { width: 300, height: 200 };

  const containerName = getContainerName(projectId);
  const fileName = getFileName(pageId);
  const filePath = path.join(os.tmpdir(), fileName);

  const options = {
    url: req.body.url,
    accessToken: req.headers.authorization,
    viewportSize: viewportSize,
    filePath: filePath
  }

  let capture = new Capture();
  capture.take(options, (err) => {
    if (err) {
      res.sendStatus(409);
    } else {
      dataStorage.saveCapture(containerName, fileName, filePath)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(() => {
          res.sendStatus(409);
        });
    }
  });

  const opt = {
    renderDelay: 1000
  };

}

router.get("/captures/:projectId/:pageId", getCapture);
router.post("/captures", takeCapture);


module.exports = router;
