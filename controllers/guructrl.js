/**
 * Created by ignat on 03-Jan-17.
 */

var GuruModel = require('./../models/gurumodel');
var Fungsi = require('./../utils/fungsi');

var GuruProfile =
  function(req, res)
  {
    var NoHP = {"NOTELP" : req.body["DataUser"]["Handphone"]};

    GuruModel.AllGuruRecord(NoHP, function (err, dataguru)
    {
      if ((err) || (dataguru === null))
      {
        res.status(202);
        res.json(Fungsi.ProfileKosong());
      }
      else
      if (dataguru.length === 0)
      {
        res.status(202);
        res.json(Fungsi.ProfileKosong());
      }
      else
      {
        res.status(200);
        res.json(Fungsi.ProfileData(dataguru, 2));
      }
    });
  };

var GuruRecord =
	function(req, res)
	{
		var email = req.body["DataUser"]["Email"];
		var hp = req.body["DataUser"]["Handphone"];
    var UserID = req.body["DataUser"]["UserID"];
    var cekNIG = {"NIG" : req.body["DataProfile"]["NIG"]};

		var dataguru = req.body["DataProfile"];
		dataguru["EMAIL"] = email;
		dataguru["NOTELP"] = hp;
    dataguru["UserID"] = UserID;

    GuruModel.AllGuruRecord(cekNIG, function (err, user)
    {
      if (err || (user.length === 0) || (user === null))
      {
        res.status(200);
        res.json(Fungsi.ProfileSukses());
      }
      else
      {
        GuruModel.UpdateGuruRecord({"_id" : user["_id"]}, dataguru, function(err, guru)
        {
          if(err)
          {
            res.status(202);
            res.json(Fungsi.ProfileGagal());
          }
          else
          {
            res.status(200);
            res.json(Fungsi.ProfileSukses());
          }
        });
      }
    });
	};

module.exports = {postGuruProfile : GuruProfile, postGuruRecord : GuruRecord};
