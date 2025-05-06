const greeting = document.getElementById('greeting');

let currentGreetingIndex = 0;

const greetings = [
    "Congratulations, Class of 2025! Your hard work has paid off!",
    "The future is bright, and it's yours to shape. Go make a difference!",
    "Well done, graduates! Keep striving for excellence in all you do.",
    "This is just the beginning of your journey!",
    "The world is waiting for your unique gifts. Shine brightly!",""
];

function showNextGreeting() {
    greeting.textContent = greetings[currentGreetingIndex];
    if ( currentGreetingIndex < greetings.length - 1) {
        currentGreetingIndex = currentGreetingIndex + 1;
    } else {
        currentGreetingIndex = 0;
    }
}

showNextGreeting();

setInterval(showNextGreeting, 3000);