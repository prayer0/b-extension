var id = "";
/* set this variable once you've installed the app (it's labeled ID in chrome://extensions)
            (once deployed this will be hard coded and unchanging) */

var regex = /^([0-9a-fA-F]{64,64})(:(\d+)(@(\d+))?)?$/;
var providers = [
    'https://view.exfuturo.org/',
    'https://static.bitcoinfiles.org/',
    'https://bico.media/',
    'https://api.bitpaste.app/file/',
];
var b_parts, txid, n, height;

chrome.omnibox.onInputStarted.addListener(function() {
    chrome.management.launchApp(id, function onAppLaunched() {
        chrome.omnibox.onInputEntered.addListener(function(uri) {
            if (uri.indexOf("/") == 0){
                uri = uri.substr(1);
            }

            if(!regex.test(uri)){return;}

            b_parts = uri.match(regex);
            txid = b_parts[1];
            n = parseInt(b_parts[3]);
            height = parseInt(b_parts[5]);

            uri = providers[Math.floor(Math.random() * providers.length)] + txid;

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabIds) {
                var tabId = tabIds[0].id;
                chrome.tabs.update(tabId, {
                    url: uri
                }, function tabUpdateCallback() {
                    console.log("redirected")
                })
            })

        })
    })
})