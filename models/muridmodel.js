/**
 * Created by ignat on 03-Jan-17.
 */
var fixvalue = require('./../utils/fixvalue.json')

var mongoose = require('mongoose');
var siswaschema = new mongoose.Schema(
	{
		Photo			  	: {type: String, require: true},
		NAMASISWA			: {type: String, require: true},
		NOTELP				: {type: String, require: true},
		EMAIL	 				: {type: String, require: true},
		ALAMAT				: {type: String, require: true},
		PROPINSI			: {type: String, require: true},
		Kecamatan  		: {type: String, require: true},
		KOTA  				: {type: String, require: true},
		RT  					: {type: String, require: true},
		RW  					: {type: String, require: true},
		KODEPOS  			: {type: String, require: true},
		TMPTLAHIR  		: {type: String, require: true},
		TGLLAHIR  		: {type: String, require: true},
		Area  				: {type: String, require: true},
		Telpon  			: {type: String, require: true},
		NIS  					: {type: String, require: true},
		IdxSeks  			: {type: Number, require: true},
		JENISKELAMIN	: {type: String, require: true},
		Agama	  			: {type: String, require: true},
		IdxAgama	  	: {type: Number, require: true},
    UserID	    	: {type: String, require: true},
    StatusPSB	    : {type: String, require: true}
  }, {toJSON: {virtuals: true}});

siswaschema.virtual('PhotoURL',
  {
    ref           : 'siswa', // The model to use
    localField    : '_id', // Find people where `localField`
    foreignField  : 'PhotoURL' // is equal to `foreignField`
  });

var muridmodel = mongoose.model("siswa", siswaschema);

module.exports.AllMuridRecord =
	function (datamurid, callback)
	{
		muridmodel.findOne(datamurid, callback);
	};

module.exports.AddMuridRecord =
	function (datamurid, callback)
	{
		muridmodel.create(datamurid, callback);
	};

module.exports.CountMuridRecord =
	function (datamurid, callback)
	{
		muridmodel.count(datamurid, callback);
	};

module.exports.UpdateMuridRecord =
	function (datamurid, update, callback)
	{
		muridmodel.findOneAndUpdate(datamurid, update, {upsert : true}, callback);
	};

module.exports.MuridBaruRecord =
  function (datamurid, callback)
  {
    muridmodel.find(datamurid, 'NAMASISWA TglDaftar JENISKELAMIN TGLLAHIR Kelas StatusPSB Photo').populate('PhotoURL').exec(callback);
  };
