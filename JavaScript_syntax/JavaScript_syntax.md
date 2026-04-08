# 🧠 JavaScript Syntax

> Master modern JavaScript syntax used in real front-end development.

---

## 📚 Topics

| # | Topic |
|---|-------|
| 1 | `const` & `let` |
| 2 | Destructuring |
| 3 | Template Literals |
| 4 | Arrow Functions |
| 5 | Loops |
| 6 | Spread Operator |
| 7 | Rest Operator |
| 8 | Ternary Operator |
| 9 | Nullish Coalescing |

---

## 1. `const` & `let`

> **Default to `const`.** Use `let` only when you need to reassign.

```js
// ✅ const — value won't be reassigned
const name = "Alice";
// name = "Bob"; ❌ TypeError: Assignment to constant variable

// ✅ let — value will change
let score = 0;
score = 10; // ✅ works fine

// 💡 const with objects/arrays — you CAN modify contents
const user = { name: "Alice", age: 25 };
user.age = 26;         // ✅ modifying a property is fine
// user = {};          // ❌ reassigning the variable is not

const colors = ["red", "green"];
colors.push("blue");   // ✅ modifying the array is fine
// colors = [];        // ❌ reassigning is not
```

---

## 2. Destructuring

> Unpack values from arrays or objects into variables — saves time and lines of code.

```js
// 🔹 Object Destructuring
const person = { name: "Alice", age: 25, city: "NYC" };

const { name, age } = person;
console.log(name); // "Alice"
console.log(age);  // 25

// Rename while destructuring
const { name: fullName } = person;
console.log(fullName); // "Alice"

// Default values
const { country = "USA" } = person;
console.log(country); // "USA"

// 🔹 Array Destructuring
const scores = [95, 80, 70];

const [first, second] = scores;
console.log(first);  // 95
console.log(second); // 80

// Skip elements
const [, , third] = scores;
console.log(third); // 70

// 🔹 In function parameters
function greet({ name, age }) {
  console.log(`Hi ${name}, you are ${age}`);
}
greet(person); // "Hi Alice, you are 25"
```

---

## 3. Template Literals

> Use backticks `` ` `` instead of quotes. Embed expressions with `${}`.

```js
const name = "Alice";
const score = 95;

// ❌ Old way
console.log("Hello " + name + ", your score is " + score);

// ✅ Template literal
console.log(`Hello ${name}, your score is ${score}`);

// 💡 Expressions inside ${}
const isPassing = score >= 60;
console.log(`Result: ${isPassing ? "Pass" : "Fail"}`); // "Result: Pass"

// 💡 Multi-line strings
const message = `
  Name: ${name}
  Score: ${score}
  Status: ${isPassing ? "Pass" : "Fail"}
`;
console.log(message);
```

---

## 4. Arrow Functions

> A shorter, cleaner way to write functions. Used everywhere in front-end frameworks.

```js
// Regular function
function add(a, b) {
  return a + b;
}

// ✅ Arrow function
const add = (a, b) => a + b;

// Single parameter — no parentheses needed
const double = n => n * 2;

// No parameters
const greet = () => "Hello!";

// Multi-line — use curly braces and return
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// 💡 Common use: with array methods
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]
```

---

## 5. Loops

> Use `forEach` or `map` for arrays. Use `for...of` when you need more control.

```js
const fruits = ["apple", "banana", "cherry"];

// 🔹 forEach — runs a function for each item (no return value)
fruits.forEach(fruit => console.log(fruit));

// 🔹 map — transforms each item, returns a NEW array
const upper = fruits.map(fruit => fruit.toUpperCase());
console.log(upper); // ["APPLE", "BANANA", "CHERRY"]

// 🔹 for...of — great when you need break/continue
for (const fruit of fruits) {
  if (fruit === "banana") break;
  console.log(fruit); // "apple"
}

// 💡 map vs forEach
// forEach → use when you just want to DO something with each item
// map     → use when you want to TRANSFORM items into a new array
```

---

## 6. Spread Operator `...`

> Spreads an array or object into individual elements.

```js
// 🔹 Spread array into another array
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 🔹 Copy an array (not a reference)
const copy = [...a];
copy.push(99);
console.log(a);    // [1, 2, 3] — original unchanged
console.log(copy); // [1, 2, 3, 99]

// 🔹 Spread object into another object
const defaults = { theme: "light", lang: "en" };
const userPrefs = { lang: "fr", fontSize: 14 };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: "light", lang: "fr", fontSize: 14 }

// 🔹 Pass array as function arguments
const nums = [3, 1, 4, 1, 5];
console.log(Math.max(...nums)); // 5
```

---

## 7. Rest Operator `...`

> Collects multiple elements into a single array or object. Opposite of spread.

```js
// 🔹 In function parameters — collect extra args
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 🔹 In destructuring — collect the "rest"
const [first, second, ...remaining] = [10, 20, 30, 40, 50];
console.log(first);     // 10
console.log(second);    // 20
console.log(remaining); // [30, 40, 50]

// 🔹 With objects
const { name, ...otherInfo } = { name: "Alice", age: 25, city: "NYC" };
console.log(name);      // "Alice"
console.log(otherInfo); // { age: 25, city: "NYC" }
```

---

## 8. Ternary Operator

> A one-line `if/else`. Essential for conditional rendering in front-end frameworks.

```js
// Syntax: condition ? valueIfTrue : valueIfFalse

const age = 20;

// ❌ Verbose
let status;
if (age >= 18) {
  status = "Adult";
} else {
  status = "Minor";
}

// ✅ Ternary
const status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// 💡 Inside template literals
const score = 72;
console.log(`You ${score >= 60 ? "passed" : "failed"} the test.`);

// 💡 Nested ternary (use sparingly — keep it readable)
const grade = score >= 90 ? "A" : score >= 70 ? "B" : "C";
console.log(grade); // "B"
```

---

## 9. Nullish Coalescing `??`

> Returns the right-hand value only when the left is `null` or `undefined`. Perfect for default values.

```js
// 🔹 Basic usage
const username = null;
const display = username ?? "Guest";
console.log(display); // "Guest"

// 🔹 vs OR operator ||
// || triggers on ANY falsy value (0, "", false, null, undefined)
// ?? triggers ONLY on null or undefined

const score = 0;
console.log(score || 100);  // 100 ❌ — 0 is falsy, so it falls back
console.log(score ?? 100);  // 0  ✅ — 0 is not null/undefined

// 🔹 Real-world: API data with missing fields
const apiResponse = { name: "Alice", age: null };
const age = apiResponse.age ?? "Age not provided";
console.log(age); // "Age not provided"

// 🔹 Optional chaining + nullish coalescing (powerful combo)
const user = null;
const city = user?.address?.city ?? "Unknown city";
console.log(city); // "Unknown city"
```

---

## 🔁 Quick Reference

| Concept | When to use |
|---------|-------------|
| `const` | Default for all variables |
| `let` | Only when reassigning |
| Destructuring | Extract values from objects/arrays |
| Template literals | Any string with dynamic content |
| Arrow functions | Callbacks, array methods, short functions |
| `map` / `forEach` | Looping over arrays |
| Spread `...` | Copy/merge arrays & objects |
| Rest `...` | Collect remaining items |
| Ternary `? :` | Simple if/else, conditional rendering |
| `??` | Default values for null/undefined |

---

> 💡 **Read → Try → Break → Fix → Repeat!**
