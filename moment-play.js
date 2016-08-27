var moment = require('moment');
var now = moment();
// console.log(now.format());
// console.log(now.format('X'));		// X to show unix time stamps in seconds
// console.log(now.format('x'));		//x to show time stamps in miliseconds
// console.log(now.valueOf());
var timestamp = 1472317572683;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format('h:mma'));
// console.log(now.format('MMM Do YYYY h:mma'));