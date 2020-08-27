const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
	name: { type: String, trim: true, default: '', required: true },
	score: { type: Number, default: 0, required: true },
	date: { type: Date, default: '' }
});

var Scores = mongoose.model('scores', ScoreSchema);

var addScore = async (name, score, date) => {
	await Scores.create({ name, score, date });
};

var getAllScores = async () => {
	return await Scores.find({}).select('_id');
};

var getScore = async (name) => {
	return await Scores.find({ name: name }).select('name score');
};

exports.ScoreModel = Scores;
exports.addScore = addScore;
exports.getAllScores = getAllScores;
exports.getScore = getScore;
