/*Promises*/

// #callbacks
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
  (script) => {
    alert(`Cool, the script ${script.src} is loaded`);
    alert(_); // _ is a function declared in the loaded script
  }
);

// Callback in callback;

// The natural solution would be to put the second loadScript
// call inside the callback, like this:

loadScript("/my/script.js", function (script) {
  alert(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript("/my/script2.js", function (script) {
    alert(`Cool, the second script is loaded`);
  });
});

// Handling errors

function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// It calls callback(null, script) for successful load and callback(error) otherwise.

loadScript("/my/script.js", function (error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});

// #Promises

let promise = new Promise(function (resolve, reject) {
  // executor (the producing code, "singer")
});

// Here’s an example of a promise constructor and a simple executor
// function with “producing code” that takes time

let promiseOne = new Promise(function (resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
});

// And now an example of the executor rejecting the promise with an error:

let promiseTwo = new Promise(function (resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// Consumers: then, catch

// then;
promise.then(
  function (result) {
    /* handle a successful result */
  },
  function (error) {
    /* handle an error */
  }
);

// For instance, here’s a reaction to a successfully resolved promise:
let promiseThree = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promiseThree.then(
  (result) => alert(result), // shows "done!" after 1 second
  (error) => alert(error) // doesn't run
);

let promiseFour = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promiseFour.then(
  (result) => alert(result), // doesn't run
  (error) => alert(error) // shows "Error: Whoops!" after 1 second
);

// catch

let promiseFive = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promiseFive.catch(alert); // shows "Error: Whoops!" after 1 second

// Cleanup: finally

new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => "")
  // so the loading indicator is always stopped before we go on
  .then(
    (result) => "result msg",
    (err) => "error msg"
  );

//   A finally handler “passes through” the result or error to the next suitable handler.
// For instance, here the result is passed through finally to then:

new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => alert("Promise ready")) // triggers first
  .then((result) => alert(result)); // <-- .then shows "value"

// Example: loadScript;

function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// using Promises.

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

//# Error handling with promises

fetch("https://no-such-server.blabla") // rejects
  .then((response) => response.json())
  .catch((err) => alert(err)); // TypeError: failed to fetch (the text may vary)

// The easiest way to catch all errors is to append .catch to the end of chain:

fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  .catch((error) => alert(error.message));

// Implicit try…catch

// The code of a promise executor and promise handlers has an "invisible try..catch" around it.
// If an exception happens, it gets caught and treated as a rejection.

// For instance, this code:

new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!

// Rethrowing;

// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    alert("The error is handled, continue normally");
  })
  .then(() => alert("Next successful handler runs"));

// In the example below we see the other situation with .catch.

// the execution: catch -> catch
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    // (*)

    if (error instanceof URIError) {
      // handle it
    } else {
      alert("Can't handle such error");

      throw error; // throwing this or another error jumps to the next catch
    }
  })
  .then(function () {
    /* doesn't run here */
  })
  .catch((error) => {
    // (**)

    alert(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way
  });

// Unhandled rejections

new Promise(function () {
  noSuchFunction(); // Error here (no such function)
}).then(() => {
  // successful promise handlers, one or more
}); // without .catch at the end!

// In the browser we can catch such errors using the event unhandledrejection:

window.addEventListener("unhandledrejection", function (event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function () {
  throw new Error("Whoops!");
}); // no catch to handle the error

// #Promise API

// 1)Promise.all

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) =>
  responses.forEach((response) => alert(`${response.url}: ${response.status}`))
);

// another bigger example

let names = ["iliakan", "remy", "jeresig"];

let data = names.map((name) => fetch(`https://api.github.com/users/${name}`));

Promise.all(data)
  .then((responses) => {
    // all responses are resolved successfully
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then((users) => users.forEach((user) => alert(user.name)));

// if any of the promises got reject then ,we get error

Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert); // Error: Whoops!

// 2)Promise.allSettled;

let apiData = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(apiData.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      alert(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      alert(`${urls[num]}: ${result.reason}`);
    }
  });
});

// Polyfill

// when browser doesnt support Promise.allSettled, it’s easy to polyfill:

if (!Promise.allSettled) {
  const rejectHandler = (reason) => ({ status: "rejected", reason });

  const resolveHandler = (value) => ({ status: "fulfilled", value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map((p) =>
      Promise.resolve(p).then(resolveHandler, rejectHandler)
    );
    return Promise.all(convertedPromises);
  };
}

// 3)Promise.race;

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1

// 4)Promise.any
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1

// Here’s an example when all promises fail:

Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});

//# Promise.resolve / reject;

// Promise.resolve;

let promiseResolve = new Promise((resolve) => resolve(value));

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}

// Promise.reject;
let promiseReject = new Promise((resolve, reject) => reject(error));

// #Promisification;

function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})
// -----------------------------------------------------
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)

// In practice we may need to promisify more than one function, so it makes sense to use a helper.
// We’ll call it promisify(f): it accepts a to-promisify function f and returns a wrapper function.

function promisify(f) {
  return function (...args) {
    // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // our custom callback for f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
}

// usage:
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);

// --------------------------------------------------------------
// But what if the original f expects a callback with more arguments callback(err, res1, res2, ...)?
// We can improve our helper. Let’s make a more advanced version of promisify.

// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
// f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ...);
