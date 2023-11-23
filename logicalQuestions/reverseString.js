//function to reverse string

function reverseString(str) {
  if (typeof str === "string") {
    return str
      .split(" ")
      .map((word) => (word.length > 5 ? reverseWord(word) : word))
      .join(" ");
  }
  return "not an valid type";
}

function reverseWord(word) {
  let reversedWord = "";
  for (let i = word.length - 1; i >= 0; i--) {
    reversedWord += word[i];
  }
  return reversedWord;
}

const string = 289128;
const reverse = reverseString(string);
console.log(reverse);
