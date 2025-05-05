import { miniMarkdown, getTestStatusIcon } from "./utils.js";

const styles = `
    .test-item {
        display: flex;
        align-items: center;
        padding: 6px 8px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .test-item:hover {
        background-color: #f3f4f6;
    }
    .test-icon {
        margin-right: 8px;
        flex-shrink: 0;
    }
    .test-name {
        flex-grow: 1;
        color: #4b5563;
    }
`;

export default class TestItem extends HTMLElement {

    _id;
    _name;
    _about;

    _fn;
    _status;

    constructor({ id, name, about, fn, suite, }) {
        super();
        this._id = id;
        this._name = name;
        this._about = about;
        this._fn = fn;
        this._suite = suite;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="test-item">
                <svg class="test-icon check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="green">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="test-name" data-test-id="${this._id}">${miniMarkdown(this._name)}</span>
            </div>
        `;

        this.status = 'pending';
        this.run();
    }

    async run() {
        try {
            this.status = await this._fn() ? 'passed' : 'failed';
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
     * @param {'pending'|'passed'|'failed'} newStatus
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
