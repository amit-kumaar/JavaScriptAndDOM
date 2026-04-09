# 🌳 The DOM — Document Object Model

> **TL;DR:** The DOM is the browser's way of turning HTML into objects that JavaScript can read and manipulate.

---

## 🤔 What is the DOM?

The DOM is an **interface** — a bridge — that sits between your HTML and JavaScript.

Here's the problem it solves:

```
HTML  ──────────────────────────────────────────────────────────
  │                                                             │
  │  HTML is just a markup language.                           │
  │  JavaScript (a programming language) can't talk to it      │
  │  directly.                                                  │
  │                                                             │
  └──────────────────────────────────────────────────────────▶ ❌ No direct connection
```

**Enter the browser.**

```
┌──────────┐        ┌─────────────────────────────┐        ┌────────────────┐
│          │        │                             │        │                │
│   HTML   │──────▶ │   Browser parses HTML and   │──────▶ │   JavaScript   │
│          │        │   builds the DOM (objects)  │        │   can now talk │
│          │        │                             │        │   to the page! │
└──────────┘        └─────────────────────────────┘        └────────────────┘
                                  ▲
                                  │
                            This is the DOM
```

> 💡 The browser says: *"Relax. I've got this."*  
> It converts HTML into a **tree of objects** — and JavaScript **loves** objects.

---

## 🌲 The DOM Tree

The browser parses HTML and builds a **family tree** of nodes and objects.

```
                        Document
                            │
                        <html>
                       /        \
                 <head>          <body>
                   │            /     \
               <title>       <h1>     <p>
                   │           │        │
              "My Page"    "Hello"   "World"
```

- The tree starts **general** (Document) and gets **more specific** (individual elements)
- **Child elements inherit** properties and methods from their parents
  - e.g. if a `<div>` has `color: red`, its children inherit that color

---

## 🔁 Tags → Nodes → Elements

The browser doesn't jump straight from HTML tags to elements. There's a process:

```
  HTML Tag          Node              Element
  ─────────        ──────            ─────────
  <p>...</p>  ──▶  Node  ──────▶    HTMLParagraphElement
                     │
                     └── inherits EventTarget Interface ✅
```

| Step | What happens |
|------|-------------|
| 1️⃣ | Browser reads HTML tags |
| 2️⃣ | Tags are converted into **Nodes** |
| 3️⃣ | Nodes are converted into **Elements** |
| 4️⃣ | Elements inherit all Node properties (including EventTarget!) |

---

## 🎯 The EventTarget Interface

Every node implements the **EventTarget Interface** — this is what allows elements to listen and respond to events (clicks, typing, scrolling, etc.).

```
        EventTarget Interface
               │
               ▼
             Node  ◀──── Comments, Text, etc. (nodes but NOT elements)
               │
               ▼
           Element
               │
               ▼
        HTMLElement
               │
        ┌──────┴──────┐
        ▼             ▼
  HTMLDivElement  HTMLParagraphElement  ...etc
```

> ✅ Every element has access to EventTarget because it **inherits** it from Node.

---

## ⚠️ Not Every Node is an Element

```html
<!-- This is a comment -->
<p>This is a paragraph</p>
```

```
DOM Tree:
  ├── Comment Node  ← is a Node ✅, but NOT an Element ❌
  └── <p> Element   ← is a Node ✅ AND an Element ✅
```

- Comments, text content, and whitespace are **nodes** but not **elements**
- Some DOM methods return **nodes** — don't be surprised if you get back something that isn't an element!

---

## 🔑 Key Takeaway

> **The DOM and its methods are provided by the BROWSER — not JavaScript.**

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│                                                         │
│   Provides: DOM, Nodes, Elements, EventTarget, etc.     │
│                                                         │
│   ┌──────────┐          ┌──────────────────────────┐   │
│   │   HTML   │ ──────▶  │  DOM (objects/tree)      │   │
│   └──────────┘          └────────────┬─────────────┘   │
│                                      │                  │
└──────────────────────────────────────┼──────────────────┘
                                       │
                                       ▼
                               ┌───────────────┐
                               │  JavaScript   │
                               │  reads &      │
                               │  manipulates  │
                               └───────────────┘
```

> 🔮 **Foreshadowing:** This matters a lot when we get to **async JavaScript** and **event listeners** — stay tuned!

---

## 📝 Quick Reference

| Term | What it is |
|------|-----------|
| **DOM** | Browser's object representation of the HTML page |
| **Node** | The base unit in the DOM tree (tags, text, comments) |
| **Element** | A node created from an HTML tag (`<p>`, `<div>`, etc.) |
| **EventTarget** | Interface that lets nodes/elements listen for events |
| **Inheritance** | Child elements get properties/methods from their parents |

---

## 🔍 Accessing the DOM — `document` & Selectors

The DOM is just a bunch of objects. The root object you can access is the **`document`** — it gives you access to every element on the page.

```js
console.log(document); // the entire DOM tree
```

### querySelector & querySelectorAll

The best way to grab elements is with CSS selectors:

| Method | Returns |
|--------|---------|
| `document.querySelector(selector)` | First matching element (or `null`) |
| `document.querySelectorAll(selector)` | A **NodeList** of all matches |

```html
<ul>
  <li class="item">Apple</li>
  <li class="item">Banana</li>
  <li class="item">Cherry</li>
</ul>
```

```js
// querySelector — first match only
const first = document.querySelector('.item');
console.log(first.textContent); // "Apple"

// querySelectorAll — all matches (NodeList, NOT an array)
const all = document.querySelectorAll('.item');

// Loop with for...of
for (const item of all) {
  console.log(item.textContent);
}

// Or use forEach (NodeList supports it)
all.forEach(item => console.log(item.textContent));

// Need a real array? Use the spread operator
const itemsArray = [...all];
console.log(Array.isArray(itemsArray)); // true
```

> ⚠️ `querySelectorAll` returns a **NodeList** — not an array. You get `forEach` and `for` loops, but not `map`, `filter`, etc. Use `[...list]` to convert.

---

## 🌲 Navigating the DOM Tree

Once you have an element, you can move **up**, **down**, and **across** the tree using properties and methods.

```
                    <section>          ← parentElement
                        │
              ┌─────────┴──────────┐
           <h2>                  <ul>  ← selected element
                              ┌───┴───┐
                            <li>    <li>  ← children
                          (first)  (last)
```

### ⬆️ Moving Up

| Property / Method | Description |
|-------------------|-------------|
| `.parentElement` | Direct parent of the element |
| `.closest(selector)` | Walks **up** the tree, returns first ancestor matching the CSS selector |

```js
const li = document.querySelector('li');

console.log(li.parentElement);        // <ul>
console.log(li.closest('section'));   // <section> (keeps going up until match)
```

> ⚠️ `.closest()` only moves **up** — it will never find elements below your selection.

### ⬇️ Moving Down

| Property | Description |
|----------|-------------|
| `.children` | HTMLCollection of all child elements |
| `.firstElementChild` | First child element |
| `.lastElementChild` | Last child element |

```js
const ul = document.querySelector('ul');

console.log(ul.children);           // HTMLCollection [li, li, li]
console.log(ul.firstElementChild);  // <li>Apple</li>
console.log(ul.lastElementChild);   // <li>Cherry</li>
```

### ↔️ Moving Across (Siblings)

| Property | Description |
|----------|-------------|
| `.nextElementSibling` | Next sibling element |
| `.previousElementSibling` | Previous sibling element |

```js
const apple = document.querySelector('li');  // first <li>

console.log(apple.nextElementSibling);      // <li>Banana</li>
console.log(apple.previousElementSibling);  // null (no sibling before it)
```

> 💡 These are all **read-only properties** — not methods. No arguments, no parentheses.

---

## 🗺️ Navigation Quick Reference

```
                        .parentElement / .closest()
                              ▲
                              │
  .previousElementSibling ◀──●──▶ .nextElementSibling
                              │
                              ▼
              .firstElementChild  .lastElementChild
                    .children (all)
```

```js
// Full example
const banana = document.querySelectorAll('li')[1]; // <li>Banana</li>

banana.parentElement;           // <ul>
banana.closest('section');      // <section>
banana.firstElementChild;       // null (no children inside <li>)
banana.nextElementSibling;      // <li>Cherry</li>
banana.previousElementSibling;  // <li>Apple</li>
```

------
> ⏭️ **Next:** [Creating Content →](../Creating_Content_with_JS/Creating_Content_with_JS.md)
