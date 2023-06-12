const checkLength = function (str, maxLength) {
  return str.length <= maxLength;
};


const checkPalindrome = function (str) {
  str = str.replace(/\s+/g, '').toLowerCase();
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return newStr === str;
};


const createNumber = function(str) {
  const string = str.toString();
  const number = string.match(/\d+/g).toString().replaceAll(',', '');
  return parseInt(number, 10);
};
