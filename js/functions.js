const checkLength = function (str, maxLength) {
  return str.length <= maxLength;
};
checkLength('проверяемая строка', 20);


const checkPalindrome = function (str) {
  str = str.replace(/\s+/g, '').toLowerCase();
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return newStr === str;
};
checkPalindrome('Лёша на полке клопа нашёл ');

const createNumber = function(str) {
  const string = str.toString();
  const number = string.match(/\d+/g);
  if (number === null) {
    return NaN;
  } else {
    return Number(number.toString().replaceAll(',', ''));
  }
};
createNumber('1 кефир, 0.5 батона');

const meetingCheck = (workDayStart, workDayEnd, meetingStart, meetingDuration) => {
  const timeDivision = (time) => {
    const hoursMinutes = time.split(':');
    return hoursMinutes;
  };
  const convertToMinutes = (hoursMinutes) => {
    const minutes = parseInt(hoursMinutes[0], 10) * 60 + parseInt(hoursMinutes[1], 10);
    return minutes;
  };
  const meetingEnd = convertToMinutes(timeDivision(meetingStart)) + meetingDuration;
  if (convertToMinutes(timeDivision(workDayStart)) > convertToMinutes(timeDivision(meetingStart)) || convertToMinutes(timeDivision(workDayEnd)) < meetingEnd) {
    return false;
  } else {
    return true;
  }
};

meetingCheck('08:00', '17:30', '14:00', 90);
meetingCheck('8:0', '10:0', '8:0', 120);
meetingCheck('08:00', '14:30', '14:00', 90);
meetingCheck('14:00', '17:30', '08:0', 90);
meetingCheck('8:00', '17:30', '08:00', 900);
