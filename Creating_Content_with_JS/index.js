const NewElement = document.createElement("p");
NewElement.classList.add('regular')
NewElement.id = 'introPara'
NewElement.textContent = 'This is created in JS'



// 1. SELECT ELEMENTS
document.querySelector('selector')       // first matching element
document.querySelectorAll('selector')    // all matching elements (NodeList)

// 2. CREATE ELEMENTS
const el = document.createElement('p')   // create a <p>
const fragment = document.createDocumentFragment()


// 3. MODIFY ELEMENTS
el.textContent = 'Hello world'
el.id = 'introParagraph'
el.classList.add('regular')


// 4. INSERT ELEMENTS

parent.append(el)        // add inside parent, at the end
parent.prepend(el)       // add inside parent, at the beginning

reference.after(el)      // add after reference element (sibling)
reference.before(el)     // add before reference element (sibling)

reference.replaceWith(el) // replace reference element completely


// 5. REMOVE ELEMENTS
el.remove()


const newElement = document.createElement("p");
newElement.textContent = "I made this with JavaScript!";
newElement.classList.add("regular");

const parent = document.querySelector(".bio");
parent.append(newElement);
