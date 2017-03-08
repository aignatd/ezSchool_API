/**
 * Created by ignat on 03-Jan-17.
 */

var mongoose = require('mongoose');
var deviceschema = new mongoose.Schema(
	{
		Nama			  : {type: String, require: true},
		DeviceID    : {type: String, require: true},
		DeviceType  : {type: String, require: true},
		DeviceOS    : {type: String, require: true},
		Keterangan  : {type: String, require: true}
	});

var devicemodel = module.exports = mongoose.model("device", deviceschema);

module.exports.AllDeviceRecord =
	function (data, callback)
	{
		devicemodel.findOne(data, callback);
	};

module.exports.AddDeviceRecord =
	function (device, callback)
	{
		devicemodel.create(device, callback);
	};

module.exports.CountDeviceRecord =
	function (device, callback)
	{
		devicemodel.count(device, callback);
	};

module.exports.UpdateDeviceRecord =
	function (user, update, callback)
	{
		devicemodel.findOneAndUpdate(user, update, {upsert : true, returnNewDocument : true}, callback);
	};
