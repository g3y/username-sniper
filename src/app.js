const fetch = require('node-fetch'),
	{token} = require('../config.json');

async function getUsername() {
	const res = await fetch('https://discord.com/api/v9/users/@me/pomelo', {
		method: 'POST',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.1027 Chrome/108.0.5359.215 Electron/22.3.2 Safari/537.36',
		},
		body: JSON.stringify({username: 'USERNAME_HERE'}),
	});

	switch (res.status) {
		case 200:
			console.log('(+) Username changed successfully');
			break;
		case 429:
			console.log('(-) You are being rate limited');
			sleep(Math.floor(Math.random() * (5500 - 3400 + 1) + 3400));
			break;
		default:
			console.log('(-) An error occurred ' + res.status);
			sleep(Math.floor(Math.random() * (800 - 1400 + 1) + 1400));
	}
}

getUsername();

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
