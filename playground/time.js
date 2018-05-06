// Jan 1st 1970 00:00:00am

//var date = new Date();
//console.log(date.getMonth());

var moment = require('moment');

/*
var date = moment();
date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM Do YYYY'));*/

// Using MomentJS to print out time in this format
// 10:35AM, 6:01AM    12 hr clock, pad the minutes

var someTimestamp = moment().valueOf(); // same as new Date().getTime();
console.log(someTimestamp)

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));