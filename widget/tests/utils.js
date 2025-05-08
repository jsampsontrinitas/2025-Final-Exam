export const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retrievedDocuments = new Map();

export const getDocument = async (url) => {
    if (retrievedDocuments.has(url)) {
        return retrievedDocuments.get(url);
    }
    
    const res = await fetch(url);
    const html = await res.text();
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");
    retrievedDocuments.set(url, document);
    return document;
}

/**
 * Checks each task in the taskList. If the task is a string, it queries the document for that selector.
 * If the task is a function, it calls the function and expects a boolean result.
 * Returns an object with the number of completed and total tasks.
 * 
 * @param {Array<string|Function>} taskList - Array of CSS selectors (string) or boolean-returning functions.
 * @returns {{completed: number, total: number}}
 */
export const makeTaskReport = async (taskList) => {

    const state = { completed: 0, total: 0 };

    for (const req of taskList) {
        state.total++;

        const selectorSucceeded = typeof req === "string" && document.querySelector(req);
        const functionSucceeded = typeof req === "function" && await req();

        if (selectorSucceeded || functionSucceeded) {
            state.completed++;
        } else {
            console.warn(`Task failed:`);
            if ( typeof req === "string" && !selectorSucceeded ) {
                console.warn(`Selector Failed: ${req}`);
            }
            if ( typeof req === "function" && !functionSucceeded ) {
                console.warn(`Function Failed: ${req}`);
            }
        }
    }

    return state;
}