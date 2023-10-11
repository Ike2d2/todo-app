export class ListItem extends HTMLElement {
    props;
    constructor() {
        super();
        this.editing = this.hasAttribute('editing');
    }

    static get observedAttributes() {
        return ['editing'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.editing = this.hasAttribute('editing');
        this.render();
    }

    render() {
        this.innerHTML = null;

        let item = document.createElement("div");
        item.className = `flex h-20 w-full flex-shrink-0 px-3${this.props.selected === this.props.i ? " selected" : ""}`;

        if (this.editing) {

            const inputWrap = document.createElement("div");
            inputWrap.className = "flex items-center justify-center h-full w-full";

            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Enter List Title...");
            input.addEventListener("click", (e) => {
                e.stopPropagation();
            });
            input.addEventListener("blur", () => this.removeAttribute('editing'));
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    input.value !== '' && (this.props.listItems[this.props.i].title = input.value);
                    this.props.save();
                    input.blur();
                    this.props.setSelected(this.props.i);
                }
            });
            input.className =
                "px-2 h-8 font-bold bg-secondary dark:bg-primary border-2 border-lighter dark:border-darker outline-none";

            inputWrap.append(input);
            item.append(inputWrap);
            setTimeout(() => { input.focus() }, 0)
        } else {

            const textWrap = document.createElement("div");
            textWrap.className = "flex flex-col grow items-start overflow-hidden";

            const span1 = document.createElement("span");
            span1.className = "font-bold text-lg overflow-hidden text-ellipsis";
            span1.innerText = this.props.e.title;

            const buttons = document.createElement("div");
            buttons.className = "buttons flex items-center justify-center text-3xl";

            const edit = document.createElement("button");
            const editIcon = document.createElement('i');
            editIcon.className = "ri-edit-line";
            edit.addEventListener("click", (e) => {
                e.stopPropagation();
                this.setAttribute('editing', '');
            });
            edit.append(editIcon);

            const trash = document.createElement("button");
            const trashIcon = document.createElement("i");
            trashIcon.className = "ri-delete-bin-6-line";
            trash.addEventListener("click", (e) => {
                e.stopPropagation();
                this.props.removeListItem(this.props.i);
            });
            trash.append(trashIcon);

            textWrap.append(span1);
            buttons.append(edit, trash);
            item.append(textWrap, buttons);
        }
        this.append(item);
    }


}

customElements.define("list-item", ListItem);