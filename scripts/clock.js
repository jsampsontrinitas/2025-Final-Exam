const clock = document.querySelector('#clock');
let now = new Date();

function updateClock() {
    clock.textContent = now.toLocaleTimeString();
    now = new Date();
}

setInterval(updateClock, 500);