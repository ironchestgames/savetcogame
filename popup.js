
function copy() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, null, function(response) {
			navigator.clipboard.writeText(response)
			.then((response) => {
				document.getElementById('copied').className = 'visible'
				setTimeout(() => {
					document.getElementById('copied').className = 'hidden'
				}, 3000)
			})
	  });
	});
}

document.getElementById('copy').addEventListener('click', copy);

