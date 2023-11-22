// Ordered like an object
// integer properties are sorted, others appear in creation order.

let codes = {
  49: "Germany",
  41: "Switzerland",
  44: "Great Britain",
  // ..,
  1: "USA",
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}

// Cloning and merging, Object.assign

let user = {
  name: "John",
  age: 30,
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert(user.name); // still John in the original object

//##shallow copy and deep copy

// Nested cloning or  shallow copy
let users = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

alert(users.sizes.height); // 182

// Now it’s not enough to copy clone.sizes = user.sizes, because user.sizes is an object, and will be copied by reference, so clone and user will share the same sizes:

let user1 = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

let clone = Object.assign({}, user1);

alert(user1.sizes === clone.sizes); // true, same object

// user and clone share sizes
user1.sizes.width = 60; // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one

// here comes deep copy
// structuredClone
// The call structuredClone(object) clones the object with all nested properties.

// Here’s how we can use it in our example:

let user2 = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

let clone = structuredClone(user2);

alert(user2.sizes === clone.sizes); // false, different objects

// user and clone are totally unrelated now
user2.sizes.width = 60; // change a property from one place
alert(clone.sizes.width); //

//Object methods, "this"

let user3 = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    alert(this.name);
  },
};

user3.sayHi(); // John

// Here during the execution of user.sayHi(), the value of this will be user.

// Technically, it’s also possible to access the object without this, by referencing it via the outer variable:

let user4 = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user4.name); // "user" instead of "this"
  },
};

// …But such code is unreliable. If we decide to copy user to another variable, e.g. admin = user and overwrite user with something else, then it will access the wrong object.

// That’s demonstrated below:

let user5 = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user5.name); // leads to an error
  },
};

let admin = user5;
user5 = null; // overwrite to make things obvious

admin.sayHi(); // TypeError: Cannot read property 'name' of null
// If we used this.name instead of user.name inside the alert, then the code would work.

// #Constructor, operator "new"

// Constructor function

function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user6 = new User("Jack");

alert(user6.name); // Jack
alert(user6.isAdmin); // false

// Inside a function, we can check whether it was called with
// new or without it, using a special new.target property.

// Methods in constructor
function User(name) {
  this.name = name;

  this.sayHi = function () {
    alert("My name is: " + this.name);
  };
}

let john = new User("John");

john.sayHi(); // My name is: John

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/

//#Symbols

let id = Symbol();

// For instance, here are two symbols with the same description – they are not equal
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

// Symbols in an object literal
let ids = Symbol("id");

let user7 = {
  name: "John",
  [id]: 123, // not "id": 123
};

// Symbol.keyFor
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id

// The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol.
// So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to find
//  it and returns undefined.

let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert(Symbol.keyFor(globalSymbol)); // name, global symbol
alert(Symbol.keyFor(localSymbol)); // undefined, not global

alert(localSymbol.description); // name

// Symbol.toPrimitive

// obj[Symbol.toPrimitive] = function(hint) {
// here goes the code to convert this object to a primitive
// it must return a primitive value
// hint = one of "string", "number", "default"
// }

//  user object implements it:
let user8 = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  },
};

// conversions demo:
alert(user8); // hint: string -> {name: "John"}
alert(+user8); // hint: number -> 1000
alert(user8 + 500); // hint: default -> 1500
