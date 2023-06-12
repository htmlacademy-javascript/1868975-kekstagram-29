let checkLength = function (str, maxLength) {
  return str.length <= maxLength;
};


let checkPalindrome = function (str) {
  str = str.replace(/\s+/g, '').toLowerCase();
  let newStr = '';
  for (let i = str.length-1; i >= 0; i--) {
    newStr += str[i];
  };
  return newStr === str;
};


let createNumber = function(str) {
  let string = str.toString();
  let number = string.match(/\d+/g).toString().replaceAll(',', '');
  return parseInt(number, 10);
};
