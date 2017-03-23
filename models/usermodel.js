/**
 * Created by ignat on 03-Jan-17.
 */

var mongoose = require('mongoose');
var userschema = new mongoose.Schema(
	{
		Nama			  : {type: String, require: true},
		Handphone	  : {type: String, require: true},
		Email		    : {type: String, require: true},
		Password	  : {type: String, require: true},
		KodeDevice	: {type: String, require: true},
		Status			: {type: String, require: true},
		Profile			: {type: String, require: true},
		LoginID			: {type: Number, require: true},
		IdxKomponen	: {type: Number, require: true},
		Komponen		: {type: String, require: true},
		Keterangan  : {type: String, require: true},
    Photo       : {type: String, require: true}
  }, {toJSON: {virtuals: true}});

userschema.virtual('PhotoURL',
  {
    ref           : 'user', // The model to use
    localField    : 'Handphone', // Find people where `localField`
    foreignField  : 'PhotoURL' // is equal to `foreignField`
  });

var usermodel = mongoose.model("user", userschema);

module.exports.AllUserRecord =
	function (data, callback)
	{
    var ParamID = data["ParamID"];
    var Profile = {"Handphone" : data["CariProfile"]};
    Profile["KodeDevice"] = data["KodeDevice"];

    if(ParamID === 0)
      usermodel.findOne(Profile, '-Password -__v -KodeDevice -Status -_id -IdxKomponen -LoginID').populate('PhotoURL').exec(callback);
    else
    if(ParamID === 1)
      usermodel.findOne(Profile, '-Password -__v -KodeDevice -Status -_id').populate('PhotoURL').exec(callback);
    else
    if(ParamID === 2)
      usermodel.findOne(Profile, '-Password -__v -KodeDevice -Status').populate('PhotoURL').exec(callback);
	};

module.exports.AddUserRecord =
	function (user, callback)
	{
		usermodel.create(user, callback);
	};

module.exports.CountUserRecord =
	function (user, callback)
	{
		usermodel.count(user, callback);
	};

module.exports.UpdateUserRecord =
	function (user, update, callback)
	{
		usermodel.findOneAndUpdate(user, update, {upsert : true, returnNewDocument : true}, callback);
	};

module.exports.AllUserHandle =
  function (data, callback)
  {
    usermodel.findOne(data, '-__v', callback);
  };
