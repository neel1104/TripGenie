//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var username = 'tripgenie';
var password = 'tripgeniepassword';
var database = 'tripgenie';

var mongoDB = 'mongodb://' + username + ':' + password + '@tripgenie-shard-00-00-7vlpa.mongodb.net:27017,tripgenie-shard-00-01-7vlpa.mongodb.net:27017,tripgenie-shard-00-02-7vlpa.mongodb.net:27017/' + database + '?ssl=true&replicaSet=TripGenie-shard-0&authSource=admin';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = mongoose;