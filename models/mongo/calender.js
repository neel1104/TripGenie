var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var calenderSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, required:true},
    is_holiday: Boolean
});

calenderSchema
    .virtual('json.date')
    .get(function(){
        var date = new Date(this.date);
        return {day : date.getDate(), month: date.getMonth(), year: date.getFullYear()};
    })

// Compile model from schema
var calenderSchema = mongoose.model('Calender', calenderSchema);

module.exports = calenderSchema;