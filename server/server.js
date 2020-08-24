const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = 4000;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
