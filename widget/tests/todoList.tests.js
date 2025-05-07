export default {
    name: "TODO List",
    tests: [
        {
            "name": "Has `todo.css` attached",
            "about": "The page must include a `<link>` element with the `href` attribute set to `'styles/todo.css'`.",
            "fn": () => !!document.querySelector('link[href="styles/todo.css"]'),
        },
        {
            "name": "Has `todo.js` attached",
            "about": "The page must include a `<script>` element with the `src` attribute set to `'scripts/todo.js'`.",
            "fn": () => !!document.querySelector('script[src="scripts/todo.js"]'),
        },
        {
            "name": "Has `ul#list` list element",
            "about": "The page must contain a `<ul>` element with id `'list'`.",
            "fn": () => !!document.querySelector('ul#list'),
        },
        {
            "name": "Has `input#newItem` element",
            "about": "Our TODO list controls should contain an `<input>` element with id `'newItem'`.",
            "fn": () => !!document.querySelector('input#newItem'),
        },
        {
            "name": "Has `button#addItem` element",
            "about": "Our TODO list controls should contain a `<button>` element with id `'addItem'`.",
            "fn": () => !!document.querySelector('button#addItem'),
        },
        {
            "name": "Can add items",
            "about": "We should be able to add items to our TODO list.",
            "fn": () => {
                const todo = document.querySelector("#todo");
                const input = todo && document.querySelector("#newItem");
                const button = input && document.querySelector("#addItem");
                const list = button && document.querySelector("#list");

                if (list) {
                    const beforeLength = list.children.length;
                    input.value = "Test Entry";
                    button.click();
                    const afterLength = list.children.length;

                    input.value = "";
                    list.innerHTML = "";

                    return afterLength > beforeLength;
                }

                return false;
            }
        },
        {
            "name": "Can clear list",
            "about": "We should be able to click the _Clear List_ button to remove all items in the list.",
            "fn": () => {
                const todo = document.querySelector("#todo");
                const input = todo && document.querySelector("#newItem");
                const button = input && document.querySelector("#clearList");
                const list = button && document.querySelector("#list");

                if (list) {
                    list.appendChild(document.createElement("li"));
                    const hadChildren = list.children.length > 0;
                    button.click();
                    const hasNoChildren = list.children.length === 0;
                    list.innerHTML = "";
                    return hadChildren && hasNoChildren;
                }

                return false;
            }
        }
    ]
}