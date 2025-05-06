const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

function injectedCommentIndex(element) {
    for (let i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].nodeType === Node.COMMENT_NODE) {
            if (element.childNodes[i].textContent.includes("injected")) {
                return i;
            }
        }
    }
    return -1;
}

function childrenConsistentlyIndented(element) {
    const injectedIndex = injectedCommentIndex(element);
    const childNodes = injectedIndex !== -1
        ? Array.from(element.childNodes).slice(0, injectedIndex)
        : Array.from(element.childNodes);
    const childElements = childNodes.filter((child) => child.nodeType === Node.ELEMENT_NODE);
    const childIndentation = childElements.map((child) => {
        const indentation = child.previousSibling?.textContent.replace(/\n/g, "").length || 0;
        return indentation;
    });
    return childIndentation.every((indentation) => indentation === childIndentation[0]);
}

export const testGroups = [
    {
        name: "Document Details",
        tests: [
            {
                "name": "Valid Doctype",
                "about": "The doctype ensures the browser supports modern HTML features. It should be the first line of our page. It is included automatically when using the HTML5 template in Codespaces.",
                "fn": () => document.doctype?.name === 'html',
            },
            {
                "name": "English Content",
                "about": "Our page should declare that its content is written in English. This is typically handled via an attribute on the `<html>` element itself.",
                "fn": () => document.documentElement.getAttribute("lang") == "en",
            },
            {
                "name": "Personalized title",
                "about": "The title of the page (as seen in the browser tab) should say \"`<name>`'s Web Final Exam\". Replace `<name>` with your first name.",
                "fn": () => {
                    const names = ["Jackson", "Brandon", "Jonathan", "Jon", "Jon Anthony"];
                    const pattern = new RegExp(`^(${names.join("|")})'s Web Final Exam$`);
                    return pattern.test(document.title);
                },
            },
            {
                "name": "HTML neatly formatted",
                "about": "The HTML of our page should be neatly formatted. This means that the HTML should be indented properly. Codespaces has a built-in formatter that can help with this.",
                "fn": () => {
                    const consistentHtml = childrenConsistentlyIndented(document.documentElement);
                    const consistentHead = childrenConsistentlyIndented(document.head);
                    const consistentBody = childrenConsistentlyIndented(document.body);
                    return consistentHtml && consistentHead && consistentBody;
                },
            },
            {
                "name": "HTML Is Well-Formed",
                "about": "There exists in this document a series of mistakes made with various html tags. The result is that the document is not well-formed. You should locate and fix these mistakes.",
                "fn": () => {
                    // If any of these selectors match, the document is not well-formed.
                    const badSelectors = [
                        "body > nav > ul:has(a:empty)",
                        "body > footer > small > small",
                        "body > footer + small",
                    ];

                    const badElements = badSelectors.map(selector => document.querySelector(selector)).filter(el => el !== null);

                    if ( badElements.lenth === 0 ) {
                        // If all bad elements are null, the document is well-formed.
                        return true;
                    }

                    return { total: badSelectors.length, remaining: badElements.length };
                },
            }
        ]
    },
    {
        name: "CSS Styles",
        tests: [
            {
                "name": "Has `styles.css` attached",
                "about": "The page must include a `<link>` element with the `href` attribute set to `'styles.css'`.",
                "fn": () => !!document.querySelector('link[href="styles.css"]'),
            },
            {
                "name": "`<link>` has proper attributes",
                "about": "In order for our styles to load properly, the `<link>` element that loads them must be told how the external file _relates_ to this content. When loading CSS, the _relationship_ is that of `\"stylesheet\"`.",
                "fn": () => {
                    const link = document.querySelector('link[href="styles.css"]');
                    return link && link.getAttribute("rel") === "stylesheet";
                },
            },
            {
                "name": "Text color is `midnightblue`",
                "about": "The text color of our page should be `\"midnightblue\"`.",
                "fn": () => {
                    const body = document.querySelector("body");
                    const computedStyle = window.getComputedStyle(body);
                    return computedStyle.color === "rgb(25, 25, 112)";
                },
            },
            {
                "name": "Background is `ghostwhite`",
                "about": "The background color of the page should be `\"ghostwhite\"`.",
                "fn": () => {
                    const body = document.querySelector("body");
                    const computedStyle = window.getComputedStyle(body);
                    return computedStyle.backgroundColor === "rgb(248, 248, 255)";
                },
            }
        ]
    },
    {
        name: "Main Content",
        tests: [
            {
                "name": "Has `<h1>` element",
                "about": "The main heading of our page (\"Hello Web!\") should be wrapped in an `<h1>` element, placed immediately within the `<body>` tag, and have an id of `'mainHeading'`.",
                "fn": () => !!document.querySelector("body > h1#mainHeading"),
            },
            {
                "name": "Has `<nav>` element",
                "about": "The navigation of our page should be wrapped in a `<nav>` element.",
                "fn": () => !!document.querySelector("body > nav"),
            },
            {
                "name": "Has `<main>` element",
                "about": "The main content of our page should be wrapped in a `<main>` element.",
                "fn": () => !!document.querySelector("body > main"),
            },
            {
                "name": "Has `<footer>` element",
                "about": "The footer of our page should be wrapped in a `<footer>` element.",
                "fn": () => !!document.querySelector("body > footer"),
            },
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
        // Tests presence (including siblings) and structure of the section#intro element
        name: "Intro Section",
        tests: [
            {
                "name": "Has `section#intro` element",
                "about": "The page must contain a `<section>` element with id `'intro'`.",
                "fn": () => !!document.querySelector('body > main > section#intro'),
            },
            {
                "name": "Has `<h2>` element",
                "about": "The `section#intro` element must contain an `h2` child`.",
                "fn": () => !!document.querySelector('body > main > section#intro > h2:first-child'),
            },
            {
                "name": "Has `<p>` element",
                "about": "The `section#intro` element must contain a `p#greeting` child.",
                "fn": () => !!document.querySelector('body > main > section#intro > p#greeting:last-child'),
            },
        ]

    },
    {
        name: "Greetings",
        tests: [
            {
                "name": "Has `<p>` element",
                "about": "The page must contain a `<p>` element with id `'greeting'`.",
                "fn": () => !!document.querySelector('p#greeting'),
            },
            {
                "name": "Greeting text",
                "about": "The greeting text should be present in the `<p>` element with id `'greeting'`.",
                "fn": () => document.querySelector('p#greeting')?.textContent !== "",
            },
            {
                "name": "Greeting changes",
                "about": "The greeting text should change every few seconds.",
                "fn": () =>
                    new Promise(async (resolve, reject) => {
                        const el = document.querySelector("#greeting");
                        const m1 = el.textContent;
                        await sleep(4_000);
                        const m2 = el.textContent;
                        return (m2 && m2 !== m1) ? resolve(true) : reject();
                    })
            }
        ]
    },
    {
        name: "TODO List and Controls",
        tests: [
            {
                "name": "Has `todo.js` script",
                "about": "The page must include a `<script>` element with the `src` attribute set to `'scripts/todo.js'`.",
                "fn": () => !!document.querySelector('script[src="scripts/todo.js"]'),
            },
            {
                "name": "Has `<ul>` list element",
                "about": "The page must contain a `<ul>` element with id `'list'`.",
                "fn": () => !!document.querySelector('ul#list'),
            },
            {
                "name": "Has `<input>` element",
                "about": "Our TODO list controls should contain an `<input>` element with id `'newItem'`.",
                "fn": () => !!document.querySelector('input#newItem'),
            },
            {
                "name": "Has `<button>`",
                "about": "Our TODO list controls should contain a `<button>` element with id `'addItem'`.",
                "fn": () => !!document.querySelector('button#addItem'),
            },
            {
                "name": "Can add items to TODO list",
                "about": "We should be able to add items to our TODO list.",
                "fn": () => {
                    const todo = document.querySelector("#todo");
                    const input = todo && document.querySelector("#newItem");
                    const button = input && document.querySelector("#addItem");
                    const list = button && document.querySelector("#list");

                    if (list) {
                        const beforeLength = list.children.length;
                        input.value = "Test Entry";
                        button.click();
                        const afterLength = list.children.length;

                        input.value = "";
                        list.innerHTML = "";

                        return afterLength > beforeLength;
                    }

                    return false;
                }
            },
            {
                "name": "Can clear TODO list",
                "about": "We should be able to click the _Clear List_ button to remove all items in the list.",
                "fn": () => {
                    const todo = document.querySelector("#todo");
                    const input = todo && document.querySelector("#newItem");
                    const button = input && document.querySelector("#clearList");
                    const list = button && document.querySelector("#list");

                    if (list) {
                        list.appendChild(document.createElement("li"));
                        const hadChildren = list.children.length > 0;
                        button.click();
                        const hasNoChildren = list.children.length === 0;
                        list.innerHTML = "";
                        return hadChildren && hasNoChildren;
                    }

                    return false;
                }
            }
        ]
    },
    {
        name: "JavaScript",
        tests: [
            {
                "name": "Update `<h1>` text",
                "about": "By default, the page greeting says \"Hello, Web!\". Using JavaScript, update the `<h1>` element to say `'Hello, Trinitas!'`.",
                "fn": async () => {
                    // Fetch the raw HTML source of index.html
                    try {
                        const res = await fetch("index.html");
                        const html = await res.text();
                        // Use DOMParser to parse the fetched HTML
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, "text/html");
                        const originalH1 = doc.querySelector("#mainHeading")?.textContent;
                        const currentH1 = document.querySelector("#mainHeading")?.textContent;
                        // Check that the current H1 is different from the original, and is 'Hello, Trinitas!'
                        return currentH1 === "Hello, Trinitas!" && currentH1 !== originalH1;
                    } catch {
                        return false;
                    }
                }
            },
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
        ]
    },
    {
        name: "Other",
        tests: [
            {
                name: "Created about.html",
                about: "Alongside your `index.html`, you should create an `about.html` page.",
                fn: () =>
                    new Promise(async (resolve, reject) => {
                        try {
                            const res = await fetch("about.html", { method: "HEAD" });
                            res.ok ? resolve(true) : reject();
                        } catch {
                            reject();
                        }
                    })
            }
        ]
    }
];
