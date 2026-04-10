# ⚡ Async JavaScript & Performance

> JavaScript can only do **one thing at a time** — but it's smart enough to work around that.

---

## 🗺️ Learning Path

```
[1] Single-Threaded → [2] Call Stack → [3] Event Loop → [4] Promises → [5] Async/Await → [6] Try/Catch
```

---

## 1. 🧵 Single-Threaded Language

JavaScript works through tasks **one at a time**, like a to-do list:

```
📋 To-Do List
─────────────────────────
[ ] Buy milk
[ ] Shop for clothes     ← can't do both at once
[ ] Cook dinner
─────────────────────────
✅ Buy milk
✅ Shop for clothes
✅ Cook dinner
```

> ⚠️ A slow or infinite task **blocks everything else** — this is called **blocking code**.

---

## 2. 📚 The Call Stack

JavaScript tracks what it's doing using the **call stack** — like a stack of plates: **last in, first out (LIFO)**.

### Example

```js
const first = () => {
    console.log("This is first")
    second()
    console.log("This is third")
}

const second = () => {
    console.log("This is second")
}

first()
```

### 🔍 Call Stack Walkthrough

```
Step 1: first() is called
┌──────────┐
│  first() │  ← pushed onto stack
└──────────┘

Step 2: inside first(), second() is called
┌──────────┐
│ second() │  ← pushed on top (last in)
├──────────┤
│  first() │
└──────────┘

Step 3: second() finishes → popped off
┌──────────┐
│  first() │  ← now first() can continue
└──────────┘

Step 4: first() finishes → popped off
  (empty)
```

### ✅ Console Output

```
This is first
This is second
This is third
```

---

## 3. 🌐 Web APIs & Event Listeners

Event listeners **never stop listening** — so they can't live in the call stack.

Instead, `.addEventListener()` is a **browser Web API**. The browser handles it separately.

```
Your JavaScript Code          Browser (Web APIs)
──────────────────            ──────────────────────────
┌──────────────┐              ┌──────────────────────────┐
│  Call Stack  │              │  addEventListener (click) │
│              │   offloads → │  setTimeout              │
│  your fns    │              │  fetch / XHR             │
└──────────────┘              └──────────────────────────┘
```

---

## 4. 📬 The Task Queue & Event Loop

When a Web API finishes (e.g. a click fires), the callback doesn't jump straight into the call stack — it waits in the **Task Queue**.

```
┌─────────────────────────────────────────────────────────┐
│                      EVENT LOOP                         │
│                                                         │
│   ┌──────────────┐     ┌──────────────┐                 │
│   │  Call Stack  │     │   Web APIs   │                 │
│   │              │     │  (browser)   │                 │
│   │  fn3()  ←───────── │  click ✓    │                 │
│   │  fn2()       │     │  fetch ✓    │                 │
│   │  fn1()       │     │  timer ✓    │                 │
│   └──────┬───────┘     └──────┬───────┘                 │
│          │  (empty?)          │ callback ready          │
│          │                    ▼                         │
│          │           ┌──────────────────┐               │
│          └───────────│   Task Queue     │               │
│     pulls next task  │  [cb1, cb2, ...] │               │
│     when stack empty └──────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

> 🔁 The **Event Loop** constantly checks: *"Is the call stack empty? Is there something in the task queue?"* — if yes to both, it moves the next callback in.

---

## 5. 🤝 Promises

A **Promise** represents a value that will be available *sometime in the future* — either resolved ✅ or rejected ❌.

```
Promise States
──────────────────────────────────
  pending  →  resolved ✅  (.then)
           →  rejected ❌  (.catch)
```

```js
const promise = new Promise((resolve, reject) => {
    const success = true
    if (success) resolve("Data loaded!")
    else reject("Something went wrong.")
})

promise
    .then(data => console.log(data))   // ✅ "Data loaded!"
    .catch(err => console.log(err))    // ❌ only runs on failure
```

---

## 6. ⚡ Async / Await

`async/await` is **syntactic sugar** over Promises — cleaner, easier to read.

```
Without async/await (Promise chain)     With async/await
────────────────────────────────────    ──────────────────────────────
fetch(url)                              const data = await fetch(url)
  .then(res => res.json())              const json = await data.json()
  .then(json => use(json))              use(json)
  .catch(err => handle(err))
```

```js
const fetchUserData = async () => {
    const response = await fetch('https://api.example.com/user')
    const userData = await response.json()

    const p = document.createElement('p')
    p.textContent = userData.bio
    document.body.appendChild(p)
}

fetchUserData()
```

> ⏸️ `await` **pauses** the async function until the Promise resolves — but it does **not** block the rest of your JavaScript.

---

## 7. 🛡️ Try / Catch — Handling Errors

Without error handling, a failed `fetch` will silently break your app. Use `try/catch` to handle it gracefully.

```
try {
    // code that might fail
} catch (error) {
    // runs only if something threw an error
}
```

```js
const fetchUserData = async () => {
    try {
        const response = await fetch('https://api.example.com/user')

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        }

        const userData = await response.json()
        const p = document.createElement('p')
        p.textContent = userData.bio
        document.body.appendChild(p)

    } catch (error) {
        console.error("Fetch failed:", error)
    }
}
```

### 🔍 Error Flow Diagram

```
fetchUserData()
      │
      ▼
  await fetch(url)
      │
   ┌──┴──────────────────────┐
   │ response.ok?            │
   │  ✅ YES → parse JSON    │
   │  ❌ NO  → throw Error   │
   └──────────────┬──────────┘
                  │ error thrown
                  ▼
            catch(error)
          console.error(...)   ← app stays alive
```

---

## 8. 🔄 Full Picture — How It All Connects

```
Your Code                Browser                  Network
─────────────────────    ─────────────────────    ──────────────
async fetchUserData()
  │
  └─ await fetch(url) ──→ Web API (fetch)  ──────→ API Server
                                                        │
                          ← response arrives ←─────────┘
                          callback → Task Queue
                                         │
                          Event Loop checks: stack empty?
                                         │ YES
                                         ▼
                          callback → Call Stack
  │
  └─ await response.json()
  └─ build DOM element
  └─ append to page ✅
```

---

## 📝 Quick Reference

| Concept | What it does |
|---|---|
| Call Stack | Tracks currently running functions (LIFO) |
| Web APIs | Browser handles timers, fetch, listeners |
| Task Queue | Holds callbacks waiting to run |
| Event Loop | Moves callbacks from queue → stack when stack is empty |
| Promise | Represents a future value (resolved or rejected) |
| async/await | Write async code that reads like sync code |
| try/catch | Gracefully handle errors in async functions |

---

> 💡 **Key Takeaway:** JavaScript is single-threaded, but the browser's Web APIs + the Event Loop let it handle async work without blocking your UI.
