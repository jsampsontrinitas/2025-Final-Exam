import { getDocument } from "../tests/utils.js";

export default {
    name: "Site",
    tests: [
        {
            name: "Create `about.html`",
            about: "Alongside your `index.html`, create an `about.html` page. It should contain the Trinitas Crest image, and an `<h1>` element that says \"Coming soon\". Do not worry about styling this page.",
            fn: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        const res = await fetch("about.html", { method: "HEAD" });
                        res.ok ? resolve(true) : reject();
                    } catch {
                        reject();
                    }
                })
        },
        {
            name: "`about.html` content",
            about: "There were very specific instructions for the `about.html` page in the previous test.",
            fn: () =>
                new Promise(async (resolve, reject) => {

                    function hasCrest(doc) {
                        const img = doc.querySelector("img");
                        return img && img.src.endsWith("crest.png");
                    }

                    function hasH1(doc) {
                        const h1 = doc.querySelector("h1");
                        const text = h1 && h1.textContent.toLowerCase();
                        const textFormatted = text.replaceAll(/\s+/g, "").trim();
                        return textFormatted && textFormatted.includes("comingsoon");
                    }

                    try {
                        const doc = await getDocument("about.html");

                        let conditions = [hasCrest(doc), hasH1(doc)];
                        let remaining = conditions.filter(c => !c).length;
                        if (remaining === 0) { resolve(true); return; }

                        resolve({ remaining, total: conditions.length });

                    } catch {
                        reject();
                    }
                })
        }
    ]
}