export default {
    name: "Page Styling",
    tests: [
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
        },
        {
            name: "Body uses flexbox",
            about: "The `<body>` element should be rendered as a flexbox container. Careful though, because you can have the correct syntax, and still have this issue fail. The browser's ability to properly lay out elements is in large part governed by the page's _doctype_.",
            fn: () => getComputedStyle(document.body).display === "flex",
        }
    ]
}