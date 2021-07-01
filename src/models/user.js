/*---------------------------- importing packages ----------------------------*/
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/*---------------------------- creating schema ----------------------------*/
const userSchema = mongoose.Schema({
	username: { type: String, require: true, unique: true },
	email: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	age: { type: Number },
	gender: { type: String },
});

/*---------------------------- creating the model in the DB ----------------------------*/
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
