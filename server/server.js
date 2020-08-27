const express = require('express');
const path = require('path');
const server = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://Francis:M0nkeyman6797@cluster0.ibdt9.mongodb.net/scores?retryWrites=true&w=majority';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(MONGO_URI, mongoOptions);

server.use(bodyParser.json());

server.use('/', express.static(path.join(__dirname, '..', 'build')));

server.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', '/index.html'));
});

server.get('/mong', (req, res) => {
	if (mongoose) {
		res.json({ isReady: !!mongoose.connection.readyState });
	} else {
		res.json({
			isReady: false
		});
	}
});

var Score = require('./db.js').Scores;

var addScore = require('./db.js').addScore;
server.post('/scores/add', (req, res, next) => {
	addScore(req.body);
});

var getAllScores = require('./db.js').getAllScores;
server.get('/scores/get', (req, res) => {
	res.json(getAllScores());
});

var getScore = require('./db.js').getScore;
server.get('/scores/get/:name', (req, res) => {
	res.send(getScore(req.params.name));
});

server.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
