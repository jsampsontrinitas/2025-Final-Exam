const element = document.getElementById('greeting');

const messages = [
    "Congratulations, Class of 2025! Your hard work has paid off!",
    "The future is bright, and it's yours to shape. Go make a difference!",
    "Well done, graduates!", "Keep striving for excellence in all you do.",
    "This is just the beginning of your journey!", 
    "The world is waiting for your unique gifts. Shine brightly!",
];

let index = 0;

showNewGreeting();

setInterval(showNewGreeting, 3000);

function showNewGreeting() {
    element.textContent = messages[index];
    index = (index + 1) % messages.length;
}
