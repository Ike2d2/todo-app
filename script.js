let list = document.getElementById("todoList");
let mainHead = document.getElementById("mainHead");

let selected = 0;
function setSelected(x){
    selected = x;
    renderList();
}

function renderList() {
    list.innerHTML = null;
    new Array(25).fill().forEach((e, i) => {
        let item = document.createElement("div");
        item.className = `flex flex-col h-20 w-full flex-shrink-0 p-1 border-b-2${i === selected ? ' selected' : ''}`;
        item.setAttribute('key', i);

        item.addEventListener('click', () => {
            setSelected(i)
        })

        let span1 = document.createElement("span");
        span1.className = "font-bold text-lg";
        span1.innerText = "List " + (i + 1);

        let span2 = document.createElement("span");
        span2.className = "text-sm";
        span2.innerText = "List Contents Preview List Contents Preview List Contents Preview List Contents Preview"

        item.append(span1, span2);
        list.append(item);
    })
    mainHead.innerText = "List " + (selected + 1)
}

renderList()