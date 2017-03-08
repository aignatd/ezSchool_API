/**
 * Created by ignat on 03-Jan-17.
 */

var UserModel = require('./../models/usermodel');
var fixvalue = require('./../utils/fixvalue.json')
var DeviceModel = require('./../models/devicemodel');
var Fungsi = require('./../utils/fungsi');

var AllDevice = function(req, res)
{
	var data = req.body["DataDevice"];
	var user = req.body["DataUser"];

	DeviceModel.AllDeviceRecord(data, function (err, device)
	{
		if((err) || (device === null))
		{
			res.status(202);
			res.json(Fungsi.LoginSalah());
		}
		else
		if(device.length === 0)
		{
			res.status(201);
			res.json(Fungsi.LoginSalah());
		}
		else
		{
			var tambahan = {"Status" : fixvalue.Pesan.strStatusLogin};

			UserModel.UpdateUserRecord(user, tambahan, function(err, userdata)
			{
				if(err)
				{
					res.status(202);
					res.json(Fungsi.LoginGagal());
				}
				else
					res.json(Fungsi.LoginSukses(userdata));
			});
		}
	});
};

var DeviceRecord = function(req, res)
{
	var device = req.body["DataDevice"];

  DeviceModel.AddDeviceRecord(device, function (err, device)
  {
    if(err)
    {
      res.status(201);
      res.json(Fungsi.RegisGagal());
    }
    else
    {
      var user = req.body["DataUser"];
      user["KodeDevice"] = device["DeviceID"];
      user["Status"] = fixvalue.Pesan.strStatusLogin;
      user["Profile"] = fixvalue.Pesan.strDataProfile;

      UserModel.AddUserRecord(user, function (err, userdata)
      {
        if(err)
        {
          res.status(202);
          res.json(Fungsi.RegisGagal());
        }
        else
        {
          res.status(200);
          res.json(Fungsi.RegisSukses(userdata));
        }
      });
    }
  });
};

module.exports = {getAllDevice : AllDevice, postDeviceRecord : DeviceRecord};
