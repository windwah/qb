var marzoni = {

//	serverUrl: "http://192.168.1.233:8086/"
	serverUrl: "http://58.64.129.183",
	minQty:10,
	avgQty:50,
	marzoni_version: '1.0.7'
}

function chaneLanguage(lang, cb){
	localStorage.setItem('lang',lang);
	var url = marzoni.serverUrl + '/js/lang/' + lang + '.js'
	jQuery.getScript( url, cb );
}

