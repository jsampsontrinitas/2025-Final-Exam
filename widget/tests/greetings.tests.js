import { sleep } from "./utils.js";

export default {
    name: "Greetings",
    tests: [
        {
            name: "Has `greeting.js` linked",
            about: "The page must attach `'scripts/greeting.js'` via a `<script>` element. This script needs to access elements on the page, so make sure to defer its loading.",
            fn: () => !!document.querySelector('head script[src$="scripts/greeting.js"][defer]'),
        },
        {
            name: "Has `section#intro` element",
            about: "The page must contain a `<section>` element with id `'intro'`. This element should be the first child of the `main` element.",
            fn: () => !!document.querySelector('main > section#intro'),
        },
        {
            "name": "Has `p#greeting` element",
            "about": "The page must contain a `<p>` element with id `'greeting'`. This element should be the last child of the `section#intro` element.",
            "fn": () => !!document.querySelector('section#intro p#greeting:last-child'),
        },
        {
            "name": "Greeting text",
            "about": "The greeting text should be present in the `<p>` element with id `'greeting'`.",
            "fn": () => document.querySelector('section#intro p#greeting:last-child')?.textContent !== "",
        },
        {
            name: "No empty greetings",
            about: "We have several messages shown in our greetings element. We should never have an empty greeting.",
            fn: () => messages.every(greeting => greeting.trim() !== ""),
        },
        {
            name: "Greeting changes",
            about: "The greeting text should change every few seconds.",
            fn: () =>
                new Promise((resolve, reject) => {
                    const el = document.querySelector("#greeting");
                    if (!el) return reject();

                    const seen = new Set([el.textContent.trim()]);
                    const observer = new MutationObserver(() => {
                        const txt = el.textContent.trim();
                        if (txt) seen.add(txt);
                        if (seen.size >= 3) {
                            observer.disconnect();
                            resolve(true);
                        }
                    });

                    observer.observe(el, { childList: true, characterData: true, subtree: true });

                    setTimeout(() => {
                        observer.disconnect();
                        seen.size >= 3 ? resolve(true) : reject();
                    }, 6000);
                })
        }
    ]
}