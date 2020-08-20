const express = require('express');
const app = express();
const path = require('path');

const PORT = 4000;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.listen(PORT, '0.0.0.0', () => {
	console.log(`server listening on port ${PORT}`);
});
