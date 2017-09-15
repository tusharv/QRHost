function executeCopy(text) {
	var input = document.createElement('textarea');
	input.style.position = "absolute";
	document.body.appendChild(input);
	input.value = text;
	input.focus(); input.select();
	document.execCommand('Copy');
	input.remove();
}

function getHostname(url) {
	try {
		var newUrl = new URL(url);
		return newUrl;
	} catch (err) {
		console.log(err);
	}
}

function setHostname(hostname) {
	var qrPath = 'https://api.qrserver.com/v1/create-qr-code/?data='+encodeURIComponent(hostname)+'&size=200x200';
    var qrimage = document.getElementById('qrimage');
    var qrref =  document.getElementById('qrref');

	qrimage.src = qrPath;
    qrref.innerHTML = 'Please Wait';
    
    qrimage.addEventListener('error',function(e){
		e.target.src = 'img/error.png';
        qrref.setAttribute('href','#');
        qrref.removeAttribute('download');
        qrref.innerHTML = 'Try Again!';
        setTimeout(closePopup,2000);
	});
    
    qrimage.addEventListener('load',function(e){
        if(String(e.target.src).indexOf('error.png') === -1){
            qrref.setAttribute('href',qrPath);
            qrref.setAttribute('download','');
            qrref.innerHTML = 'Click to Save';
        }
	});
}

function closePopup() {
	window.close();
}

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	var hostname = getHostname(tabs[0].url);
	if (!hostname) { closePopup(); return; }
	// Copy to clipboard and shows a popup
	executeCopy(hostname);
	setHostname(hostname);
});
