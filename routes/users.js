var express = require('express');
var router = express.Router();

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
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard', function(req, res, next) {
  var currentYear = new Date().getFullYear();

  if (currentYear % 4 ==0) months.February.days = 29;
  var firstDay = new Date(currentYear, 1, 1);
  var calender = { months: months, year:currentYear, firstDay: firstDay.getDay()};
  
  res.render(basetpl + 'dashboard', {calender: calender});
});

module.exports = router;
