const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database.js');
const crypto = require('crypto');

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

hashString = (string) => {
	return crypto.createHash('sha256').update(string).digest('hex');
}

app.get('/scores', async (req, res) => {
	const pool = await database.poolPromise;
	const result = await pool.query(`select * from scores`)
	res.send(JSON.stringify(result.recordset))
})

app.post('/login', async (req, res) => {
	try {
		const pool = await database.poolPromise;
		data = req.body
		
		var hashedpassword = hashString(data.password)

		const result = await pool.request()
		.input('username', data.username)
		.query(`SELECT * FROM users WHERE username = @username`);

		if (result.recordset.length <= 0) {
			console.log("No user found")
			return res.status(404).send({ 
				message: "No User Found" 
			})
		}

		if (result.recordset[0].password != hashedpassword) {
			console.log(`Incorrect password: ${result.recordset[0].password} != ${hashedpassword}`)
			return res.status(401).send({ 
				message: "Incorrect Password" 
			})
		}
		
		if (result.recordset[0].password == hashedpassword) {
			console.log(`Login successful`)
			return res.status(200).send({ 
				message: `Login Successful`, 
				username: data.username 
			})
		}
	}
	catch (err) {
		console.error('Login Error: ', err)
		return res.status(500).json({ 
			message: "Internal Server Error" 
		});
	}
})

app.post('/register', async (req, res) => {
	try {
		const pool = await database.poolPromise;
		data = req.body

		var hashedpassword = hashString(data.password)

		const result = await pool.request()
		.input('username', database.sql.VarChar, data.username)
		.query(`SELECT * FROM users WHERE username = @username`);

		if (result.recordset.length >= 1) {
			return res.status(401).send({ 
				message: `User Already Exists`, 
				username: data.username
			})
		}

		if (result.recordset.length === 0) {
			try {
				console.log("No users found, registering...")
				const result = await pool.request()
					.input('username', data.username)
					.input('password', hashedpassword)
					.query(`
						INSERT INTO users (
							username, password
						) VALUES (
							@username, @password
						)
					`);
					console.log(`Registration successful`)
					return res.status(200).send({ 					
						message: `Resgistration Successful`, 
						username: data.username 
					})
			}
			catch (err) {
				console.error('Registration SQL Error: ', err)
				return res.status(500).json({ 
					message: "SQL Server Error" 
				});
			}
		}
	}
	catch (err) {
		console.error('Registration Error: ', err)
		return res.status(500).json({ 
			message: "Internal Server Error" 
		});
	}
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
			res.status(200).json({ 
				message: 'Score saved successfully!' 
			});

	} catch (error) {
		console.error('Error saving score:', error);
		res.status(500).json({ 
			message: 'Failed to save score.' 
		});
	}
})

/* Server listening */
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
