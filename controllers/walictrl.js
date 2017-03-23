/**
 * Created by ignat on 03-Jan-17.
 */

var WaliModel = require('./../models/walimodel');
var Fungsi = require('./../utils/fungsi');
var fixvalue = require('./../utils/fixvalue.json');

var WaliProfile =
  function(req, res)
  {
    var NoHP = {"NOTELP" : req.body["DataUser"]["Handphone"]};

    WaliModel.AllWaliRecord(NoHP, function (err, datawali)
    {
      if((err) || (datawali === null))
      {
        res.status(202);
        res.json(Fungsi.ProfileKosong());
      }
      else
      if (datawali.length === 0)
      {
        res.status(202);
        res.json(Fungsi.ProfileKosong());
      }
      else
      {
        res.status(200);
        res.json(Fungsi.ProfileData(datawali, 1));
      }
    });
  };

var WaliRecord =
	function(req, res)
	{
		var email = req.body["DataUser"]["Email"];
		var hp = req.body["DataUser"]["Handphone"];
		var UserID = req.body["DataUser"]["UserID"];
		var cekwali = {"UserID" : UserID};

		var datawali = req.body["DataProfile"];
		datawali["EMAIL"] = email;
		datawali["NOTELP"] = hp;
    datawali["UserID"] = UserID;

		WaliModel.UpdateWaliRecord(cekwali, datawali, function(err, walidata)
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
	};


var PhotoWali = function(req, res)
{
  var filesource = fixvalue.PhotoDir.PhotoWali + req.params.Handphone + "/" + req.params.Photo;

  res.download(filesource, req.params.Handphone, function (err)
  {
    if(err)
    {
      res.status(202);
      res.json(Fungsi.PhotoGagal());
    }
  });
}

module.exports = {postWaliProfile : WaliProfile, postWaliRecord : WaliRecord, getPhotoWali : PhotoWali};
