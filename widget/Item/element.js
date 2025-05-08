import Icons from "../Icons.js";
import { miniMarkdown, getTestStatusIcon } from "../utils.js";

import sheet from './styles.css' with { type: 'css' };

export default class TestItem extends HTMLElement {

    _id;
    _name;
    _about;
    _icon;

    _fn;
    _status;
    _suite;
    _partialResults;

    constructor({ id, name, about, fn, suite, }) {
        super();
        this._id = id;
        this._name = name;
        this._about = about;
        this._fn = fn;
        this._suite = suite;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div class="test-item">
                ${Icons.pending.outerHTML}
                <span class="test-name" data-test-id="${this._id}">
                    ${miniMarkdown(this._name)}
                </span>
                <span class="partial-results"></span>
            </div>
        `;

        this.status = 'pending';
        this.run();
    }

    async run() {
        try {
            /**
             * @type {boolean|{remaining: number, total: number}}
             * @description The function to run the test. It should return a boolean or an object with the remaining and total issues.
             */
            const results = await this._fn();

            if (typeof results === "boolean") {
                this.status = results ? 'passed' : 'failed';
            } else if (results && typeof results === "object" && !Array.isArray(results)) {
                this.partialResults = results;
                if (results.completed === results.total) {
                    this.status = 'passed';
                } else if (results.completed === 0) {
                    this.status = 'failed';
                } else {
                    this.status = 'partial';
                }
            }
        } catch (e) {
            this.status = 'failed';
        }
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get about() { return this._about; }
    get status() { return this._status; }

    /**
     * @param {string} newName
     */
    set name(newName) {
        if (this._name === newName) {
            return;
        }

        this._name = newName;
        this.shadowRoot.querySelector(".test-name").innerHTML = miniMarkdown(newName);
    }

    /**
     * @param {{remaining: number, total: number}} results
     * @description The partial results of the test. It should be an object with the remaining and total issues.
     */
    set partialResults(results) {
        if (this._partialResults === results) {
            return;
        }

        this._partialResults = results;
        const element = this.shadowRoot.querySelector(".partial-results");

        if (results.completed == 0) {
            element.textContent = "";
        } else if (results.completed < results.total) {
            element.textContent = `${Math.round(results.completed / results.total * 100)}% Validated`;
        }
    }

    /**
     * @param {'pending'|'partial'|'passed'|'failed'} newStatus
     */
    set status(newStatus) {
        if (newStatus === this._status) {
            return;
        }

        this._status = newStatus;
        this._suite.updateStatusCounts();
        this.icon = getTestStatusIcon(this._status);
    }

    /**
     * @param {SVGSVGElement} newIcon
     */
    set icon(newIcon) {
        const icon = this.shadowRoot.querySelector(".test-icon");
        newIcon.classList.add("test-icon");
        icon.replaceWith(newIcon);
    }

}

customElements.define('test-item', TestItem);
