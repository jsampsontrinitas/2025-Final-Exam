const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const testGroups = [
    {
        name: "HTML Structure",
        tests: [
            {
                "name": "Has a Doctype",
                "about": "All pages are expected to contain a doctype declaration. This ensures the browser interprets our code in a modern style.",
                "fn": () => document.doctype?.name === 'html',
            },
            {
                "name": "English Content",
                "about": "Our pages need to declare that they are written in English. Address this with the `<html>` tag.",
                "fn": () => document.documentElement.getAttribute("lang") == "en",
            },
        ]
    },
    {
        name: "Main Content",
        tests: [
            {
                "name": "Trinitas Crest Image",
                "about": "An image element should exist on the page showing the school crest. The school's name should be in the `[alt]` attribute.",
                "fn": () => [...document.querySelectorAll("img")].some((img) => img.alt.toLowerCase().includes("trinitas")),
            },
            {
                "name": "Correct Image `[src]`",
                "about": "The school crest should appear in the center of our page. If our `[src]` attribute isn't valid, we won't see the image.",
                "fn": () => document.querySelector("img")?.src?.endsWith("crest.png"),
            },
            {
                "name": "has `<h1>`",
                "about": "Check if the `<h1>` element with id `'mainHeading'` is present.",
                "fn": () => document.querySelector('h1#mainHeading') !== null,
            },
            {
                "name": "h1 textContent",
                "about": "Check if the `<h1>` element's text content is `'Hello, Trinitas!'`.",
                "fn": () => document.querySelector('h1#mainHeading')?.textContent === 'Hello, Trinitas!',
            },
            {
                "name": "has `<p>`",
                "about": "Check if the `<p>` element with id `'greeting'` is present.",
                "fn": () => document.querySelector('p#greeting') !== null,
            },
        ]
    },
    {
        name: "List and Controls",
        tests: [
            {
                "name": "has `<ul>`",
                "about": "Check if the `<ul>` element with id `'list'` is present.",
                "fn": () => document.querySelector('ul#list') !== null,
            },
            {
                "name": "has `<input>`",
                "about": "Check if the `<input>` element with id `'newItem'` is present.",
                "fn": () => document.querySelector('input#newItem') !== null,
            },
            {
                "name": "has `<button>` (add)",
                "about": "Check if the `<button>` element with id `'addItem'` is present.",
                "fn": () => document.querySelector('button#addItem') !== null,
            }
        ]
    },
    {
        name: "CSS Styles",
        tests: []
    },
    {
        name: "JavaScript",
        tests: [
            {
                "name": "Has `double()` function",
                "about": "You must implement in `script.js` a function called `\"double\"`, which returns a value twice as large as that which is provided.",
                "fn": () => typeof double === 'function',
            },
            {
                "name": "`double()` functions works",
                "about": "If we call `double(12)`, the value `24` should be returned.",
                "fn": () => typeof double === 'function' && double(12) === 24,
            },
            {
                "name": "Cycle of Greetings",
                "about": "Our page should show a different word of encouragement to our graduating class every few seconds. The implementation for this exists within the `script.js` file.",
                "fn": () =>
                    new Promise(async (resolve, reject) => {
                        const el = document.querySelector("#greeting");
                        const m1 = el.textContent; console.log(m1, 'sleeping 4s');
                        await sleep(4_000);
                        const m2 = el.textContent;
                        return (m2 && m2 !== m1) ? resolve(true) : reject();
                    })
            }
        ]
    },
];
