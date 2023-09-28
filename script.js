"use strict"

const list = document.getElementById("todoList");
const mainHeadSpan = document.getElementById("mainHeadSpan");

let selected = 0;
function setSelected(x) {
    selected = x;
    renderList();
    renderMain();
}

const listItems = [];
function addListItem(x) {
    listItems.push({
        title: x,
        items: [],
    });
    renderList();
    renderMain();
}

function renderList() {
    list.innerHTML = null;
    listItems.forEach((e, i) => {
        const item = document.createElement("div");
        item.className = `flex flex-col h-20 w-full flex-shrink-0 px-1 border-b-2${i === selected ? " selected" : ""
            }`;

        item.addEventListener("click", () => {
            setSelected(i);
        });

        const span1 = document.createElement("span");
        span1.className = "font-bold text-lg";
        span1.innerText = e.title;

        const buttons = document.createElement('div');
        buttons.className = 'buttons flex items-center justify-center text-3xl';

        const edit = document.createElement('i');
        edit.className = "ri-edit-line text-neutral-300";

        const trash = document.createElement('i');
        trash.className = "ri-delete-bin-6-line text-neutral-300";

        buttons.append(edit, trash);
        item.append(span1, buttons);
        list.append(item);
    });
}

const addListPopup = document.getElementById("addListPopup");
const addListInput = document.getElementById("addListInput");
const addListButton = document.getElementById("addListButton");

addListInput.addEventListener("blur", () => {
    addListPopup.classList.add("hidden");
});

addListInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addListInput.value && addListItem(addListInput.value);
        addListInput.blur();
    }
});

const addList = document.getElementById('addList');
addList.addEventListener("pointerdown", () => {
    addListInput.value = "";
    addListPopup.classList.remove("hidden");
    setTimeout(() => {
        addListInput.focus();
    });
});

addListButton.addEventListener(
    "pointerdown",
    () => addListInput.value && addListItem(addListInput.value)
);

const mainBody = document.getElementById('mainBody');

function addTaskItem() {
    listItems[selected].items.push({
        contents: '',
        done: false
    })
    renderMain();
}

function renderMain() {
    const toDisplay = listItems[selected];
    mainBody.innerHTML = null;
    mainHeadSpan.innerText = toDisplay.title;
    const ul = document.createElement('ul');
    toDisplay.items.forEach((e, i) => {
        const div = document.createElement('div');
        div.innerText = e.contents;
        div.className = 'flex items-center justify-center h-20 border-b-2';

        const task = document.createElement('div');
        task.className = 'flex items-center justify-center h-full w-full flex-grow-1'

        const taskInput = document.createElement('input');
        taskInput.setAttribute('type','text');

        const buttons = document.createElement('div');
        buttons.className = 'buttons flex items-center justify-center text-3xl w-16';

        const edit = document.createElement('i');
        edit.className = "ri-edit-line text-neutral-300";

        const trash = document.createElement('i');
        trash.className = "ri-delete-bin-6-line text-neutral-300";

        task.append(taskInput);
        buttons.append(edit, trash);
        div.append(task, buttons)
        ul.append(div);
    })
    const addTask = document.createElement('div');
    addTask.className = 'flex items-center justify-center h-20 flex-shrink-0'
    addTask.addEventListener('click', addTaskItem);
    const i = document.createElement('i');
    i.className = 'ri-add-fill text-neutral-300 text-5xl';
    addTask.append(i)
    mainBody.append(ul);
    mainBody.append(addTask);
}

const darkMode = document.getElementById('darkMode');
darkMode.addEventListener('click', () => {
    darkMode.classList.toggle("ri-sun-line");
    darkMode.classList.toggle("ri-moon-line");
    document.documentElement.classList.toggle('dark');
})