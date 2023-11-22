// #Nullish coalescing operator '??'

// The nullish coalescing operator is written as two question marks ??.

// As it treats null and undefined similarly, we’ll use a special term here, in this article. For brevity, we’ll say that a value is “defined” when it’s neither null nor undefined.

// Here’s the example with user assigned to a name:

let user = "John";

alert(user ?? "Anonymous"); // John (user is not null/undefined)
