const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();
const PORT = process.env.PORT || 4000;

const MONGO_URI = 'mongodb+srv://Francis:M0nkeyman6797@cluster0.ibdt9.mongodb.net/database?retryWrites=true&w=majority';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

server.use(cors());
mongoose.connect(MONGO_URI, mongoOptions);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/', express.static(process.cwd() + '/../build'));

server.get('/', (req, res) => {
	res.sendFile(path.join(process.cwd() + '../public/index.html'));
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
	addScore(req.body.username, parseInt(req.body.score));
	res.send('Success');
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
	console.log(`Server listening on port ${PORT}`);
});
