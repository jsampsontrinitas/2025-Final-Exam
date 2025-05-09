const now = new Date();
const clock = document.querySelector('#clock');

/**
 * Our `updateClock` function takes the current time (according to the Date
 * object in the `now` variable) and uses that to set the text content of the
 * `clock` element. It then updates the `now` variable with a new Date object
 * so that the next time this function is called, we get the new current time.
 * We use `setInterval` to call our function every 500 milliseconds (0.5s).
 */
function updateClock() {
    clock.textContent = now.toLocaleTimeString();
    now = new Date();
}

setInterval(updateClock, 500);
