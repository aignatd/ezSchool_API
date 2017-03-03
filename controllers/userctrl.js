/**
 * Created by ignat on 03-Jan-17.
 */

var filephoto;
var fixkomponen;

var UserModel = require('./../models/usermodel');
var DeviceModel = require('./../models/devicemodel');

var Fungsi = require('./../utils/fungsi');
var fixvalue = require('./../utils/fixvalue.json')
var muridctrl = require('./../controllers/muridctrl');
var guructrl = require('./../controllers/guructrl');
var walictrl = require('./../controllers/walictrl');

var sdkmulter = require('multer');
var storagprofile = sdkmulter.diskStorage(
{
  destination : function (req, file, callback)
  {
    var strKomponen = req.body["Komponen"].toString();

    if(strKomponen === fixvalue.Komponen.Wali)
      fixkomponen = "Orangtua";
    else
      fixkomponen = strKomponen;

    filephoto = fixvalue.PhotoDir.Profile + fixkomponen;
    sdkmulter({dest : filephoto});
    callback(null, filephoto);
  },
  filename: function (req, file, callback)
  {
    filephoto = file.originalname;
    callback(null, file.originalname);
  }
});

//noinspection JSUnresolvedFunction
var fileprofile = sdkmulter({storage : storagprofile}).single("Photo");

var AllUser = function(req, res, next)
{
	var data = req.body["DataUser"];

	UserModel.CountUserRecord(data, function (err, count)
	{
		if(err)
		{
			res.status(202);
			res.json(Fungsi.LoginGagal());
		}
		else
		if (!count)
		{
			res.status(201);
			res.json(Fungsi.LoginSalah());
		}
		else
			return next();
	});
};

var UserRecord = function(req, res, next)
{
	var user = req.body["DataUser"];
	var cekuser = {"Handphone" : user["Handphone"]};

	UserModel.CountUserRecord(cekuser, function (err, count)
	{
		if(err)
		{
			res.status(202);
			res.json(Fungsi.RegisGagal());
		}
		else
		if (!count)
			return next();
		else
		{
			res.status(201);
			res.json(Fungsi.AkunAda());
		}
	});
};

var LogoutUser = function(req, res)
{
	var data = req.body["DataUser"];

	UserModel.AllUserRecord(data, function (err, count)
	{
		if (err)
		{
			res.status(202);
			res.json(Fungsi.LogoutGagal());
		}
		else
		if (count.length === 0)
		{
			res.status(201);
			res.json(Fungsi.LogoutSalah());
		}
		else
		{
			var tambahan = {"Status" : fixvalue.Pesan.strStatusLogout};

			UserModel.UpdateUserRecord(data, tambahan, function(err, user)
			{
				if(err)
				{
					res.status(202);
					res.json(Fungsi.LogoutGagal());
				}
				else
					res.json(Fungsi.LogoutSukses());
			});
		}
	});
};

var ProfileUser = function(req, res)
{
  var ParamID = req.body["ParamID"];
	var Profile = {"Handphone" : req.body["CariProfile"]};
	Profile["KodeDevice"] = req.body["KodeDevice"];

	UserModel.AllUserRecord(Profile, function (err, user)
	{
		if (err)
		{
			res.status(202);
			res.json(Fungsi.ProfileKosong());
		}
		else
		{
			if(user.length === 0)
			{
				res.status(202);
				res.json(Fungsi.ProfileKosong());
			}
			else
			{
			  if(ParamID === 0)
        {
          res.status(200);
          res.json(Fungsi.ProfileUpdate(user[0]));
        }
			  else
        if(ParamID === 1)
        {
          res.status(200);
          res.json(Fungsi.ProfileData(user[0], 0));
        }
        else
        if(ParamID === 2)
        {
          var DataReq = req.body;

          DataReq["DataCari"] = user[0]["_id"];
          muridctrl.postListDataMurid(DataReq, res);
        }
			}
		}
	});
};

var RubahProfile = function(req, res)
{
	var datauser = req.body["DataUser"];
	var datadevice = req.body["DataDevice"];

	var hp = req.body["DataUser"]["Handphone"];
	var device = req.body["DataDevice"]["DeviceID"];
	var cekuser = {"Handphone" : hp, "KodeDevice" : device};
	var LoginID = req.body["DataUser"]["LoginID"];
	var email = req.body["DataUser"]["Email"];
	var IdxKomponen = req.body["DataUser"]["IdxKomponen"];
	var Komponen = req.body["DataUser"]["Komponen"];
	var NamaUser = req.body["DataUser"]["Nama"];

	UserModel.AllUserRecord(cekuser, function (err, user)
	{
		if (err)
		{
			res.status(202);
			res.json(Fungsi.ProfileGagal());
		}
		else
		{
			if(user.length === 0)
			{
				if(LoginID === 1)
				{
					res.status(201);
					res.json(Fungsi.ProfileGagal());
				}
				else
				{
					datauser["Status"] = fixvalue.Pesan.strStatusLogin;
					datauser["Profile"] = fixvalue.Pesan.strProfileUpdate;
					datauser["LoginID"] = LoginID;

					UserModel.UpdateUserRecord(cekuser, datauser, function(err, userdata)
					{
						if (err)
						{
							res.status(202);
							res.json(Fungsi.ProfileGagal());
						}
						else
						{
							DeviceModel.UpdateDeviceRecord(device, datadevice, function(err, devicedata)
							{
								if (err)
								{
									res.status(202);
									res.json(Fungsi.ProfileGagal());
								}
								else
									UpdateDataProfile(Komponen, req, res, userdata["_id"]);
							});
						}
					});
				}
			}
			else
			{
				var StatProfile = user[0]["Profile"];
				var Update;

        if(StatProfile === "Kosong")
        {
          Update = {"Profile" : fixvalue.Pesan.strProfileUpdate, "IdxKomponen" : IdxKomponen, "Komponen" : Komponen, "LoginID" : LoginID, "Nama" : NamaUser};

          if(LoginID === 1)
            Update["Email"] = email;
          else
            Update["Handphone"] = hp;
        }
        else
          Update = {"Nama" : datauser["Nama"]};


        UserModel.UpdateUserRecord({"_id" : user[0]["_id"]}, Update, function(err, userdata)
        {
          if(err)
          {
            res.status(202);
            res.json(Fungsi.ProfileGagal());
          }
          else
            UpdateDataProfile(Komponen, req, res, userdata["_id"]);
        });
			}
		}
	});
};

var UpdateDataProfile = function(komponen, req, res, UserID)
{
  req.body["DataUser"]["UserID"] = UserID;

	if(komponen === fixvalue.Komponen.Murid)
		muridctrl.postMuridRecord(req, res);
	else
	if(komponen === fixvalue.Komponen.Guru)
		guructrl.postGuruRecord(req, res);
	else
	if(komponen === fixvalue.Komponen.Wali)
		walictrl.postWaliRecord(req, res);
  else
  {
    res.status(201);
    res.json(Fungsi.ProfileGagal());
  }
}

var RubahPassword = function(req, res)
{
  var Profile = {"Handphone" : req.body["DataUser"]["Handphone"]};
  Profile["Password"] = req.body["DataUser"]["Password"];
  Profile["KodeDevice"] = req.body["DataDevice"]["DeviceID"];

  UserModel.AllUserRecord(Profile, function (err, user)
  {
    if (err)
    {
      res.status(202);
      res.json(Fungsi.PasswordGagal());
    }
    else
    {
      if(user.length === 0)
      {
        res.status(202);
        res.json(Fungsi.PasswordGagal());
      }
      else
      {
        var Rubah = {"Password" : req.body["DataUser"]["Passbaru"]};

        UserModel.UpdateUserRecord({"_id" : user[0]["_id"]}, Rubah, function (err, user)
        {
          if (err)
          {
            res.status(202);
            res.json(Fungsi.PasswordGagal());
          }
          else
          {
            res.status(200);
            res.json(Fungsi.PasswordSukses());
          }
        });
      }
    }
  });
};

var PhotoProfile = function(req, res)
{
  fileprofile(req, res, function (err)
  {
    if (err)
    {
      res.status(202);
      res.json(Fungsi.UploadGagal());
    }
    else
    {
      var CekUser = {"Handphone" : req.body["Handphone"]};
      CekUser["KodeDevice"] = req.body["KodeDevice"];

      var Komponen = req.body["Komponen"];

      UserModel.AllUserRecord(CekUser, function (err, datuser)
      {
        if (err)
        {
          res.status(202);
          res.json(Fungsi.UploadGagal());
        }
        else
        if (datuser.length === 0)
        {
          res.status(201);
          res.json(Fungsi.UploadGagal());
        }
        else
        {
          var datafile = {"Photo" : filephoto};

          UserModel.UpdateUserRecord({"_id" : datuser[0]["_id"]}, datafile, function(err, resUser)
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
    }
  });
};

var AmbilPhotoProfile = function(req, res)
{
  var filesource = fixvalue.PhotoDir.Profile + req.params.Komponen + "/" + req.params.Handphone;

  res.download(filesource, req.params.Handphone, function (err)
  {
    if(err)
    {
      res.status(202);
      res.json(Fungsi.PhotoGagal());
    }
  });
}

module.exports = {getAllUser : AllUser, postUserRecord : UserRecord, getLogoutUser : LogoutUser,
									getProfileUser : ProfileUser, postRubahProfile : RubahProfile, postRubahPassword : RubahPassword,
                  postPhotoProfile : PhotoProfile, getPhotoProfile : AmbilPhotoProfile};
