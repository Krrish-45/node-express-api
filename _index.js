const util = require('./server/utils');

const dateResult = util.getMonthStartAndEndDateBaseOnGivenDate(1533753000*1000);

console.log(dateResult);
