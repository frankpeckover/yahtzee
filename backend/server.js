const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Score = require('./models/score.model.js').ScoreModel;

const server = express();
const PORT = process.env.PORT || 4000;
const uri = 'mongodb+srv://Francis:M0nkeyman6797@cluster0.ibdt9.mongodb.net/database?retryWrites=true&w=majority';

/* middleware */
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/* Connecting to the mongoose database */
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, mongoOptions).catch((err) => console.log(`Error: ${err}`));
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('Successfully connected to mongoDB');
});

/* Server up files for the root directory */
server.use('/', express.static(process.cwd() + '/../build'));

server.get('/', (req, res) => {
	res.sendFile(path.join(process.cwd() + '../public/index.html'));
});

/* Routing for CRUD of database */
server.post('/scores', (req, res) => {
	Score.countDocuments({ username: req.body.username })
		.then((number) => {
			if (!number) {
				//User does not exist and we can create one
				let user = req.body.username;
				let pass = req.body.password;
				let s = req.body.score;

				let newScore = new Score({ username: user, password: pass, score: s });

				newScore
					.save()
					.then(() => res.send(`User ${user} with score ${s} added`))
					.catch((err) => res.status(400).json(`Error: ${err}`));
			} else {
				Score.findOne({ username: req.body.username }).then((score) => {
					if (score.password === req.body.password) {
						score.score = req.body.score;
						score
							.save()
							.then(() => res.send(`Successfully updated ${req.body.username} to ${req.body.score}`))
							.catch((err) => res.send(`Error: ${err}`));
					} else {
						res.send(`Incorrect password for ${score.username}`);
					}
				});
			}
		})
		.catch((err) => res.send(`Error: ${err}`));
});

server.get('/scores', (req, res) => {
	Score.find({}).select('username score').then((score) => res.json(score)).catch((err) => res.send(`Error: ${err}`));
});

server.get('/scores/:user', (req, res) => {
	Score.findOne({ username: req.params.user })
		.select('username score')
		.then((score) => res.json(score))
		.catch((err) => res.send(`Error: ${err}`));
});

server.delete('/scores/:id', (req, res) => {
	Score.findByIdAndDelete(req.params.id)
		.then(() => res.send(`Successfully deleted ${req.params.id} from database`))
		.catch((err) => res.send(`Error: ${err}`));
});

/* Server listening */
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
