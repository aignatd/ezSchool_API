/**
 * Created by ignat on 03-Jan-17.
 */

var mongoose = require('mongoose');
var guruschema = new mongoose.Schema(
	{
		Photo			  				: {type: String, require: true},
		NAMAGURU						: {type: String, require: true},
		NOTELP							: {type: String, require: true},
		EMAIL	 							: {type: String, require: true},
		ALAMAT							: {type: String, require: true},
		PROPINSI						: {type: String, require: true},
		Kecamatan  					: {type: String, require: true},
		KOTA  							: {type: String, require: true},
		RT  								: {type: String, require: true},
		RW  								: {type: String, require: true},
		KODEPOS  						: {type: String, require: true},
		TMPTLAHIR  					: {type: String, require: true},
		TGLLAHIR  					: {type: String, require: true},
		Area  							: {type: String, require: true},
		Telpon  						: {type: String, require: true},
		NIG  								: {type: String, require: true},
		IdxSeks  						: {type: Number, require: true},
		JENISKELAMIN				: {type: String, require: true},
		IdxDidik  					: {type: Number, require: true},
		PENDIDIKANTERAKHIR	: {type: String, require: true},
		IdxStatus  					: {type: Number, require: true},
		Status							: {type: String, require: true},
		Agama								: {type: String, require: true},
		IdxAgama				  	: {type: Number, require: true}
	});

var gurumodel = mongoose.model("guru", guruschema);

module.exports.AllGuruRecord =
	function (dataguru, callback)
	{
		gurumodel.findOne(dataguru, callback);
	};

module.exports.AddGuruRecord =
	function (dataguru, callback)
	{
		gurumodel.create(dataguru, callback);
	};

module.exports.CountGuruRecord =
	function (dataguru, callback)
	{
		gurumodel.count(dataguru, callback);
	};

module.exports.UpdateGuruRecord =
	function (dataguru, update, callback)
	{
		gurumodel.findOneAndUpdate(dataguru, update, {upsert : true}, callback);
	};
