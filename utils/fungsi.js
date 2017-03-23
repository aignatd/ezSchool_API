/**
 * Created by ignat on 05-Jan-17.
 */

var fixvalue = require('./fixvalue.json')
var strPesan = fixvalue.Pesan;
var strResponID = fixvalue.Kode;
var strJSON;

module.exports =
{
	LoginSalah	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strLoginSalah}};
		return strJSON;
	},
	LoginGagal	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strLoginGagal}};
		return strJSON;
	},
	LoginSukses	:	function(res)
	{
		strJSON =	{"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strLoginSukses},
							 "UserResponse"	:	{"Handphone" : res.Handphone, "Nama" : res.Nama}};
		return strJSON;
	},
	AkunAda	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strAkunAda}};
		return strJSON;
	},
	RegisGagal	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strRegisGagal}};
		return strJSON;
	},
	RegisSukses	:	function(res)
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strRegisSukses},
							 "UserResponse"	:	{"Handphone" : res.Handphone}};
		return strJSON;
	},
	LogoutSalah	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strLogoutSalah}};
		return strJSON;
	},
	LogoutGagal	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strLogoutGagal}};
		return strJSON;
	},
	LogoutSukses	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strLogoutSukses}};
		return strJSON;
	},
	ProfileKosong	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strDataProfile},
							 "UserResponse"	:	{"Profile" : strPesan.strDataProfile}};
		return strJSON;
	},
	ProfileGagal	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strProfileGagal}};
		return strJSON;
	},
	ProfileUpdate	:	function(res)
	{
	  var varProfile;

	  if(res["Profile"] === strPesan.strDataProfile)
      varProfile = {"Profile" : res["Profile"]};
	  else
    if(res["Profile"] === strPesan.strProfileUpdate)
      varProfile = res;

		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strProfileSukses},
							 "UserResponse"	:	varProfile};

		return strJSON;
	},
	ProfileSukses	:	function()
	{
		strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strProfileSukses}};
		return strJSON;
	},
  ProfileData	:	function(res, pilihan)
  {
    if(pilihan === 0)
      strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strDownloadSukses}, "UserResponse"	:	res};
    else
    if(pilihan === 1)
      strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strWaliSukses}, "WaliResponse"	:	res};
    else
    if(pilihan === 2)
      strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strGuruSukses}, "GuruResponse"	:	res};
    else
    if(pilihan === 3)
      strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strMuridSukses}, "MuridResponse"	:	res};

    return strJSON;
  },
  PasswordGagal	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strPasswordGagal},
      "UserResponse"	:	{}};
    return strJSON;
  },
  PasswordSukses	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strPasswordSukses},
      "UserResponse"	:	{}};
    return strJSON;
  },
  UploadGagal	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strUploadGagal},
      "UserResponse"	:	{}};
    return strJSON;
  },
  UploadSukses	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strUploadSukses},
      "UserResponse"	:	{}};
    return strJSON;
  },
  PhotoGagal	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strPhotoGagal},
      "UserResponse"	:	{}};
    return strJSON;
  },
  PSBKosong	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strPSBKosong}, "SiswaBaru" : [{}]};
    return strJSON;
  },
  PSBGagal	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.strPSBGagal}, "SiswaBaru" : [{}]};
    return strJSON;
  },
  PSBSukses	:	function(res)
  {
    res["CoreResponse"] = {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.strPSBSukses};
    return res;
  }
}
