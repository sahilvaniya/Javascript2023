// Write a Code for the below requirement

// Sample Inputs & Outputs

// Sample Input : List1 = [1,2,3,4,5,6,7,8,9,10] and Split_Value = 3 Expected Output is (Split Like this) [[1,2,3],[4,5,6],[7,8,9],[10]]

// Sample Input : List1 = [1,2,3,4,5,6,7,8,9,10]and Split_Value = 5 Expected Output is (Split Like this) [[1,2,3,4,5],[6,7,8,9,10]]

function splitFunc(inputList, splitValue) {
  let result = [];
  let currentSubarray = [];

  inputList.forEach((element, index) => {
    currentSubarray.push(element);

    if (
      currentSubarray.length === splitValue ||
      index === inputList.length - 1
    ) {
      result.push([...currentSubarray]);
      currentSubarray = [];
    }
  });
}

const valueToSplit = 3;
let inputList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const output = splitFunc(inputList, valueToSplit);
