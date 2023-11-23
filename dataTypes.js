// /**Iterables*/;

// #Symbol.iterator;
//on object
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]: function () {
    let index = 0;

    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};

// Using for...of loop to iterate over the iterable object
for (const item of myIterable) {
  console.log(item);
}

// String is iterable

for (let char of "test") {
  // triggers 4 times: once for each character
  alert(char); // t, then e, then s, then t
}

// array-likes

let arrayLike = {
  // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2,
};

// Array.from;
// used to convert the iterable into array

// Map

let map = new Map();

map.set("1", "str1");
map.set(1, "num");
map.set(true, "boolean");

console.log(map);

let john = { name: "John" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert(visitsCountMap.get(john));

let rina = { name: "rina" };
let mina = { name: "mina" };

let visitsCountObj = {};

visitsCountObj[mina] = 234;
visitsCountObj[rina] = 123;

console.log(visitsCountObj);

// Iteration over Map
let recipeMap = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50],
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) {
  // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}

// Object.entries: Map from Object

let obj = {
  name: "John",
  age: 30,
};

let maps = new Map(Object.entries(obj));

alert(maps.get("name"));

// Object.fromEntries: Object from Map

let prices = Object.fromEntries([
  ["banana", 1],
  ["orange", 2],
  ["meat", 4],
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2

//# SET
let set = new Set();

let ben = { name: "ben" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(ben);
set.add(pete);
set.add(mary);
set.add(ben);
set.add(mary);

// set keeps only unique values
alert(set.size); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}

// Iteration over Set
let setIteration = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
setIteration.forEach((value, valueAgain, set) => {
  alert(value);
});

// #WeakMap and WeakSet

let johnsen = { name: "johnsen" };

// the object can be accessed, johnsen is the reference to it

// overwrite the reference
johnsen = null;

// the object will be removed from memory
let sunny = { name: "sunny" };

let array = [sunny];

sunny = null; // overwrite the reference

// the object previously referenced by johnsen is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]
// The first difference between Map and WeakMap is that
//  keys must be objects, not primitive values:

// Use case: additional data
let visitsCountmap = new Map(); // map: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountmap.get(user) || 0;
  visitsCountmap.set(user, count + 1);
}
// 📁 main.js
let tina = { name: "tina" };

countUser(tina); // count his visits

// later tina leaves us
tina = null;
