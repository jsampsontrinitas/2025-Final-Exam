const h1 = document.getElementById('mainHeading');
const list = document.getElementById('list');
const addItem = document.querySelector('input#newItem');
const newItem = document.querySelector('button#addItem');
const clearList = document.querySelector('button#clearList');
const greeting = document.getElementById('greeting');

h1.textContent = 'Hello, Trinitas!';

const greetings = [
    "Congratulations, Class of 2025! Your hard work has paid off!",
    "The future is bright, and it's yours to shape. Go make a difference!",
    "Well done, graduates! Keep striving for excellence in all you do.",
    "This is just the beginning of your journey!",
    "The world is waiting for your unique gifts. Shine brightly!"
];

function showNextGreeting() {
    const currentGreeting = greeting.textContent;
    const currentGreetingIndex = greetings.indexOf(currentGreeting);
    const nextGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
    greeting.textContent = greetings[nextGreetingIndex];
}

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

showNextGreeting();
setInterval(showNextGreeting, 3000);

function double(x) {
    return x ^ 2;
}