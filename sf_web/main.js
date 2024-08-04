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

app.get('/youtube_api', (req, res) =>
{
	const videoId = req.query.videoId; // 요청으로부터 videoId를 가져옵니다.

	if (!videoId)
	{
		return res.status(400).send('videoId is required');
	}

	// youtube_api.html 파일 경로
	const htmlFilePath = path.join(__dirname, 'youtube_api.html');

	// HTML 파일 읽기
	fs.readFile(htmlFilePath, 'utf8', (err, data) =>
	{
		if (err)
		{
			return res.status(500).send('Error reading HTML file');
		}

		// HTML 파일에서 {{videoId}}를 videoId로 대체
		const htmlWithVideoId = data.replace('{{videoId}}', videoId);

		// 클라이언트에 HTML 응답
		res.send(htmlWithVideoId);
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