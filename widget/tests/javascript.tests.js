import { getDocument } from "../tests/utils.js";

export default {
    name: "JavaScript",
    tests: [
        {
            "name": "Change heading",
            "about": "By default, the `h1#mainHeading` greeting says \"Hello, Web!\". You must dynamically change the text content of this element to say `'Hello, Trinitas!'`. Implement this in `main.js`.",
            "fn": async () => {
                try {
                    const doc = await getDocument("index.html");
                    const original = doc.querySelector("#mainHeading")?.textContent;
                    const current = document.querySelector("#mainHeading")?.textContent;
                    return current === "Hello, Trinitas!" && current !== original;
                } catch {
                    return false;
                }
            }
        },
        {
            "name": "`double()` function",
            "about": "Implement in `main.js` a function called `\"double\"`; it should return a value twice as large as that which is provided.",
            "fn": () => typeof double === 'function' && double(2) === 4,
        },
        {
            name: "Clock updates",
            about: "The clock should update every second. If it doesn't, the time will remain unchanged in the footer.",
            fn: () =>
                new Promise((resolve, reject) => {
                    const clock = document.querySelector("#clock");
                    if (!clock) return reject();

                    let updates = 0;
                    let lastValue = clock.textContent;
                    const observer = new MutationObserver(() => {
                        if (clock.textContent !== lastValue) {
                            lastValue = clock.textContent;
                            updates++;
                            if (updates === 3) {
                                observer.disconnect();
                                resolve(true);
                            }
                        }
                    });

                    observer.observe(clock, { childList: true, characterData: true, subtree: true });

                    setTimeout(() => {
                        observer.disconnect();
                        reject();
                    }, 3000);
                })
        },
    ]
}