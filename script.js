"use strict"

const list = document.getElementById("todoList");
const mainHeadSpan = document.getElementById("mainHeadSpan");

let selected = 0;
function setSelected(x) {
    selected = x;
    renderList();
    renderMain();
}

let listEdit = null;
function setListEdit(x) {
    listEdit = x;
    renderList();
    renderMain();
}

const listItems = [];
function addListItem() {
    listItems.push({
        title: 'untitled list',
        items: [],
    });
    listEdit = listItems.length - 1;
    renderList();
    renderMain();
}

function renderList() {
    list.innerHTML = null;
    listItems.forEach((e, i) => {
        const item = document.createElement("div");
        item.className = `flex h-20 w-full flex-shrink-0 px-1${i === selected ? " selected" : ""}`;

        item.addEventListener("click", () => {
            setSelected(i);
        });

        if (listEdit === i) {
            const inputWrap = document.createElement('div');
            inputWrap.className = 'flex items-center justify-center';

            const input = document.createElement('input');
            input.setAttribute('type','text');
            input.addEventListener('click', (e) => {e.stopPropagation()});
            input.addEventListener('blur', () => setListEdit(null));
            input.className = "px-2 font-bold bg-secondary dark:bg-primary border-2 border-lighter dark:border-darker outline-none";

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
            span2.innerText = e.items[0] ? e.items[0].contents : '';

            const buttons = document.createElement('div');
            buttons.className = 'buttons flex items-center justify-center text-3xl';

            const edit = document.createElement('i');
            edit.className = "ri-edit-line";

            const trash = document.createElement('i');
            trash.className = "ri-delete-bin-6-line";

            textWrap.append(span1, span2);
            buttons.append(edit, trash);
            item.append(textWrap, buttons);
            list.append(item);
        }
    });
}

function editListName(e) {
    e.target.value
}

const addList = document.getElementById('addList');

addList.addEventListener('click', addListItem)

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
    ul.className = 'divide-y-2 dark:divide-darker'
    toDisplay.items.forEach((e, i) => {
        const div = document.createElement('div');
        div.innerText = e.contents;
        div.className = 'flex items-center justify-center h-20';

        const task = document.createElement('div');
        task.className = 'flex items-center justify-center h-full w-full flex-grow-1'

        const taskInput = document.createElement('input');
        taskInput.setAttribute('type', 'text');
        taskInput.className = 'outline-none';

        const buttons = document.createElement('div');
        buttons.className = 'buttons flex items-center justify-center text-3xl w-16';

        const edit = document.createElement('i');
        edit.className = "ri-edit-line";

        const trash = document.createElement('i');
        trash.className = "ri-delete-bin-6-line";

        task.append(taskInput);
        buttons.append(edit, trash);
        div.append(task, buttons)
        ul.append(div);
    })
    const addTask = document.createElement('div');
    addTask.className = 'flex items-center justify-center h-20 flex-shrink-0'
    addTask.addEventListener('click', addTaskItem);
    const i = document.createElement('i');
    i.className = 'ri-add-fill text-neutral-300 dark:text-darker text-5xl';
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