//#Object the basics

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

// here its shallow copy
// Nested cloning
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
