var anchors = document.querySelectorAll('[href^="b://"], [href^="B://"]');
var objects = document.querySelectorAll('[src^="b://"], [src^="B://"]');
var regex = /^([0-9a-fA-F]{64,64})(:(\d+)(@(\d+))?)?$/;
var b_protocolHandler = 'b://';
var providers = [
	'https://view.exfuturo.org/',
	'https://static.bitcoinfiles.org/',
	'https://bico.media/',
	'https://api.bitpaste.app/file/',
];
var a, object, b_url;

for(a of anchors){
	b_url = a.getAttribute('href').substr(b_protocolHandler.length);
	if(!regex.test(b_url)){continue};

	if(a.getAttribute('href').substr(0, b_protocolHandler.length).toLowerCase() == b_protocolHandler) {
		a.setAttribute('href', providers[Math.floor(Math.random()*providers.length)] + b_url);
	}
}

for(object of objects){
	b_url = object.getAttribute('src').substr(b_protocolHandler.length);
	if(!regex.test(b_url)){continue};

	if(object.getAttribute('src').substr(0, b_protocolHandler.length).toLowerCase() == b_protocolHandler) {
		object.setAttribute('src', providers[Math.floor(Math.random()*providers.length)] + b_url);
	}
}