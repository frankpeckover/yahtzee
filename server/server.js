const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = 4000;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
