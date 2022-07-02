const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const Score = require('./models/score.model.js').ScoreModel;

const app = express();
const PORT = process.env.PORT || 8081;
//const uri = 'mongodb+srv://Francis:M0nkeyman6797@cluster0.ibdt9.mongodb.net/database?retryWrites=true&w=majority';

/* middleware */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Connecting to the mongoose database */
/*
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, mongoOptions).catch((err) => console.log(`Error: ${err}`));
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('Successfully connected to mongoDB');
});
*/

/* Server up files for the root directory */
app.use('/', express.static(process.cwd() + '/../build'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(process.cwd() + '/../public/index.html'));
});

/* Routing for CRUD of database */
/*
app.post('/scores', (req, res) => {
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
					.then(() => res.send(`Successfully added user: ${user} : ${s} to database`))
					.catch((err) => res.json(err));
			} else {
				Score.findOne({ username: req.body.username }).then((score) => {
					if (score.password === req.body.password) {
						score.score = req.body.score;
						score
							.save()
							.then(() => res.send(`Successfully updated ${req.body.username} to ${req.body.score}`))
							.catch((err) => res.send(err));
					} else {
						res.send(`Incorrect password for ${score.username}`);
					}
				});
			}
		})
		.catch((err) => res.send(err));
});

app.get('/scores', (req, res) => {
	Score.find({}).select('username score').then((score) => res.json(score)).catch((err) => res.send(err));
});

app.get('/scores/:user', (req, res) => {
	Score.findOne({ username: req.params.user })
		.select('username score')
		.then((score) => res.json(score))
		.catch((err) => res.send(err));
});

app.delete('/scores/:id', (req, res) => {
	Score.findByIdAndDelete(req.params.id)
		.then(() => res.send(`Successfully deleted ${req.params.id} from database`))
		.catch((err) => res.send(err));
});
*/

/* Server listening */
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
