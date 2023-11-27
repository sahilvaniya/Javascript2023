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

let tina = { name: "tina" };

countUser(tina); // count his visits

// later tina leaves us
tina = null;

// Use case: caching

let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// Now we use process() in another file:

let object = {
  /* let's say we have an object */
};

let result1 = process(object); // calculated

// ...later, from another place of the code...
let result2 = process(object); // remembered result taken from cache

// ...later, when the object is not needed any more:
object = null;

alert(cache.size);

//# WeakSet;
// It is analogous to Set, but we may only add objects to WeakSet (not primitives).

let visitedSet = new WeakSet();

let alice = { name: "alice" };
let bob = { name: "bob" };
let marry = { name: "marry" };

visitedSet.add(alice); // alice visited us
visitedSet.add(bob); // Then bob
visitedSet.add(alice); // alice again

// visitedSet has 2 users now

// check if alice visited?
console.log(visitedSet.has(alice)); // true

// check if marry visited?
console.log(visitedSet.has(marry)); // false

alice = null;

//# Object.keys, values, entries;
let demoObj = {
  name: "John",
  age: 30,
};

Object.keys(demoObj);

// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}

// Transforming objects

let price = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  Object.entries(price).map((entry) => [entry[0], entry[1] * 2])
);

alert(doublePrices.meat); // 8

// Nested Destructuring
let options = {
  size: {
    width: 200,
    height: 200,
  },
  items: ["cake", "donut"],
  extra: true,
};

let {
  size: { width, height },
  items: [item1, item2],
} = options;

console.log(item1);

// Smart function parameters

// we pass object to function
let option = {
  title: "My menu",
  items: ["Item1", "Item2"],
};

// ...and it immediately expands it to variables
function showMenu({
  title = "Untitled",
  width = 200,
  height = 100,
  items = [],
}) {
  // title, items – taken from option,
  // width, height – defaults used
  alert(`${title} ${width} ${height}`); // My Menu 200 100
  alert(items); // Item1, Item2
}

showMenu(option);

// We can also use more complex destructuring with nested objects and colon mappings:
let optionOne = {
  title: "My menu",
  items: ["Item1", "Item2"],
};

function showMenu({
  title = "Untitled",
  width: w = 100, // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2], // items first element goes to item1, second to item2
}) {
  alert(`${title} ${w} ${h}`); // My Menu 100 200
  alert(item1); // Item1
  alert(item2); // Item2
}

showMenu(optionOne);

//#JSON methods,to JSON

// Excluding and transforming: replacer

// The full syntax of JSON.stringify is:

// let json = JSON.stringify(value[, replacer, space])

// If we pass an array of properties to it, only these properties will be encoded.
// hence we pass all of the property
let meetup = {
  title: "conference",
  participants: [{ name: "john" }, { name: "Alice" }],
  place: room,
};

room.occupiedBy = meetup;

console.log(
  JSON.stringify(meetup, ["title", "participants", "place", "name", "number"])
);

// with replacer function

let rooms = {
  number: 23,
};

let meetups = {
  title: "Conference",
  participants: [{ name: "John" }, { name: "Alice" }],
  place: room, // meetups references rooms
};

rooms.occupiedBy = meetups; // rooms references meetups

alert(
  JSON.stringify(meetups, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
);

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/

// Formatting: space;

let data = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
};

alert(JSON.stringify(data, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

// Custom “toJSON”
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  toJSON: function () {
    // Customize the JSON representation
    return {
      fullName: `${this.firstName} ${this.lastName}`,
      customAge: this.age,
    };
  },
};

const jsonString = JSON.stringify(person);

console.log(jsonString);

// #JSON.parse;

let value = JSON.parse(str, [reviver]);

// Using reviver

// let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

// let meetup = JSON.parse(str);

// alert( meetup.date.getDate() ); // Error!

// now lets use with reviver

// let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

// let meetup = JSON.parse(str, function (key, value) {
//   if (key == "date") return new Date(value);
//   return value;
// });

// alert(meetup.date.getDate());
