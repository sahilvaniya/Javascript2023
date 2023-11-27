// Class basic syntax

// The basic syntax is:

class MyClass {
  // class methods
  constructor() {}
  method1() {}
  method2() {}
  method3() {}
}

class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }
}

// Usage:
let user = new User("John");
user.sayHi();

//class is same like function

class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

// proof: User is a function
alert(typeof User); // function

class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method

// rewriting class admin in pure functions

// 1. Create constructor function
function Admin(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
Admin.prototype.sayHi = function () {
  alert(this.name);
};

// Usage:
let admin = new Admin("John");
admin.sayHi();

// Class Expression

let User = class {
  sayHi() {
    alert("Hello");
  }
};

let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass name isn't visible outside of the class

// Getters / setters;

class Users {
  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}

let users = new Users("John");
alert(users.name); // John

users = new Users(""); // Name is too short.

// Computed names […]

class User {
  ["say" + "Hi"]() {
    alert("Hello");
  }
}

new User().sayHi();

// Class fields

class User {
  name = "John";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!

// So, we just write " = " in the declaration, and that’s it.

// The important difference of class fields is that they are
// set on individual objects, not User.prototype:

alert(user.name); // John
alert(User.prototype.name); // undefined

// We can also assign values using more complex expressions and function calls:

class User {
  name = prompt("Name, please?", "John");
}

let demoUser = new User();
alert(demoUser.name); // John

// Making bound methods with class fields

//  if an object method is passed around and called in another context,
//   this won’t be a reference to its object any more

class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined

// here are two approaches to fixing it, as discussed in the chapter Function binding:

// Pass a wrapper-function, such as setTimeout(() => btn.click(), 1000).
// Bind the method to object, e.g. in the constructor

class Btn {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  };
}

let btn = new Btn("hello");

setTimeout(btn.click, 1000); // hello
