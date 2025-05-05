/**
 * 
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

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('test-icon');

    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    if (status === 'passed') {
        svg.classList.add('check-icon');
        svg.setAttribute('stroke', 'green');
        svg.innerHTML = `
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>`;
    } else if (status === 'failed') {
        svg.classList.add('x-icon');
        svg.setAttribute('stroke', 'red');
        svg.innerHTML = `
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>`;
    } else if (status === 'pending') {
        svg.classList.add('pending-icon');
        svg.setAttribute('stroke', 'orange');
        svg.innerHTML = `
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="6" x2="12" y2="12"></line>
            <circle cx="12" cy="16" r="1"></circle>`;
    }

    return svg;
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
