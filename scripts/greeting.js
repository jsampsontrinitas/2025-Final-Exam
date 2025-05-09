// The element that will display our greeting messages.
const element = document.querySelector('#greeting');

/**
 * Messages we'd like to show to the user. We track the message we're currently
 * showing with the `index` variable. By default it is 0, the first message.
 */
const index = 0;
const messages = [
    "Congratulations, Class of 2025! Your hard work has paid off!",
    "The future is bright, and it's yours to shape. Go make a difference!",
    "Well done, graduates!", "", "Keep striving for excellence in all you do.",
    "This is just the beginning of your journey!",
    "The world is waiting for your unique gifts. Shine brightly!", ""
];

function showNewGreeting() {
    element.textContent = messages[index];

    /**
     * Update the index to point to the next message in the array.
     * If we've reached the end of the array, loop back to the start.
     */
    index = (index + 1) % messages.length;
}

/**
 * Manually call the `showNewGreeting` function once to show the first message
 * immediately, then schedule it to run every 3 seconds (3000 milliseconds).
 */
showNewGreeting();

setInterval(showNewGreeting, 3000);


