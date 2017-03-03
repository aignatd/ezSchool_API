/**
 * Created by ignat on 05-Jan-17.
 */

var express = require('express');
var router = express.Router();
var guructrl = require('./../controllers/guructrl');

router.post('/profile', guructrl.postGuruProfile);
router.post('/update', guructrl.postGuruRecord);

module.exports = router;
