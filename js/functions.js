function calculateLetter(word, length) {
  if (word.length >= length) {
    return (true);
  } else {
    return (false);
  }
}

console.log(calculateLetter('rrrrr', 5));


function checkPalindrome(word) {
  const polyString = word.replaceAll(' ', '').toLowerCase();
  const arrString = polyString.split('').reverse().join('');
  if (polyString === arrString) {
    return (true);
  } else {
    return (false);
  }
}

console.log(checkPalindrome('1234321'));


function getDigit(phrase) {
  const numString = phrase.replace(/[^0-9]/g, '');
  if (numString) {
    return (numString);
  } else {
    return (NaN);
  }
}

console.log(getDigit('-1 кефира 0.5 батона'));
