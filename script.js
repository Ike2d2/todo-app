"use strict";

// State Variables

let selected = 0;
function setSelected(x) {
    selected = x;
    renderAll();
}

let listEdit = null;
function setListEdit(x) {
    listEdit = x;
    renderAll();
}

let taskEdit = null;
function setTaskEdit(x) {
    taskEdit = x;
    renderAll();
}

// List Object Array

let listItems = [];

// Render List

function renderList() {
    const list = document.getElementById("todoList");

    list.innerHTML = null;
    listItems.forEach((e, i) => {
        const item = document.createElement("div");
        item.className = `flex h-20 w-full flex-shrink-0 px-3${i === selected ? " selected" : ""
            }`;

        item.addEventListener("click", () => {
            setSelected(i);
        });

        if (listEdit === i) {
            const inputWrap = document.createElement("div");
            inputWrap.className = "flex items-center justify-center h-full w-full";

            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Enter List Title...");
            input.addEventListener("click", (e) => {
                e.stopPropagation();
            });
            input.addEventListener("blur", () => setListEdit(null));
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    input.value !== '' && (listItems[i].title = input.value);
                    input.blur();
                    setSelected(i);
                }
            });
            input.className =
                "px-2 h-8 font-bold bg-secondary dark:bg-primary border-2 border-lighter dark:border-darker outline-none";

            inputWrap.append(input);
            item.append(inputWrap);
            list.append(item);
            input.focus();
        } else {
            const textWrap = document.createElement("div");
            textWrap.className = "flex flex-col grow items-start";

            const span1 = document.createElement("span");
            span1.className = "font-bold text-lg";
            span1.innerText = e.title;

            const span2 = document.createElement("span");
            span2.innerText = e.items[0] ? e.items[0].contents : "";

            const buttons = document.createElement("div");
            buttons.className = "buttons flex items-center justify-center text-3xl";

            const edit = document.createElement("button");
            const editIcon = document.createElement('i');
            editIcon.className = "ri-edit-line";
            edit.addEventListener("click", (e) => {
                e.stopPropagation();
                setListEdit(i);
            });
            edit.append(editIcon);

            const trash = document.createElement("button");
            const trashIcon = document.createElement("i");
            trashIcon.className = "ri-delete-bin-6-line";
            trash.addEventListener("click", (e) => {
                e.stopPropagation();
                removeListItem(i);
            });
            trash.append(trashIcon);

            textWrap.append(span1, span2);
            buttons.append(edit, trash);
            item.append(textWrap, buttons);
            list.append(item);
        }
    });
}

// Render Tasks

function renderMain() {
    const mainHeadSpan = document.getElementById("mainHeadSpan");
    const ul = document.getElementById('ul');

    const toDisplay = listItems[selected];
    ul.innerHTML = null;
    mainHeadSpan.innerText = listItems.length !== 0 ? toDisplay.title : '';

    toDisplay.items.forEach((elem, i) => {
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
            const textWrap = document.createElement("div");
            textWrap.className = "flex grow items-center";

            const span1 = document.createElement("span");
            span1.className = "font-bold text-lg";
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
            task.append(textWrap, buttons);
            ul.append(task);
        }
    });
}

const addTask = document.getElementById('addTask')

// Add List Object

function addListItem() {
    listItems.length === 0 && addTask.classList.toggle('hidden');
    listItems.push({
        title: `untitled ${listItems.length}`,
        items: [],
    });
    setListEdit(listItems.length - 1)
}
document.getElementById("addList").addEventListener("click", addListItem);

// Remove List Object

function removeListItem(x) {
    const filter = listItems.filter((e, i) => i !== x);
    listItems = filter;
    listItems.length === 0 && addTask.classList.toggle('hidden');
    selected === x ? setSelected(0) : renderAll();
}

// Remove Task Object

function removeTaskItem(x) {
    const filter = listItems[selected].items.filter((e, i) => i !== x);
    listItems[selected].items = filter;
    renderMain();
}

// Add Task To List Object Items Array

function addTaskItem() {
    listItems[selected].items.push({
        contents: "untitled task",
        done: false,
    });
    setTaskEdit(listItems[selected].items.length - 1);
}

addTask.addEventListener("click", addTaskItem);

// Dark Mode

const darkMode = document.getElementById("darkMode");
darkMode.addEventListener("click", () => {
    darkMode.classList.toggle("ri-sun-line");
    darkMode.classList.toggle("ri-moon-line");
    document.documentElement.classList.toggle("dark");
});

// QOL

function renderAll(){
    renderList();
    renderMain();
}
