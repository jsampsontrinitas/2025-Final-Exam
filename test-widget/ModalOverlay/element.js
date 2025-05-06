import Icons from "../Icons.js";
import { createElement, miniMarkdown } from "../utils.js";

import sheet from './styles.css' with { type: 'css' };

export default class ModalOverlay extends HTMLElement {

    modal;
    overlay

    icon;
    title;
    content;
    closeBtn;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    connectedCallback() {
        this.buildModalOverlayElement();
        this.setupEventListeners();
    }

    buildModalOverlayElement() {

        const buildModalTitle = () => {
            const container = createElement('div.modal-title');
            this.icon = container.appendChild(createElement('span.modal-icon'));
            this.title = container.appendChild(createElement('span.modal-test-name'));
            return container;
        }

        const buildModalHeader = () => {
            const container = createElement('div.modal-header');
            container.appendChild(buildModalTitle());
            this.closeBtn = container.appendChild(createElement('button.close-btn', {
                innerHTML: Icons.close.outerHTML
            }));

            return container;
        }

        const modalOverlay = this.overlay = createElement('div.modal-overlay');
        const testModal = this.modal = modalOverlay.appendChild(createElement('div.test-modal'));

        testModal.appendChild(buildModalHeader());
        this.content = testModal.appendChild(createElement('div.modal-content'));

        // Append elements to shadow root
        this.shadowRoot.appendChild(modalOverlay);
    }

    setupEventListeners() {
        const _ = this.shadowRoot;
        const d = document;
        const b = _.querySelector('.close-btn');
        const o = _.querySelector('.modal-overlay');
        b.addEventListener('click', () => this.hide());
        o.addEventListener('click', ({ target: t }) => (t == o) && this.hide());
        d.addEventListener('keydown', ({ key: k }) => (k == 'Escape') && this.hide());
    }

    setAll({ icon, title, content }) {
        if (title) this.title.innerHTML = miniMarkdown(title);
        if (content) this.content.innerHTML = miniMarkdown(content);
        if (icon) {
            this.icon.firstElementChild
                ? this.icon.firstElementChild.replaceWith(icon)
                : this.icon.appendChild(icon);
        }
    }

    show() { [this.modal, this.overlay].map(o => o.classList.add('visible')); }
    hide() { [this.modal, this.overlay].map(o => o.classList.remove('visible')); }

}

customElements.define('modal-overlay', ModalOverlay);
