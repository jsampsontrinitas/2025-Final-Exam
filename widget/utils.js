import Icons from "./Icons.js";

/**
 * @param {string} tagname 
 * @param {string|Record<string, any>} attributes 
 * @returns 
 */
export function createElement(tagname, attributes = {}) {

    let id;
    let classes = [];

    if (tagname.includes("#") || tagname.includes(".")) {

        let mode = "tag";

        for (const part of tagname.split(/(\#|\.)/)) {

            if (part === "#") {
                mode = "id";
                continue;
            }

            if (part === ".") {
                mode = "class";
                continue;
            }

            if (mode === "tag") {
                tagname = part;
                continue;
            }

            if (mode === "id") {
                id = part;
                continue;
            }

            if (mode === "class") {
                classes.push(part);
                continue;
            }

        }

    }

    const element = document.createElement(tagname);

    if (id) element.setAttribute("id", id);
    if (classes) element.classList.add(...classes);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'innerHTML') {
            element.innerHTML = value;
            continue;
        } else if (key === 'classList') {
            for (const className of value.split(' ')) {
                element.classList.add(className);
            }
            continue;
        }

        element.setAttribute(key, value);
    }

    return element;
}

/**
 * @param {'pending'|'passed'|'failed'} status 
 * @returns SVGSVGElement
 */
export function getTestStatusIcon(status) {

    if (status === 'passed') {
        return Icons.passed;
    } else if (status === 'failed') {
        return Icons.failed;
    } else if (status === 'pending' || status === 'partial') {
        return Icons.pending;
    }

    throw new Error("Unsupported status:", status);
}

export function miniMarkdown(src) {
    const escapeHTML = s =>
        s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return src
        // inline code with class detection
        .replace(/`([^`]+)`/g, (_, code) => {
            let cls = "";
            if (/^\[[^\]]+\]$/.test(code)) cls = "attr";   // [src]
            else if (/^['"].*['"]$/.test(code)) cls = "string"; // "foo"
            else if (/^[a-zA-Z_$][\w$]*\s*\([^)]*\)$/.test(code)) cls = "func";   // double()
            else if (/^\.[a-zA-Z_$][\w$]*(?:\.[\w$]+)*$/.test(code)) cls = "prop";   // .textContent
            else if (/[<>]/.test(code)) cls = "html";   // <html>

            return `<code${cls ? ` class="${cls}"` : ""}>${escapeHTML(code)}</code>`;
        })
        .replace(/\*([^\*]+)\*/g, "<strong>$1</strong>")  // bold
        .replace(/_([^_]+)_/g, "<em>$1</em>");           // italic
}
