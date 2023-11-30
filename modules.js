// **Modules*/

// What is a module?

// For instance, if we have a file sayHi.js exporting a function:

// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

//another way

// 📁 main.js
import { sayHi } from "./sayHi.js";

alert(sayHi); // function...
sayHi("John"); // Hello, John!

// As modules support special keywords and features, we must tell the browser
//  that a script should be treated as a module,
//  by using the attribute <script type="module">.

// <!doctype html>
<script type="module">
  import {sayHi} from './say.js'; document.body.innerHTML = sayHi('John');
</script>;

// #Core module features

// Always “use strict”

<script type="module">a = 5; // error</script>;

//# Module-level scope

// user.js
// let user = "John";

//hello.js
// alert(user); // no such variable (each module has independent variables)

// index.html;
// <!doctype html>
// <script type="module" src="user.js"></script>
// <script type="module" src="hello.js"></script>

// This is the correct variant:

// user.js
// export let user = "John";

// hello.js
// import {user} from './user.js';

// document.body.innerHTML = user; // John

// index.html
// <!doctype html>
// <script type="module" src="hello.js"></script>

{
  /* <script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  alert(user); // Error: user is not defined
</script> */
}

//# import.meta;

{
  /* <script type="module">
  alert(import.meta.url); // script URL // for an inline script - the URL of the
  current HTML-page
</script>; */
}

//# In a module, “this” is undefined

{
  /* <script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script> */
}

// Module scripts are deferred

{
  /* <script type="module">
  alert(typeof button); // object: the script can 'see' the button below
  // as modules are deferred, the script runs after the whole page is loaded
</script> */
}

// Compare to regular script below:

// <script>
//   alert(typeof button); // button is undefined, the script can't see elements below
//   // regular scripts run immediately, before the rest of the page is processed
// </script>

// <button id="button">Button</button>

//# Async works on inline scripts

// <!-- all dependencies are fetched (analytics.js), and the script runs -->
// <!-- doesn't wait for the document or other <script> tags -->
// <script async type="module">
//   import {counter} from './analytics.js';

//   counter.count();
// </script>

// #External scripts

// <!-- the script my.js is fetched and executed only once -->
// <script type="module" src="my.js"></script>
// <script type="module" src="my.js"></script>

// <!-- another-site.com must supply Access-Control-Allow-Origin -->
// <!-- otherwise, the script won't execute -->
// <script type="module" src="http://another-site.com/their.js"></script>

//# Compatibility, “nomodule”
{
  /* <script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script> */
}

//**Dynamic imports*/

// import ... from getModuleName(); // Error, only from "string" is allowed

// Second, we can’t import conditionally or at run-time:

// if(...) {
//   import ...; // Error, not allowed!
// }

// {
//   import ...; // Error, we can't put import in any block
// }

// let modulePath = prompt("Which module to load?");

// import(modulePath)
//   .then(obj => <module object>)
//   .catch(err => <loading error, e.g. if no such module>)

// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}

// …Then dynamic import can be like this:

let { hi, bye } = await import("./say.js");

hi();
bye();

// if say.js has the default export:

// 📁 say.js
export default function () {
  alert("Module loaded (export default)!");
}

let obj = await import("./say.js");
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
