const moment = require('moment');

const getIndianCurrentUnixDateTime = () => {
  // This is Indian current time
  return (
    new Date(
      moment()
        .utcOffset('+05:30')
        .format()
    ).getTime() / 1000
  );
};

const getIndiaMidnightDateTime = () => {
  const indiaDate = new Date(
    moment()
      .utcOffset('+05:30')
      .startOf('day')
      .format()
  );
  return indiaDate.getTime() / 1000;
};

const getCurrentEndDateTime = () => {
  const indiaDate = new Date(
    moment()
      .utcOffset('+05:30')
      .endOf('day')
      .format()
  );
  return indiaDate.getTime() / 1000;
};

const getUnixDataTime = (year, month, date) => {
  const newDate = new Date(`"${year}-${month}-${date}"`);

  const indiaDate = new Date( // moment(`"${year}-${month}-${date}"`)
    moment(newDate)
      .utcOffset('+05:30')
      .startOf('day')
      .format()
  );
  return indiaDate.getTime() / 1000;
};

const getMonthStartAndEndDateBaseOnGivenDate = givenDate => {
  const startMonthDate =
    new Date(
      moment(givenDate)
        .utcOffset('+05:30')
        .startOf('month')
        .format()
    ).getTime() / 1000;

  const endMonthDate =
    new Date(
      moment(givenDate)
        .utcOffset('+05:30')
        .endOf('month')
        .format()
    ).getTime() / 1000;

  return { startMonthDate: startMonthDate, endMonthDate: endMonthDate };
};

const unixToNormalDate = (unixDate) => {
  let date = moment
  .unix(unixDate)
  .tz('Asia/Kolkata')
  .format('MM-DD-YYYY HH:mm:ss');
  return stringToDate(date)

};

const stringToDate = function(dateString) {
  return new Date(dateString);
};


const getWeekStartDateAndEndDate = () => {

let firstDay = new Date();
let weekStartDate = firstDay.getDate() - firstDay.getDay()
const indiaWeekStartDate = new Date(
  moment(firstDay.setDate(weekStartDate))
    .utcOffset('+05:30')
    .startOf('day')
    .format()
);
const indiaWeekEndDate = new Date(
  moment(firstDay.setDate(weekStartDate+6))
    .utcOffset('+05:30')
    .endOf('day')
    .format()
);

return{
  weekStartDate : indiaWeekStartDate.getTime() / 1000,
  weekEndDate : indiaWeekEndDate.getTime() / 1000
} 
}


const random5DigitNumber = () => {
let min = Math.ceil(10000);
let max = Math.floor(99999);
let pass=Math.random();
return Math.floor(pass * (max - min)) + min;
}

module.exports = {
  getIndianCurrentUnixDateTime,
  getIndiaMidnightDateTime,
  getCurrentEndDateTime,
  getUnixDataTime,
  getMonthStartAndEndDateBaseOnGivenDate,
  unixToNormalDate,
  getWeekStartDateAndEndDate,
  random5DigitNumber
};
