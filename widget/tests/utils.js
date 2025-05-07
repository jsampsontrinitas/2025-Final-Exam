export const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getDocument = async (url) => {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    } catch (e) {
        console.error("Error fetching document:", e);
        return null;
    }
}