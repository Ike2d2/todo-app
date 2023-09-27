const list = document.getElementById("todoList");
const mainHead = document.getElementById("mainHead");

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
    items: [
      {
        contents: "Do the Dishes",
        done: false,
      },
      {
        contents: "Do Homework",
        done: true,
      },
    ],
  });
  renderList();
  renderMain();
}

function renderList() {
  list.innerHTML = null;
  listItems.forEach((e, i) => {
    const item = document.createElement("div");
    item.className = `flex flex-col h-20 w-full flex-shrink-0 px-1 border-b-2${
      i === selected ? " selected" : ""
    }`;
    item.setAttribute("key", i);

    item.addEventListener("click", () => {
      setSelected(i);
    });

    const span1 = document.createElement("span");
    span1.className = "font-bold text-lg";
    span1.innerText = e.title;

    item.append(span1);
    list.append(item);
  });
}

const addListPopup = document.getElementById("addListPopup");
const addListInput = document.getElementById("addListInput");
const addListButton = document.getElementById("addListButton");

addListInput.addEventListener("blur", () => {
  addListPopup.classList.add("hidden");
});

addList.addEventListener("pointerdown", (e) => {
  addListInput.value = "";
  addListPopup.classList.remove("hidden");
  setTimeout(() => {
    addListInput.focus();
  });
});

addListInput.addEventListener("blur", () => {
  addListPopup.classList.add("hidden");
});

addListButton.addEventListener(
  "pointerdown",
  () => addListInput.value && addListItem(addListInput.value)
);
addListInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addListInput.value && addListItem(addListInput.value);
    addListInput.blur();
  }
});

const mainBody = document.getElementById('mainBody');

function renderMain() {
    const toDisplay = listItems[selected];
    mainBody.innerHTML = null;
    mainHead.innerText = toDisplay.title;
    const ul = document.createElement('ul');
    toDisplay.items.forEach((e) => {
        const li = document.createElement('li');
        li.innerText = e.contents;
        ul.append(li);
    })
    mainBody.append(ul);
}