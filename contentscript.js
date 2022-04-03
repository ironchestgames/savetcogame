
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	const date = new Date()
  	const month = date.getMonth()
  	const monthPadding = month < 10 ? '0' : ''
  	const day = date.getDate()
  	const dayPadding = day < 10 ? '0' : ''
  	const hours = date.getHours()
  	const hoursPadding = hours < 10 ? '0' : ''
  	const minutes = date.getMinutes()
  	const minutesPadding = minutes < 10 ? '0' : ''
  	const seconds = date.getSeconds()
  	const secondsPadding = seconds < 10 ? '0' : ''
  	const datetime = `${date.getFullYear()}-${monthPadding + month}-${dayPadding + day} ${hoursPadding + hours}:${minutesPadding + minutes}:${secondsPadding + seconds}`

		// get users
		const localUsername = document.querySelector("#nav-dropdown > span").textContent

		if (!localUsername) {
			throw 'User is not logged in: ' + localUsername
		}

		const usernames = []
		usernames[1] = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div:nth-child(1) > span.username").textContent
		usernames[2] = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div:nth-child(2) > span.username").textContent

		const me = usernames[1] === localUsername ? 1 : 2
		const opponent = usernames[1] === localUsername ? 2 : 1

		// datetime	end_turn	name	deckname	doklink	keys	amber	keycost	opp_name	opp_deckname	opp_doklink	opp_keys	opp_amber	opp_keycost

		const deckName = document.querySelector(`#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div:nth-child(${me}) > a`).textContent
		const deckid = document.querySelector(`#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div:nth-child(${me}) > a`).href.split('https://www.keyforgegame.com/deck-details/')[1]

		const myAmber = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.panel.player-stats > div:nth-child(1) > div:nth-child(3) > div.stat-value").textContent
		const myKeyCost = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.panel.player-stats > div:nth-child(1) > div:nth-child(5) > div.stat-value").textContent
		const myKeysElements = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.panel.player-stats > div:nth-child(1) > div:nth-child(2)").children
		let myKeys = 0
		for (let i = 0; i < myKeysElements.length; i++) {
			if (myKeysElements[i].className === 'forged-key') {
				myKeys++
			}
		}

		const oppDeckid = document.querySelector(`#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div:nth-child(${opponent}) > a`).href.split('https://www.keyforgegame.com/deck-details/')[1]
		const oppDeckName = document.querySelector(`#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div:nth-child(${opponent}) > a`).textContent

		const oppAmber = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.stats-top > div > div > div:nth-child(3) > div.stat-value").textContent
		const oppKeyCost = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.stats-top > div > div > div:nth-child(5) > div.stat-value").textContent
		const oppKeysElements = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.stats-top > div > div > div:nth-child(2)").children
		let oppKeys = 0
		for (let i = 0; i < oppKeysElements.length; i++) {
			if (oppKeysElements[i].className === 'forged-key') {
				oppKeys++
			}
		}

		const allMessages = document.querySelectorAll("#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div")
		let endTurn = undefined;
		for (let i = allMessages.length - 1; i >= 0; i--) {
			const innerText = allMessages[i].firstChild.innerText
			if (innerText.startsWith('TURN')) {
				endTurn = innerText.match(/\d+/)[0]
				break
			}
		}

		// const endRound = document.querySelector("#component > div > div.bg > div.wrapper > div > div > div.main-window > div.right-side > div.gamechat > div > div > div > div:nth-child(179) > div")

  	const values = [
  		datetime,
  		endTurn,
  		usernames[me],
  		deckName,
  		'https://decksofkeyforge.com/decks/' + deckid,
  		myKeys,
  		myAmber,
  		myKeyCost,
  		usernames[opponent],
  		oppDeckName,
  		'https://decksofkeyforge.com/decks/' + oppDeckid,
  		oppKeys,
  		oppAmber,
  		oppKeyCost,
  	]

    sendResponse(values.join('	'))
  }
);
