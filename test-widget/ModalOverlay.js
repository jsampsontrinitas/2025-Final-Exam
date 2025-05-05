import { createElement, miniMarkdown } from "./utils.js";

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
    }

    connectedCallback() {
        this.loadStyles();
        this.buildModalOverlayElement();
        this.setupEventListeners();
    }

    loadStyles() {
        if (this.shadowRoot.querySelector("link")) {
            return;
        }

        this.shadowRoot.appendChild(createElement("link", {
            rel: "stylesheet",
            href: "test-widget/ModalOverlay/styles.css",
        }));
    }

    buildModalOverlayElement() {

        const buildModalTitle = () => {
            const container = createElement('div.modal-title');

            const icon = createElement('span.modal-icon');
            this.icon = container.appendChild(icon);

            const title = createElement('span.modal-test-name');
            this.title = container.appendChild(title);

            return container;
        }

        const buildModalHeader = () => {
            const container = createElement('div.modal-header');

            const modalTitle = buildModalTitle();
            container.appendChild(modalTitle);

            const closeBtn = createElement('button.close-btn', {
                innerHTML: `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>`
            });
            this.closeBtn = container.appendChild(closeBtn);

            return container;
        }

        const modalOverlay = createElement('div.modal-overlay');
        this.overlay = modalOverlay;

        const testModal = createElement('div.test-modal');
        modalOverlay.appendChild(testModal);
        this.modal = testModal;

        const modalHeader = buildModalHeader();
        testModal.appendChild(modalHeader);

        const modalContent = createElement('div.modal-content');
        testModal.appendChild(modalContent);
        this.content = modalContent;

        // Append elements to shadow root
        this.shadowRoot.appendChild(modalOverlay);
    }

    setupEventListeners() {

        const closeBtn = this.shadowRoot.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            this.hide();
        });

        const overlay = this.shadowRoot.querySelector('.modal-overlay');
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                this.hide();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hide();
            }
        });

    }

    show() {
        for (const el of [this.modal, this.overlay])
            el.classList.add('visible');
    }

    hide() {
        for (const el of [this.modal, this.overlay])
            el.classList.remove('visible');
    }

    setIcon(icon) {
        this.icon.innerHTML = icon.outerHTML;
    }

    setContent(content) {
        this.content.innerHTML = miniMarkdown(content);
    }

    setTitle(title) {
        this.title.innerHTML = miniMarkdown(title);
    }

}

customElements.define('modal-overlay', ModalOverlay);
