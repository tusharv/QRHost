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
	var qrPath = 'https://api.qrserver.com/v1/create-qr-code/?data='+hostname+'&size=150x150';

	document.getElementById('qrimage').src = qrPath;
	document.getElementById('qrref').href = qrPath;
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
