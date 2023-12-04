function isArmstrongNumber(number) {
  const digits = String(number).split("").map(Number);
  const numDigits = digits.length;

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    sum += Math.pow(digits[i], numDigits);
  }

  return sum === number;
}

const numberToCheck = 372;
const isArmstrong = isArmstrongNumber(numberToCheck);

if (isArmstrong) {
  console.log(`${numberToCheck} is an Armstrong number.`);
} else {
  console.log(`${numberToCheck} is not an Armstrong number.`);
}
