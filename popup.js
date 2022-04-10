
document.getElementById('copy').addEventListener('click', function copy() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, null, function(response) {

	  	const values = []

	  	for (const prop in response) {
	  		if (!localStorage[prop]) {
	  			values.push(response[prop])
	  		}
	  	}

			navigator.clipboard.writeText(values.join('	'))
			.then((response) => {
				document.getElementById('copied').className = 'visible'
				setTimeout(() => {
					document.getElementById('copied').className = 'hidden'
				}, 3000)
			})
	  });
	});
});


let isSettingsOpen = false
document.getElementById('cog').addEventListener('click', function openSettings() {
	isSettingsOpen = !isSettingsOpen

	if (isSettingsOpen) {
		document.getElementById('settings').className = 'visible'
	} else {
		document.getElementById('settings').className = 'none'
	}
});

document.getElementById('copy_columns').addEventListener('click', function copyColumnNames() {
	const columns = []
	const checkboxes = document.querySelectorAll('li input')
	for (const checkbox of checkboxes) {
		if (localStorage[checkbox.id] == '') {
			columns.push(checkbox.id)
		}
	}
	navigator.clipboard.writeText(columns.join('	'))
	.then((response) => {
		document.getElementById('copied').className = 'visible'
		setTimeout(() => {
			document.getElementById('copied').className = 'hidden'
		}, 3000)
	})
});

function updateStorage() {
	const checkboxes = document.querySelectorAll('li input')
	for (const checkbox of checkboxes) {
		localStorage[checkbox.id] = checkbox.checked ? '' : 'dontshow'
	}
}

const checkboxes = document.querySelectorAll('li input')
for (const checkbox of checkboxes) {
	checkbox.checked = localStorage[checkbox.id] == ''
	checkbox.addEventListener('click', updateStorage)
}
