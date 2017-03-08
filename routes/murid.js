/**
 * Created by ignat on 05-Jan-17.
 */

var express = require('express');
var router = express.Router();
var muridctrl = require('./../controllers/muridctrl');

router.post('/profile', muridctrl.postMuridProfile);
router.post('/update', muridctrl.postMuridRecord);
router.post('/list', muridctrl.postListDataMurid);

/* API untuk view photo murid baru - Input data user berupa nomor handphone dan device id */
router.get('/PhotoSiswaBaru/:Handphone/:Photo', muridctrl.getPhotoSiswaBaru);

module.exports = router;
