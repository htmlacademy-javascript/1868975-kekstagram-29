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
