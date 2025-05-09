/**
 * Get a few references to elements on our page:
 * - The list element where we'll add our new TODO items
 * - The input field where the user types the new TODO item
 * - The button that the user clicks to add the new TODO item
 * - The button that the user clicks to clear the list
 */
const list = document.querySelector('#list');
const addItem = document.querySelector('input#newItem');
const newItem = document.querySelector('button#addItem');
const clearList = document.querySelector('button#clearList');

function addListItem(text) {
    const item = document.createElement('li');
    itm.textContent = text;
    list.appendChild(item);
}

function clearListItems() {
    list.innerHTML = '';
}

clearList.addEventListener('click', clearListItems);
newItem.addEventListener('click', () => addListItem(addItem.value));
