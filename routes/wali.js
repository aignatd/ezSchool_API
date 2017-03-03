/**
 * Created by ignat on 05-Jan-17.
 */

var express = require('express');
var router = express.Router();
var walictrl = require('./../controllers/walictrl');

router.post('/profile', walictrl.postWaliProfile);
router.post('/update', walictrl.postWaliRecord);

module.exports = router;
