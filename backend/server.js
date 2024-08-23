const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database.js');

const app = express();
const PORT = 82;

/* middleware */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../build'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.get('/scores', async (req, res) => {
	//Grab the data from 
	const pool = await database.poolPromise;
	const result = await pool.query(`select * from scores`)
	res.send(JSON.stringify(result.recordset))
})

app.post('/save-score', async (req, res) => {
	try {
		const pool = await database.poolPromise;
		data = req.body
		const datePlayed = new Date().toISOString();

		const result = await pool.request()
				.input('playerName', data.playerName)
				.input('ones', data.ones)
				.input('twos', data.twos)
				.input('threes', data.threes)
				.input('fours', data.fours)
				.input('fives', data.fives)
				.input('sixes', data.sixes)
				.input('threeKind', data.threeKind)
				.input('fourKind', data.fourKind)
				.input('fullHouse', data.fullHouse)
				.input('shortStraight', data.shortStraight)
				.input('longStraight', data.longStraight)
				.input('chance', data.chance)
				.input('yahtzee', data.yahtzee)
				.input('yahtzeeBonus', data.yahtzeeBonus)
				.input('bonus', data.bonus)
				.input('topSubTotal', data.topSubTotal)
				.input('topTotal', data.topTotal)
				.input('bottomTotal', data.bottomTotal)
				.input('grandTotal', data.grandTotal)
				.input('datePlayed', datePlayed)
				.query(`
					INSERT INTO scores (
						playerName, ones, twos, threes, fours, fives, sixes, 
						threeKind, fourKind, fullHouse, shortStraight, 
						longStraight, chance, yahtzee, yahtzeeBonus, bonus, 
						topSubTotal, topTotal, bottomTotal, grandTotal, datePlayed
					) VALUES (
						@playerName, @ones, @twos, @threes, @fours, @fives, @sixes, 
						@threeKind, @fourKind, @fullHouse, @shortStraight, 
						@longStraight, @chance, @yahtzee, @yahtzeeBonus, @bonus, 
						@topSubTotal, @topTotal, @bottomTotal, @grandTotal, @datePlayed
					)
				`);
			res.status(200).json({ message: 'Score saved successfully!' });

	} catch (error) {
		console.error('Error saving score:', error);
		res.status(500).json({ error: 'Failed to save score.' });
	}
})

/* Server listening */
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
