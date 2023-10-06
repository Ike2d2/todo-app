export function createListItem(...props) {
    const item = document.createElement("div");
    item.className = `flex h-20 w-full flex-shrink-0 px-3${props.i === props.selected ? " selected" : ""
        }`;

    item.addEventListener("click", () => {
        props.setSelected(props.i);
    });

    if (props.listEdit === props.i) {
        const inputWrap = document.createElement("div");
        inputWrap.className = "flex items-center justify-center h-full w-full";

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Enter List Title...");
        input.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        input.addEventListener("blur", () => props.setListEdit(null));
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                input.value !== '' && (listItems[props.i].title = input.value);
                save();
                input.blur();
                props.setSelected(props.i);
            }
        });
        input.className =
            "px-2 h-8 font-bold bg-secondary dark:bg-primary border-2 border-lighter dark:border-darker outline-none";

        inputWrap.append(input);
        item.append(inputWrap);
        return item;
    } else {
        const textWrap = document.createElement("div");
        textWrap.className = "flex flex-col grow items-start overflow-hidden";

        const span1 = document.createElement("span");
        span1.className = "font-bold text-lg overflow-hidden text-ellipsis";
        span1.innerText = props.e.title;

        const span2 = document.createElement("span");
        span2.className = "overflow-hidden w-3/4 text-ellipsis";
        span2.innerText = props.e.items[0] ? props.e.items[0].contents : "";

        const buttons = document.createElement("div");
        buttons.className = "buttons flex items-center justify-center text-3xl";

        const edit = document.createElement("button");
        const editIcon = document.createElement('props.i');
        editIcon.className = "ri-edit-line";
        edit.addEventListener("click", (e) => {
            e.stopPropagation();
            props.setListEdit(props.i);
        });
        edit.append(editIcon);

        const trash = document.createElement("button");
        const trashIcon = document.createElement("props.i");
        trashIcon.className = "ri-delete-bin-6-line";
        trash.addEventListener("click", (e) => {
            e.stopPropagation();
            props.removeListItem(props.i);
        });
        trash.append(trashIcon);

        textWrap.append(span1, span2);
        buttons.append(edit, trash);
        item.append(textWrap, buttons);
        return item;
    }
}