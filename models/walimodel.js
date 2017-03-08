/**
 * Created by ignat on 03-Jan-17.
 */

var mongoose = require('mongoose');
var walischema = new mongoose.Schema(
	{
		Photo			  				: {type: String, require: true},
		WALIMURID						: {type: String, require: true},
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
		IdxSeks  						: {type: Number, require: true},
		JENISKELAMIN				: {type: String, require: true},
		Agama								: {type: String, require: true},
		IdxAgama						: {type: String, require: true},
		PENDIDIKANTERAKHIR	: {type: String, require: true},
		IdxDidik  					: {type: Number, require: true},
		Status							: {type: String, require: true},
		IdxStatus						: {type: String, require: true},
		Pekerjaan						: {type: String, require: true},
		IdxKerja  					: {type: Number, require: true},
		Jabatan							: {type: String, require: true},
		EMAIL	 							: {type: String, require: true},
		NOTELP							: {type: String, require: true},
    UserID							: {type: String, require: true}
  });

var walimodel = mongoose.model("wali", walischema);

module.exports.AllWaliRecord =
	function (datawali, callback)
	{
		walimodel.findOne(datawali, callback);
	};

module.exports.AddWaliRecord =
	function (datawali, callback)
	{
		walimodel.create(datawali, callback);
	};

module.exports.CountWaliRecord =
	function (datawali, callback)
	{
		walimodel.count(datawali, callback);
	};

module.exports.UpdateWaliRecord =
	function (datawali, update, callback)
	{
		walimodel.findOneAndUpdate(datawali, update, {upsert : true}, callback);
	};
