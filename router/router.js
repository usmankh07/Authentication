const express = require("express");
const router = express.Router();
const postRequest = require("../controller/controller");

router.post("/" , postRequest);

module.exports = router;