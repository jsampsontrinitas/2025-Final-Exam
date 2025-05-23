import { getDocument, makeTaskReport } from "../tests/utils.js";

export default {
    name: "Site",
    tests: [
        {
            name: "Create `about.html`",
            about: "Alongside your `index.html`, create an `about.html` page. It should contain the Trinitas Crest image, and an `<h1>` element that says \"Coming soon\" (without the quotes). Do not worry about styling this page.",
            fn: async () => {
                try {
                    const doc = await getDocument("about.html");
                    return makeTaskReport([
                        "h1",
                        "img[src=\"images/crest.png\"]",
                        () => ["coming", "soon"].every((word) =>
                            doc.querySelector("h1")?.textContent?.trim().toLowerCase().includes(word)),
                    ], doc);
                } catch {
                    return false;
                }
            }
        }
    ]
}