const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
	username: { type: String, trim: true, default: '', required: true },
	password: { type: String, trim: true, required: true },
	score: { type: Number, default: 0, required: true }
});

const Score = mongoose.model('scores', ScoreSchema);

exports.ScoreModel = Score;
