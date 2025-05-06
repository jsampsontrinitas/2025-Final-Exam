import Icons from "../Icons.js";
import TestItem from "../TestItem/element.js";
import ModalOverlay from "../ModalOverlay/element.js";
import { testGroups } from "../data/tests.js";
import { createElement, miniMarkdown, getTestStatusIcon } from "../utils.js";

import sheet from './styles.css' with { type: 'css' };

export default class TestStatusIndicator extends HTMLElement {

    constructor() {
        super();
        this.modal = new ModalOverlay();
        this.expanded = false;
        this.testData = [];

        this.initializeTestItemElements();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    initializeTestItemElements() {
        const testData = [];

        for (let i = 0; i < testGroups.length; i++) {
            const tests = [];
            const group = testGroups[i];

            for (let j = 0; j < group.tests.length; j++) {
                const id = `g${i}:t${j}`;
                const status = 'pending';
                const { name, about, fn } = group.tests[j];

                tests.push(new TestItem({ id, name, about, fn, status, suite: this }));
            }

            testData.push({ name: group.name, tests });
        }

        this.testData = testData;
    }

    getStatusCounts() {
        const counts = { total: 0, partial: 0, pending: 0, passed: 0, failed: 0 };

        for (const { status } of this.testData.flatMap(g => g.tests)) {
            counts.total = (counts.total ?? 0) + 1;
            counts[status] = (counts[status] ?? 0) + 1;
        }

        return { ...counts, passRate: counts.passed / counts.total };
    }

    getStatusClass() {
        const { passRate } = this.getStatusCounts();

        if (passRate >= 0.8) return 'success';
        if (passRate >= 0.5) return 'warning';

        return 'error';
    }

    toggleExpand() {
        this.expanded = !this.expanded;
        this.statusContainer.classList.toggle('expanded', this.expanded);
    }

    showTestDetailsInModal(testItem) {
        // Make sure our modal overlay is attached to the page
        if (!this.modal.isConnected) {
            document.body.appendChild(this.modal);
        }

        this.modal.setAll({
            icon: getTestStatusIcon(testItem.status),
            title: testItem.name,
            content: testItem.about,
        });

        this.modal.show();
    }

    addEventListeners() {
        // We have one listener, and use delegation to handle clicks
        this.shadowRoot.addEventListener('click', (event) => {
            const item = event.target.closest('test-item');
            if (item) this.showTestDetailsInModal(item);
            if (event.target.closest('.status-header')) this.toggleExpand();
        });
    }

    updateStatusCounts() {
        const header = this.shadowRoot.querySelector(".status-header");
        header.className = `status-header ${this.getStatusClass()}`;

        const { total, partial, pending, passed, passRate } = this.getStatusCounts();
        const icon = header.querySelector(".test-icon");

        // Add spinning icon if any tests are pending
        if (pending > 0 && !icon) {
            const icon = getTestStatusIcon('pending');
            header.insertBefore(icon, header.firstElementChild);
        } else {
            icon?.remove();
        }

        const label = header.querySelector(".counts");
        const percent = Math.round(passRate * 100);
        label.textContent = `${passed} of ${total} (${percent}%)`;

    }

    buildStatusContainerHeader() {
        return createElement('div.status-header', {
            innerHTML: `
                <span class="counts">00 of 00 (00%)</span>
                ${ Icons.chevron.outerHTML }
            `
        });
    }

    buildStatusContainerBody() {

        const statusBody = createElement('div.status-body');

        // Create the test groups
        for (const group of this.testData) {

            // Create the group element
            const element = createElement("div.test-group", {
                innerHTML: `<div class="group-name">${miniMarkdown(group.name)}</div>`,
            });

            // Add the test items
            group.tests.forEach(t => element.appendChild(t));

            // Append group to div
            statusBody.appendChild(element);
        }

        return statusBody;
    }

    buildStatusContainerElement() {
        const container = createElement('div.status-container');
        container.appendChild(this.buildStatusContainerHeader());
        container.appendChild(this.buildStatusContainerBody());
        return container;
    }

    async render() {
        // Ensure all elements are created
        if (!this.statusContainer) this.statusContainer = this.buildStatusContainerElement();

        // Append elements to the shadow root
        this.shadowRoot.appendChild(this.statusContainer);
    }
}

// Register the custom element
customElements.define('test-status-indicator', TestStatusIndicator);