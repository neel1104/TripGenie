var express = require('express');
var router = express.Router();
var Calender = require('../models/mongo/calender');

var basetpl = 'users/';
var months = {
  "January":{days:31}, 
  "February":{days:28},
  "March":{days:31},
  "April":{days:30},
  "May":{days:31},
  "June":{days:30},
  "July":{days:31},
  "August":{days:31},
  "September":{days:30}, 
  "October":{days:31}, 
  "November":{days:30}, 
  "December":{days:31}
};
var days = {
  Sunday:0,
  Monday:1,
  Tuesday:2,
  Wednesday:3,
  Thursday:4,
  Friday:5,
  Saturday:6,
}

router.all(/.*/, function(req, res, next){
  if (req.user)   next();
  else res.redirect('/');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/calendar', function(req, res, next) {
  var holidays = [];
  Calender.find({user:req.user}, function(err, result){
    
    result.forEach(function(date) {
      holidays.push(date.json.date);
    }, this);

    var currentYear = new Date().getFullYear();

    if (currentYear % 4 ==0) months.February.days = 29;
    var firstDay = new Date(currentYear, 1, 1);
    var calender = { months: months, year:currentYear, firstDay: firstDay.getDay()};
    
    res.render(basetpl + 'dashboard', {calender: calender, user:req.user, holidays:JSON.stringify(holidays)});
  });
});


router.post('/calendar', function(req, res, next) {
  var holidays = req.body.data;

  holidays.forEach(function(holiday) {
    var calObj = new Calender();
    calObj.user = req.user;
    calObj.date = new Date(holiday.year, holiday.month, holiday.day);
    calObj.save(function (err){
      console.log(err);
    });
  }, this);

  res.send('saved');
});

module.exports = router;
