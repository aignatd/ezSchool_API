/**
 * Created by ignat on 05-Jan-17.
 */

var express = require('express');
var router = express.Router();
var devicectrl = require('./../controllers/devicectrl');
var userctrl = require('./../controllers/userctrl');

/* API untuk cari data device */
router.post('/search', devicectrl.getAllDevice, userctrl.getAllUser);

/* API untuk tambah data device */
router.post('/add', devicectrl.postDeviceRecord, userctrl.postUserRecord);

module.exports = router;
