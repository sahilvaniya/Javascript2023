function charactersOccurrence(inputStr) {
  const charCount = {};
  const highestCount = { characters: [], count: 0 };

  const str = inputStr.toLowerCase().trim();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char in charCount) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }

    if (charCount[char] === highestCount.count) {
      highestCount.characters.push(char);
    } else if (charCount[char] > highestCount.count) {
      highestCount.characters = [char];
      highestCount.count = charCount[char];
    }
  }

  return {
    charCount: charCount,
    highestOccurrence: highestCount,
  };
}

const str = "Anuragg  ";
const result = charactersOccurrence(str);
console.log(result);
