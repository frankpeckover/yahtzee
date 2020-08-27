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

var getAllScores = () => {
	return Scores.find({});
};

var getScore = async (username) => {
	return await Scores.findOne({ name: username }).select('name score');
};

exports.ScoreModel = Scores;
exports.addScore = addScore;
exports.getAllScores = getAllScores;
exports.getScore = getScore;
