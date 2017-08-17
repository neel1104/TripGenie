var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Define schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String},
    password: {type:String},
});

userSchema.plugin(passportLocalMongoose);

// Compile model from schema
var userModel = mongoose.model('User', userSchema );

module.exports = userModel;