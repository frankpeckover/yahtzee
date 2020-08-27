const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
	username: { type: String, trim: true, default: '', required: true },
	score: { type: Number, default: 0, required: true }
});

const Score = mongoose.model('scores', ScoreSchema);

const addDocument = (username, score) => {
	Score.findOne({ name: username }) ? updateDocument(username, score) : Score.create({ name, score, date });
};

const getAllDocuments = () => {
	var tempArr = Score.find({}).select('name score');
	return tempArr;
};

const getDocumentByUsername = (username) => {
	return Score.find({ name: username });
};

const deleteDocument = (id) => {
	Score.findById(id)
		? Score.findByIdAndRemove(id)
		: (err) => {
				console.log(err);
			};
};

const updateDocument = (username, score) => {};

const clearDocuments = () => {
	Score.find({}).forEach((a) => {
		console.log(
			a.forEach((e) => {
				deleteDocument(e._id);
			})
		);
	});
};

exports.ScoreModel = Score;
exports.addDocument = addDocument;
exports.getAllDocuments = getAllDocuments;
exports.getDocumentByUsername = getDocumentByUsername;
exports.clearDocuments = clearDocuments;
