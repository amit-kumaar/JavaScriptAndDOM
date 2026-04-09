# ✏️ Creating Content with JavaScript

> We've done the heavy lifting — JavaScript syntax ✅, DOM selection ✅. Now the fun begins.  
> This is where the internet gets **interactive**.

---

## 🗺️ What We'll Cover

```
[1] Variables are your friends
    [2] Updating Text Content
        [3] Updating HTML Content
            [4] Updating Attributes
                [5] Updating Styles
                    [6] Creating & Appending New Elements
```

---

## 1. 🧠 Variables Are Your Friends

Before we change anything, let's talk about a habit you **must** build.

When you select a DOM element, **store it in a variable**.

```js
// ❌ Don't do this — runs querySelector every single time
document.querySelector('#title').textContent = 'Hello';
document.querySelector('#title').style.color = 'red';
document.querySelector('#title').classList.add('active');

// ✅ Do this — find it once, use it as many times as you need
const title = document.querySelector('#title');
title.textContent = 'Hello';
title.style.color = 'red';
title.classList.add('active');
```

**Why does this matter?**

```
querySelector('#title')  →  Browser searches the entire DOM tree
                                        │
                              ┌─────────┴──────────┐
                              │  Every call costs   │
                              │  time & resources   │
                              └─────────────────────┘

const title = querySelector('#title')  →  Stored in memory once
                                                    │
                                          ┌─────────┴──────────┐
                                          │  Access it for free │
                                          │  as many times as   │
                                          │  you want           │
                                          └─────────────────────┘
```

> 💡 Find your element **once**, store it in a `const`, use it **everywhere**.

---

## 2. 📝 Updating Text Content — `.textContent`

The simplest update: change the visible text of an element.

```html
<h1 id="greeting">Hello, stranger!</h1>
```

```js
const greeting = document.querySelector('#greeting');

// Read the current text
console.log(greeting.textContent); // "Hello, stranger!"

// Update the text
greeting.textContent = 'Hello, Alice!';
```

```
Before:  <h1 id="greeting">Hello, stranger!</h1>
                                    │
                    greeting.textContent = 'Hello, Alice!'
                                    │
After:   <h1 id="greeting">Hello, Alice!</h1>
```

> ⚠️ `.textContent` treats everything as **plain text**. If you set HTML tags, they'll show up as literal characters — not rendered elements. That's actually a safety feature (prevents XSS attacks).

```js
greeting.textContent = '<strong>Bold?</strong>';
// Renders as:  <strong>Bold?</strong>  ← literally on screen, not bold
```

---

## 3. 🏗️ Updating HTML Content — `.innerHTML`

When you need to inject actual HTML, use `.innerHTML`.

```html
<div id="card"></div>
```

```js
const card = document.querySelector('#card');

card.innerHTML = `
  <h2>Panda Dev</h2>
  <p>Full-stack bamboo engineer 🐼</p>
`;
```

```
Before:  <div id="card"></div>
                    │
        card.innerHTML = `<h2>...</h2><p>...</p>`
                    │
After:   <div id="card">
           <h2>Panda Dev</h2>
           <p>Full-stack bamboo engineer 🐼</p>
         </div>
```

> ⚠️ **Never use `.innerHTML` with user-provided input.** It executes HTML — including `<script>` tags. Use `.textContent` for anything a user types.

### `.textContent` vs `.innerHTML` — When to use which

| | `.textContent` | `.innerHTML` |
|---|---|---|
| Renders HTML tags | ❌ No — shows as text | ✅ Yes — parsed as HTML |
| Safe for user input | ✅ Yes | ❌ No (XSS risk) |
| Use when | Changing words/labels | Injecting HTML structure |

---

## 4. 🏷️ Updating Attributes — `.setAttribute()` & `.getAttribute()`

Every HTML element has **attributes** (`src`, `href`, `alt`, `id`, `class`, `data-*`, etc.).  
You can read and change them with JavaScript.

```html
<img id="avatar" src="default.webp" alt="User avatar">
<a id="link" href="https://example.com">Visit</a>
```

```js
const avatar = document.querySelector('#avatar');
const link   = document.querySelector('#link');

// Read an attribute
console.log(avatar.getAttribute('src')); // "default.webp"
console.log(link.getAttribute('href'));  // "https://example.com"

// Update an attribute
avatar.setAttribute('src', 'panda_dev.webp');
avatar.setAttribute('alt', 'Panda developer');

link.setAttribute('href', 'https://aws.amazon.com');
```

```
Before:  <img src="default.webp" alt="User avatar">
                        │
    avatar.setAttribute('src', 'panda_dev.webp')
                        │
After:   <img src="panda_dev.webp" alt="Panda developer">
```

### Shorthand for common attributes

For the most common attributes, you can access them directly as properties:

```js
avatar.src = 'panda_dev.webp';   // same as setAttribute('src', ...)
avatar.alt = 'Panda developer';  // same as setAttribute('alt', ...)
link.href   = 'https://aws.amazon.com';
```

> 💡 Both approaches work. `.setAttribute()` is more explicit and works for **any** attribute including custom `data-*` ones.

---

## 5. 🎨 Updating Styles

### Inline styles — `.style`

You can set CSS properties directly on an element via `.style`.

```js
const title = document.querySelector('#title');

title.style.color          = 'brown';
title.style.backgroundColor = 'beige';   // camelCase, not kebab-case
title.style.fontSize        = '2rem';
title.style.display         = 'none';    // hide an element
title.style.display         = '';        // remove inline style (revert to CSS)
```

> ⚠️ CSS property names become **camelCase** in JavaScript:  
> `background-color` → `backgroundColor`  
> `font-size` → `fontSize`  
> `border-radius` → `borderRadius`

### The better way — `.classList`

Toggling inline styles gets messy fast. The cleaner approach is to define styles in CSS and **toggle classes** with JavaScript.

```css
/* styles.css */
.highlight {
  background-color: beige;
  border: 2px solid brown;
  color: brown;
}

.hidden {
  display: none;
}
```

```js
const card = document.querySelector('.card');

card.classList.add('highlight');      // adds the class
card.classList.remove('highlight');   // removes the class
card.classList.toggle('hidden');      // adds if missing, removes if present
card.classList.contains('hidden');    // true or false — check if class exists
```

```
Before:  <div class="card">
                    │
    card.classList.add('highlight')
                    │
After:   <div class="card highlight">
```

> 💡 `.classList.toggle()` is perfect for show/hide, dark mode, active states — anything that flips between two states.

---

## 6. 🏗️ Creating & Appending New Elements

So far we've been **updating** existing elements. Now let's **create brand new ones** and add them to the page.

### The 3-step pattern

```
Step 1: Create the element
        document.createElement('tag')
                    │
Step 2: Set its content / attributes
        element.textContent = '...'
        element.setAttribute(...)
                    │
Step 3: Append it to the DOM
        parent.appendChild(element)
        parent.append(element)
        parent.prepend(element)
```

### Example — add a new card

```html
<div id="cardContainer">
  <!-- cards will be added here -->
</div>
```

```js
const container = document.querySelector('#cardContainer');

// Step 1 — create elements
const card    = document.createElement('div');
const heading = document.createElement('h2');
const para    = document.createElement('p');

// Step 2 — set content & attributes
card.classList.add('card');
heading.textContent = 'Sloth Barista ☕';
para.textContent    = 'Slowest latte ever.';

// Step 3 — build the structure, then append to the DOM
card.appendChild(heading);
card.appendChild(para);
container.appendChild(card);
```

```
DOM before:
  <div id="cardContainer">
  </div>

                    │
        container.appendChild(card)
                    │

DOM after:
  <div id="cardContainer">
    <div class="card">
      <h2>Sloth Barista ☕</h2>
      <p>Slowest latte ever.</p>
    </div>
  </div>
```

### `.append()` vs `.appendChild()` vs `.prepend()`

| Method | What it does |
|--------|-------------|
| `.appendChild(el)` | Adds one element as the **last** child |
| `.append(el / text)` | Adds one or more elements **or text** as last child |
| `.prepend(el / text)` | Adds to the **beginning** |

```js
container.append(card);           // add at end
container.prepend(card);          // add at start
container.append(card1, card2);   // add multiple at once
container.append('Just text');    // can also append plain text
```

---

## 7. 🗑️ Removing Elements

```js
const card = document.querySelector('.card');

card.remove();  // removes the element from the DOM entirely
```

Or remove a **child** from a **parent**:

```js
const container = document.querySelector('#cardContainer');
const firstCard = container.firstElementChild;

container.removeChild(firstCard);
```

---

## 🔁 Full Example — Putting It All Together

```html
<div id="cardContainer"></div>
<button id="addCard">Add Card</button>
```

```js
const container = document.querySelector('#cardContainer');
const addBtn    = document.querySelector('#addCard');

const animals = [
  { name: 'Panda Dev 🐼',       desc: 'Full-stack bamboo engineer' },
  { name: 'Sloth Barista ☕',    desc: 'Slowest latte ever'         },
  { name: 'Squirrel Chef 🥐',   desc: 'Croissant connoisseur'      },
];

let index = 0;

addBtn.addEventListener('click', () => {
  if (index >= animals.length) return;

  const { name, desc } = animals[index];

  const card    = document.createElement('div');
  const heading = document.createElement('h2');
  const para    = document.createElement('p');

  card.classList.add('card');
  heading.textContent = name;
  para.textContent    = desc;

  card.appendChild(heading);
  card.appendChild(para);
  container.appendChild(card);

  index++;
});
```

> 💡 Every click creates a new card from data — no HTML was written for those cards. **That's the power of creating content with JavaScript.**

---

## 📝 Quick Reference

| What you want to do | How to do it |
|---------------------|-------------|
| Change visible text | `el.textContent = '...'` |
| Inject HTML markup | `el.innerHTML = '...'` |
| Read an attribute | `el.getAttribute('src')` |
| Change an attribute | `el.setAttribute('src', 'new.webp')` |
| Add inline style | `el.style.color = 'red'` |
| Add a CSS class | `el.classList.add('active')` |
| Remove a CSS class | `el.classList.remove('active')` |
| Toggle a CSS class | `el.classList.toggle('hidden')` |
| Create a new element | `document.createElement('div')` |
| Add to end of parent | `parent.appendChild(el)` |
| Add to start of parent | `parent.prepend(el)` |
| Remove an element | `el.remove()` |

---

> ⏭️ **Next:** [Browser Events →](../Events/Events.md)
