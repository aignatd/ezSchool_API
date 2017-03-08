var express = require('express');
var router = express.Router();
var devicectrl = require('./../controllers/devicectrl');
var userctrl = require('./../controllers/userctrl');
var fixvalue = require('./../utils/fixvalue.json')

router.get('', function(req, res)
{
  res.render('pages/index', { title: 'Upload File' });
});

/* API untuk login user - Cek Info Device dan Nama User */
router.post('/login', userctrl.getAllUser, devicectrl.getAllDevice);

/* API untuk registrasi user - Simpan Info Device dan Nama User */
router.post('/registrasi', userctrl.postUserRecord, devicectrl.postDeviceRecord);

/* API untuk logout user - Cek Info Device dan Nama User */
//router.post('/logout', devicectrl.getAllDevice, userctrl.getLogoutUser);
router.post('/logout', userctrl.getLogoutUser);

/* API untuk ambil data profile - Cek Info Device dan Nama User */
router.post('/profile', userctrl.getProfileUser);

/* API untuk update data murid, guru, wali dan user - Input data murid, guru, wali dan user */
router.post('/rubah', userctrl.postRubahProfile);

/* API untuk merubah password user - Input data user berupa nomor handphone dan device id */
router.post('/password', userctrl.postRubahPassword);

/* API untuk upload photo user di profile - Input data user berupa nomor handphone dan device id */
router.post('/upload', userctrl.postPhotoProfile);

/* API untuk download photo user di profile - Input data user berupa nomor handphone dan device id */
//router.post('/download', userctrl.getProfileUser);

/* API untuk view photo user di profile - Input data user berupa nomor handphone dan device id */
router.get('/PhotoProfile/:Komponen/:Photo', userctrl.getPhotoProfile);

module.exports = router;
