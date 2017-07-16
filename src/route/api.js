var express = require('express');
var router = express.Router();

let Capture = require('./capture')


function getCapture(res, res) {
  res.sendStatus(200);
}

function takeCapture(req, res) {

  
  const projectId = req.body.projectId;
  const pageId = req.body.pageId;
  const url = req.body.url;

  const viewportSize = req.body.viewportSize || { width: 300, height: 200 };
  const filename = `capture_${projectId}_${pageId}.png`;

  const options = {
    url: req.body.url,
    accessToken: req.headers.authorization,
    viewportSize: viewportSize,
    fileName: filename
  }
  
  let capture = new Capture();
  capture.take(options, (err) => {
    if (err) {
      res.sendStatus(409);
    } else {
      res.sendStatus(200);
    }
  });

  // console.log(url);

  const opt = {
    renderDelay: 1000
  };

}

router.get("/captures/:projectId/:pageId", getCapture);
router.post("/captures", takeCapture);


module.exports = router;
