const list = document.getElementById('list');
const addItem = document.querySelector('input#newItem');
const newItem = document.querySelector('button#addItem');
const clearList = document.querySelector('button#clearList');

function addListItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
}

function clearListItems() {
    list.innerHTML = '';
}

newItem.addEventListener('click', () => {
    const text = addItem.value;
    addListItem(text);
});

clearList.addEventListener('click', () => {
    clearListItems();
});