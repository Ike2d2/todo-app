import { createListItem } from './modules/listItem.js';

// State Variables

let selected = null;
function setSelected(x) {
    selected = x;
    renderAll();
    selected !== null && addTask.classList.remove('hidden');
}

let taskEdit = null;
function setTaskEdit(x) {
    taskEdit = x;
    renderAll();
}

// List Object Array

let listItems = [];
if (localStorage.getItem(0) !== null) {
    listItems = JSON.parse(localStorage.getItem(0));
}
function save() { localStorage.setItem(0, JSON.stringify(listItems)) }
listItems.length > 0 && renderAll();


// Render List

function renderList() {
    console.log('rendering list')
    const list = document.getElementById("todoList");

    list.innerHTML = null;
    listItems.forEach((e, i) => {
        list.append(createListItem({selected, setSelected, removeListItem, renderList, e, i}));
    });
}

// Render Tasks

function renderMain() {
    const mainHeadSpan = document.getElementById("mainHeadSpan");
    const ul = document.getElementById('ul');

    const toDisplay = listItems[selected];
    ul.innerHTML = null;
    mainHeadSpan.innerText = toDisplay ? toDisplay.title : '';

    toDisplay && toDisplay.items.forEach((elem, i) => {
        const task = document.createElement("div");
        task.className = `flex h-20 w-full flex-shrink-0 px-3`;

        if (taskEdit === i) {

            const inputWrap = document.createElement("div");
            inputWrap.className = "flex items-center justify-start h-full w-full";

            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Enter Task Name...");
            input.addEventListener("click", (e) => {
                e.stopPropagation();
            });
            input.addEventListener("blur", () => setTaskEdit(null));
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    input.value !== '' && (elem.contents = input.value);
                    save();
                    input.blur();
                }
            });
            input.className =
                "px-2 h-8 font-bold bg-secondary dark:bg-primary border-2 border-lighter dark:border-darker outline-none w-full";

            inputWrap.append(input);
            task.append(inputWrap);
            ul.append(task);
            input.focus();
        } else {
            const checkWrap = document.createElement("div");
            checkWrap.className = "flex items-center justify-center w-10 me-6";

            const check = document.createElement("i");
            check.className = `${elem.done ? 'ri-checkbox-line ' : 'ri-checkbox-blank-line'} text-4xl`;
            check.addEventListener("click", (e) => {
                e.target.classList.toggle("ri-checkbox-blank-line");
                e.target.classList.toggle("ri-checkbox-line");
                elem.done = !elem.done;
                save();
                renderMain();
            })

            checkWrap.append(check);

            const textWrap = document.createElement("div");
            textWrap.className = "flex grow items-center";

            const span1 = document.createElement("span");
            span1.className = `font-bold decoration-2 text-lg${elem.done ? ' line-through' : ''}`;
            span1.innerText = elem.contents;

            const buttons = document.createElement("div");
            buttons.className = "buttons flex items-center justify-center text-3xl";

            const edit = document.createElement("button");
            const editIcon = document.createElement('i');
            editIcon.className = "ri-edit-line";
            edit.addEventListener("click", (e) => {
                e.stopPropagation();
                setTaskEdit(i);
            });
            edit.append(editIcon);

            const trash = document.createElement("button");
            const trashIcon = document.createElement("i");
            trashIcon.className = "ri-delete-bin-6-line";
            trash.addEventListener("click", (e) => {
                e.stopPropagation();
                removeTaskItem(i);
            });
            trash.append(trashIcon);

            textWrap.append(span1);
            buttons.append(edit, trash);
            task.append(checkWrap, textWrap, buttons);
            ul.append(task);
        }
    });
}

const addTask = document.getElementById('addTask')

// Add List Object

function addListItem() {
    listItems.push({
        title: `untitled ${listItems.length}`,
        items: [],
    });
    save();
    setSelected(listItems.length - 1)
}
document.getElementById("addList").addEventListener("click", addListItem);

// Remove List Object

function removeListItem(x) {
    const filter = listItems.filter((e, i) => i !== x);
    listItems = filter;
    save();
    setSelected(null)
    selected === null && addTask.classList.add('hidden');
}

// Remove Task Object

function removeTaskItem(x) {
    const filter = listItems[selected].items.filter((e, i) => i !== x);
    listItems[selected].items = filter;
    save();
    renderMain();
}

// Remove Completed Task Objects

const clearBtn = document.getElementById("clear-all");
clearBtn.addEventListener("click", clearAll);

function clearAll() {
    if (listItems[selected]) {
        const filter = listItems[selected].items.filter((e) => e.done === false)
        listItems[selected].items = filter;
        save();
        renderMain();
    }
}

// Add Task To List Object Items Array

function addTaskItem() {
    listItems[selected].items.push({
        contents: "untitled task",
        done: false,
    });
    save();
    setTaskEdit(listItems[selected].items.length - 1);
}

addTask.addEventListener("click", addTaskItem);

// Dark Mode

const darkMode = document.getElementById("darkMode");
darkMode.addEventListener("click", () => {
    darkMode.classList.toggle("ri-sun-line");
    darkMode.classList.toggle("ri-moon-clear-line");
    document.documentElement.classList.toggle("dark");
});

// QOL

function renderAll() {
    renderList();
    renderMain();
}
