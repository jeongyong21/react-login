var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// Database
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017', { dbName: 'vuejs-login', useNewUrlParser: 'true' });
autoIncrement.initialize(mongoose.connection);

var db = {};
db.mongoose = mongoose;
db.autoIncrement = autoIncrement;

var mongoose = db.mongoose
var autoIncrement = db.autoIncrement

var homeSchema = mongoose.Schema({
        title: String,
        content: String,
});

homeSchema.plugin(autoIncrement.plugin, {model:'home', startAt:1});
var home = mongoose.model('home', homeSchema, 'home');

router.get('/homeContent', function (req, res, next) {

	home.find().sort({ _id: -1 })
		.then((result) => {
			res.json({
				contents: result
			});

		})
		.catch((err) => {
			res.json({ err: err });
		});
});

module.exports = router;
