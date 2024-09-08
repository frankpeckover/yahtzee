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
	result = await database.getScores();
	res.send(JSON.stringify(result))
})

app.post('/login', async (req, res) => {
	try {
		var username = req.body.username
		var hashedPassword = hashString(req.body.password)

		users = await database.getUser(username)

		if (users.length <= 0) {
			console.log("No user found")
			return res.status(404).send({ 
				message: "No User Found" 
			})
		}

		if (users[0].password != hashedPassword) {
			console.log(`Incorrect password: ${users[0].password} != ${hashedPassword}`)
			return res.status(401).send({ 
				message: "Incorrect Password" 
			})
		}
		
		if (users[0].password == hashedPassword) {
			console.log(`Login successful`)
			return res.status(200).send({ 
				message: `Login Successful`, 
				username: username,
				userID: users[0].userID
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

	passwordRequirements = {
		length: 6,
		capital: true,
		capitalRegex: /[A-Z]/,
		symbol: true,
		symbolRegex: /[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/]/,
		number: true,
		numberRegex: /\d/
	}

	try {
		var username = req.body.username
		var password = req.body.password
		var hashedPassword = hashString(req.body.password)

		users = await database.getUser(username)
		console.log(users)
		

		if (users.length >= 1) {
			return res.status(401).send({ 
				message: `User Already Exists`, 
				username: username
			})
		}

		if (password.length < passwordRequirements.length) {
			return res.status(403).send({ 
				message: `Password too short`, 
			})
		}

		if (passwordRequirements.symbol && (passwordRequirements.symbolRegex.test(password) == false)) {
			return res.status(403).send({ 
				message: `Password must contain a symbol`, 
			})
		}

		if (passwordRequirements.number && (passwordRequirements.numberRegex.test(password) == false)) {
			return res.status(403).send({ 
				message: `Password must contain a number`, 
			})
		}

		if (passwordRequirements.capital && (passwordRequirements.capitalRegex.test(password) == false)) {
			return res.status(403).send({ 
				message: `Password must contain a capital letter`, 
			})
		}

		if (users.length === 0) {
			console.log("No users found, registering...")

			database.addUser(username, hashedPassword)

			console.log(`Registration successful`)
			return res.status(200).send({ 					
				message: `Resgistration Successful`, 
				username: username 
			})
		}
	}
	catch (err) {
		console.error('Registration Error: ', err)
		return res.status(500).json({ 
			message: "Internal Server Error" 
		});
	}
})

app.post('/save-game', async (req, res) => {
	try {
		data = req.body

		let result = await database.addGame(data.length, 1)
		let gameID = result[0].gameID

		data.forEach(player => {
			database.addScore(gameID, player);
		});

		return res.status(200).json({ 
			message: "Successully saved results" 
		});
	}
	catch (err) {
		console.error('Save Error: ', err)
		return res.status(500).json({ 
			message: "Internal Server Error, could not save scores" 
		});
	}
})

/* Server listening */
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
