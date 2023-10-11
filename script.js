import './modules/listItem.js';
import './modules/taskItem.js';

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
    const list = document.getElementById("todoList");

    list.innerHTML = null;
    listItems.forEach((e, i) => {
        let item = document.createElement('list-item');
        item.props = {e, i, save, selected, setSelected, listItems, removeListItem};
        list.append(item);
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
        let task = document.createElement('task-item');
        task.props = {elem, i, save, removeTaskItem}
        ul.append(task);
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
