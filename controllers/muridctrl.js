/**
 * Created by ignat on 03-Jan-17.
 */

var MuridModel = require('./../models/muridmodel');
var Fungsi = require('./../utils/fungsi');
var fixvalue = require('./../utils/fixvalue.json');

var MuridProfile =
  function(req, res)
  {
    var NoHP = {"NOTELP" : req.body["DataUser"]["Handphone"]};

    MuridModel.AllMuridRecord(NoHP, function (err, datamurid)
    {
      if ((err) || (datamurid === null))
      {
        res.status(202);
        res.json(Fungsi.ProfileKosong());
      }
      else
      if (datamurid.length === 0)
      {
        res.status(202);
        res.json(Fungsi.ProfileKosong());
      }
      else
      {
        res.status(200);
        res.json(Fungsi.ProfileData(datamurid, 3));
      }
    });
  };

var MuridRecord =
	function(req, res)
	{
		var email = req.body["DataUser"]["Email"];
		var hp = req.body["DataUser"]["Handphone"];
		var LoginID = req.body["DataUser"]["LoginID"];

		var datamurid = req.body["DataProfile"];
    var cekNIS = {"NIS" : req.body["DataProfile"]["NIS"]};

		datamurid["EMAIL"] = email;
		datamurid["NOTELP"] = hp;

    MuridModel.AllMuridRecord(cekNIS, function (err, user)
    {
      if(err || (datamurid.length === 0) || (user === null))
      {
        res.status(200);
        res.json(Fungsi.ProfileSukses());
      }
      else
      {
        MuridModel.UpdateMuridRecord({"_id" : user["_id"]}, datamurid, function(err, murid)
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

var DataFileMurid =
  function(req, res, namafile)
  {
    var NoHP = {"NOTELP" : req.body["Handphone"]};

    MuridModel.AllMuridRecord(NoHP, function (err, datamurid)
    {
      if ((err) || (datamurid === null))
      {
        res.status(202);
        res.json(Fungsi.UploadGagal());
      }
      else
      if (datamurid.length === 0)
      {
        res.status(201);
        res.json(Fungsi.UploadGagal());
      }
      else
      {
        var datafile = {"Photo" : namafile};

        MuridModel.UpdateMuridRecord({"_id" : datamurid["_id"]}, datafile, function(err, murid)
        {
          if(err)
          {
            res.status(202);
            res.json(Fungsi.UploadGagal());
          }
          else
          {
            res.status(200);
            res.json(Fungsi.UploadSukses());
          }
        });
      }
    });
  };

var ListDataMurid =
  function(req, res)
  {
    console.log(req);
    var DataReq = {"UserID" : req["DataCari"]};
    var DataProfile = req["CariProfile"];

    MuridModel.MuridBaruRecord(DataReq, function (err, datamurid)
    {
      if ((err) || (datamurid === null))
      {
        res.status(202);
        res.json(Fungsi.PSBGagal());
      }
      else
      if (datamurid.length === 0)
      {
        res.status(201);
        res.json(Fungsi.PSBKosong());
      }
      else
      {
        datamurid.forEach(function(ListMurid)
        {
          ListMurid["PhotoURL"] = fixvalue.Server.Koneksi + fixvalue.Server.IPAddr + ":" + fixvalue.Server.Port +
            fixvalue.RouterAPIV1.murid + fixvalue.PhotoLink.SiswaBaru + DataProfile + "/" + ListMurid["Photo"];
        });

        res.status(200);
        res.json(Fungsi.PSBSukses(datamurid));
      }
    });
  };

var AmbilPhotoSiswaBaru = function(req, res)
{
  var filesource = fixvalue.PhotoDir.SiswaBaru + req.params.Handphone + "/" + req.params.Photo;

  res.download(filesource, req.params.Handphone, function (err)
  {
    if(err)
    {
      res.status(202);
      res.json(Fungsi.PhotoGagal());
    }
  });
}

module.exports = {postMuridProfile : MuridProfile, postMuridRecord : MuridRecord, postListDataMurid : ListDataMurid,
                  getPhotoSiswaBaru : AmbilPhotoSiswaBaru};
