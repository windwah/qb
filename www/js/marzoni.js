var marzoni = {

	serverUrl: "http://58.64.129.183",
	minQty:5,
	avgQty:50,
	marzoni_version: '1.2.1'
}

function chaneLanguage(lang, cb){
	localStorage.setItem('lang',lang);
	var url = marzoni.serverUrl + '/js/lang/' + lang + '.js'
	jQuery.getScript( url, cb );
}

