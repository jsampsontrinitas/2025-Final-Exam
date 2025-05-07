export default {
    name: "Main Content",
    tests: [
        {
            name: "Body element",
            about: "The page must contain a `<body>` element.",
            fn: () => !!document.querySelector("body"),
        },
        {
            name: "Main heading",
            about: "The page must have an `<h1>` element with id `'mainHeading'`, placed immediately within the `<body>`. The content of this element should initially be the message \"Hello, Web!\".",
            fn: () => !!document.querySelector("body > h1#mainHeading"),
        },
        {
            name: "Main heading not empty",
            about: "The `<h1>` element with id `'mainHeading'` must not be empty.",
            fn: () => !!document.querySelector("body > h1#mainHeading:not(:empty)"),
        },
        {
            name: "Main heading image",
            about: "The `<h1>` element with id `'mainHeading'` must be immediately followed by an `<img>` element with the `src` attribute set to `'images/crest.png'` and the `alt` attribute containing the word 'Trinitas'.",
            fn: () => !!document.querySelector("body > h1#mainHeading + img[src$='crest.png'][alt*='trinitas' i]"),
        },
        {
            name: "Navigation bar",
            about: "The page must contain a `<nav>` element as a child of the `<body>`.",
            fn: () => !!document.querySelector("body > nav"),
        },
        {
            name: "Navigation list",
            about: "The `<nav>` element must contain a `<ul>` element.",
            fn: () => !!document.querySelector("body > nav > ul"),
        },
        {
            name: "Navigation links",
            about: "The `<ul>` element must contain two `<li>` elements, each containing an `<a>` element. The first link should point to `index.html`, and the second to `about.html`.",
            fn: () => !!document.querySelector(`body > nav > ul > li:has(a[href$='index.html']):first-child + li:has(a[href$='about.html']):last-child`),
        },
        {
            name: "Main content area",
            about: "The page must contain a `<main>` element after the `<nav>`.",
            fn: () => !!document.querySelector("body > nav + main"),
        },
        {
            name: "Main content sections",
            about: "The `<main>` element must contain two `<section>` elements. The first should have id `'intro'`, and the second should have id `'todo'`.",
            fn: () => !!document.querySelector(`body > main > section#intro:first-child + section#todo:last-child`),
        },
        {
            name: "Intro and greeting",
            about: "The first `<section>` (with id `'intro'`) must contain a `<p>` element with id `'greeting'`.",
            fn: () => !!document.querySelector(`body > main > section#intro:first-child > p#greeting:last-child`),
        }
    ]
}