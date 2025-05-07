export default {
    name: "Intro Section",
    tests: [
        {
            "name": "Has `section#intro` element",
            "about": "The page must contain a `<section>` element with id `'intro'`, immediately within the `<body>` element.",
            "fn": () => !!document.querySelector('body > main > section#intro'),
        },
        {
            "name": "Has intro heading",
            "about": "The `section#intro` element must contain as its _first-child_ an `<h2>` element.",
            "fn": () => !!document.querySelector('body > main > section#intro > h2:first-child'),
        },
        {
            "name": "Has greeting paragraph",
            "about": "The `section#intro` element must contain a `p#greeting` child as its _last-child_. This is where our greeting messages will be programmatically displayed (that functionality is handled in the `scripts/greetings.js` file).",
            "fn": () => !!document.querySelector('body > main > section#intro > p#greeting:last-child'),
        },
    ]
}
