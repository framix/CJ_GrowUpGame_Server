const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
const port = 10001;

dotenv.config();

// Handle favicon request and send 404
app.get('/favicon.ico', (req, res) =>
{
	res.status(404).send('Not Found');
});

app.use((req, res, next) =>
{
	res.cookie('sugarfarmCookie', 'baseValue', {
		sameSite: 'None',
		secure: true,
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000 // 1 day
	});
	next();
});

// / 경로로 접속하면 web-mobile 폴더를 루트로 설정
app.use(express.static('web-mobile'));

// /dev 경로로 접속하면 web-mobile-dev 폴더를 루트로 설정
app.use('/dev', express.static('web-mobile-dev'));

// /local 경로로 접속하면 web-mobile-local 폴더를 루트로 설정
app.use('/local', express.static('web-mobile-local'));

// /test 경로로 접속하면 testpage.html 파일을 응답
app.get('/test', (req, res) =>
{
	const testUrl = process.env.TEST_URL; // Get TEST_URL from dotenv

	if (!testUrl)
	{
		return res.status(500).send('TEST_URL is not defined');
	}

	// Read testpage.html file
	fs.readFile(__dirname + '/testpage.html', 'utf8', (err, data) =>
	{
		if (err)
		{
			return res.status(500).send('Error reading HTML file');
		}

		// Replace {{TEST_URL}} with testUrl in the HTML file
		const htmlWithTestUrl = data.replace(/{{TEST_URL}}/g, testUrl);

		// Send the modified HTML as the response
		res.send(htmlWithTestUrl);
	});
});

app.use((req, res) =>
{
	res.status(404).send('Not Found');
});

app.listen(port, () =>
{
	console.log(`Server is running on port ${port}`);
});