
var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
	res.send("v capture service");
})

module.exports = router;

