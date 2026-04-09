# 🖱️ Browser Events

> **TL;DR:** Events are everything that happens on your page. Event listeners let you react to them. Together, they make your site interactive.

---

## 🗺️ What We'll Cover

```
[1] What is an Event?
    [2] The Event Processor (Capture → Target → Bubble)
        [3] Event Listeners — addEventListener()
            [4] Best Practices
                [5] Removing Listeners — removeEventListener()
```

---

## 1. 🤔 What is an Event?

Every time a user interacts with your page, the browser fires an **event**.

```
User Action                  Event Fired
───────────────────────────────────────────
Move the mouse          →    pointermove
Click a button          →    pointerdown / pointerup
Type in an input        →    keydown / keyup
Submit a form           →    submit
Scroll the page         →    scroll
Page finishes loading   →    DOMContentLoaded
```

> 💡 Events aren't just user actions — the browser itself fires events too (page load, network responses, timers, etc.).

---

## 2. ⚙️ The Event Processor

When an event fires, the browser doesn't just jump straight to your code. It runs a **3-phase process** every single time.

### The 3 Phases

```
                        document (root)
                             │
              ┌──────────────▼──────────────┐
              │       CAPTURING PHASE       │  ← browser moves DOWN the tree
              │   looking for the target    │
              └──────────────┬──────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  TARGET PHASE  │  ← found it! adds target info to event object
                    │   <button>  🎯 │
                    └────────────────┘
                             │
              ┌──────────────▼──────────────┐
              │       BUBBLING PHASE        │  ← browser moves back UP the tree
              │   this is where listeners   │  ← YOUR CODE RUNS HERE
              │        are executed         │
              └──────────────┬──────────────┘
                             │
                             ▼
                        document (root)
```

### Step by step

| Phase | What happens |
|-------|-------------|
| 1️⃣ **Capture** | Browser creates an event object, then walks **down** the DOM tree toward the target |
| 2️⃣ **Target** | Browser reaches the element that triggered the event — adds `.target` info to the event object |
| 3️⃣ **Bubble** | Browser walks back **up** the tree — **your listener callbacks fire here** |

### The event object

The browser creates an **event object** at the start of this process. It holds all the information about what happened.

```js
element.addEventListener('pointerdown', (event) => {
  console.log(event.type);    // "pointerdown"
  console.log(event.target);  // the element that was clicked
  console.log(event.clientX); // X position of the pointer
});
```

> 🧠 **Key thing to remember:** Your callback runs during the **bubbling phase** — not capturing, not target. This matters when we talk about event delegation later.

---

## 3. 👂 Event Listeners

An event listener is a method you attach to an element. It watches for a specific event and calls a function when that event happens.

```
element  ──▶  .addEventListener(eventType, callback)
                        │               │
                        │               └── function to run when event fires
                        └── what to listen for (e.g. 'pointerdown')
```

### Adding a listener — `.addEventListener()`

```js
// 1. Grab the element
const colorChanger = document.querySelector('.colorButton');

// 2. Attach the listener
colorChanger.addEventListener('pointerdown', handleChangeColor);

// 3. Define the callback
function handleChangeColor(event) {
  document.body.style.backgroundColor = 'coral';
}
```

### Full walkthrough of what happens

```
User clicks .colorButton
        │
        ▼
Browser creates event object  { type: 'pointerdown', target: .colorButton, ... }
        │
        ▼
CAPTURING PHASE — walks down DOM to .colorButton
        │
        ▼
TARGET PHASE — .colorButton is the target, adds target info to event object
        │
        ▼
BUBBLING PHASE — walks back up
        │
        ├── .colorButton has a 'pointerdown' listener? ✅
        │         └── calls handleChangeColor(event)
        │
        ▼
Done. Waits for next event.
```

---

## 4. ✅ Best Practices

### Event names are all lowercase

```js
// ❌ Wrong — camelCase doesn't work for event names
colorChanger.addEventListener('pointerDown', handleChangeColor);

// ✅ Correct — all lowercase
colorChanger.addEventListener('pointerdown', handleChangeColor);
```

---

### Use named functions for callbacks

```js
// ❌ Anonymous function — causes problems when removing listeners
colorChanger.addEventListener('pointerdown', () => {
  console.log('clicked');
});

// ✅ Named function — clean, reusable, removable
function handleChangeColor() {
  console.log('clicked');
}
colorChanger.addEventListener('pointerdown', handleChangeColor);
```

---

### Use the `handle` prefix for event handlers

```js
// ✅ Clear, readable, standard practice
function handleChangeColor() { ... }
function handleFormSubmit() { ... }
function handleKeyPress() { ... }
```

> 💡 The `handle` prefix signals to you and other developers: *"this function is an event handler."*

---

### Use pointer events over mouse events

```
Mouse events     →  only work with a mouse 🖱️
Pointer events   →  work with mouse 🖱️, touch 👆, stylus ✏️, and more
```

```js
// ❌ Mouse-only
element.addEventListener('mousedown', handleClick);

// ✅ Works for all input types
element.addEventListener('pointerdown', handleClick);
```

> 📱 As of 2023, mobile devices account for up to **80% of web traffic** in some regions. Pointer events cover all your users.

---

### Common events quick reference

| Event | Fires when... |
|-------|--------------|
| `pointerdown` | Pointer pressed down on element |
| `pointerup` | Pointer released |
| `pointermove` | Pointer moves over element |
| `keydown` | Key is pressed |
| `keyup` | Key is released |
| `submit` | Form is submitted |
| `scroll` | Page or element is scrolled |
| `DOMContentLoaded` | HTML is fully parsed |

> 📖 For the full list, check [MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events).

---

## 5. 🗑️ Removing Listeners — `.removeEventListener()`

There will be times you need to remove a listener — for example, after a one-time action, or when cleaning up a component. Leaving unused listeners around causes **memory leaks**.

```js
const colorChanger = document.querySelector('.colorButton');

colorChanger.addEventListener('pointerdown', handleChangeColor);

// Later — remove it
colorChanger.removeEventListener('pointerdown', handleChangeColor);
```

The event and callback **must be identical** to the ones used in `addEventListener`.

### Why named functions matter here — referential equality

```
Named function                     Anonymous function
──────────────────────────────     ──────────────────────────────────────────
function handleChangeColor() {}    () => { console.log('clicked') }
        │                                  │                    │
        │                           new memory location   new memory location
        └── one place in memory         (add)                (remove)
                │                          │                    │
        add ───▶│◀─── remove           different!           different!
                │
        ✅ referentially equal        ❌ NOT referentially equal
        remove works                  remove does NOT work
```

```js
// ✅ Works — named function, same memory reference
colorChanger.addEventListener('pointerdown', handleChangeColor);
colorChanger.removeEventListener('pointerdown', handleChangeColor);

// ❌ Doesn't work — two separate anonymous functions in memory
colorChanger.addEventListener('pointerdown', () => { console.log('clicked') });
colorChanger.removeEventListener('pointerdown', () => { console.log('clicked') });
```

> ⚠️ Even though the anonymous functions look identical, JavaScript sees them as **two different objects** in memory. The remove won't find a match and the listener stays attached.

---

## 🔁 Full Example — Putting It All Together

```html
<button class="colorButton">Change Color</button>
<button class="stopButton">Stop Listening</button>
```

```js
const colorChanger = document.querySelector('.colorButton');
const stopBtn      = document.querySelector('.stopButton');

function handleChangeColor() {
  const colors = ['coral', 'steelblue', 'mediumseagreen', 'goldenrod'];
  const random = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = random;
}

function handleStop() {
  colorChanger.removeEventListener('pointerdown', handleChangeColor);
  stopBtn.textContent = 'Listener removed ✅';
}

colorChanger.addEventListener('pointerdown', handleChangeColor);
stopBtn.addEventListener('pointerdown', handleStop);
```

> 💡 Click the color button to change the background. Click stop to remove the listener — the color button goes dead. That's `removeEventListener` in action.

---

## 📝 Quick Reference

| What you want to do | How to do it |
|---------------------|-------------|
| Add a listener | `el.addEventListener('eventname', handlerFn)` |
| Remove a listener | `el.removeEventListener('eventname', handlerFn)` |
| Access the event object | Add a parameter to your callback: `function handler(event) {}` |
| Get the element that triggered the event | `event.target` |
| Get the event type | `event.type` |
| Use for all input devices | Use `pointer*` events, not `mouse*` events |
| Keep listeners removable | Always use **named functions** as callbacks |

---

> ⏭️ **Next:** [Async JS & Performance →](../Async_JS/async_js.md)
