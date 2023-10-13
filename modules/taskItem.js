export class TaskItem extends HTMLElement {
    props;
    constructor() {
        super();
        this.editing = this.hasAttribute('editing');
        this.done = this.hasAttribute('done');
    }

    static get observedAttributes() {
        return ['editing','done'];
    }

    connectedCallback() {
        this.props.elem.done && this.setAttribute('done','')
        this.render();
    }

    attributeChangedCallback() {
        this.editing = this.hasAttribute('editing');
        this.done = this.hasAttribute('done');
        this.render();
    }

    render() {
        this.innerHTML = '';
        const task = document.createElement("div");
        task.className = `flex h-20 w-full flex-shrink-0 px-3`;

        if (this.editing) {

            const inputWrap = document.createElement("div");
            inputWrap.className = "flex items-center justify-start h-full w-full";

            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Enter Task Name...");
            input.addEventListener("click", (e) => {
                e.stopPropagation();
            });
            input.addEventListener("blur", () => this.removeAttribute('editing'));
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    input.value !== '' && (this.props.elem.contents = input.value);
                    this.props.save();
                    input.blur();
                }
            });
            input.className =
                "px-2 h-8 font-bold bg-secondary dark:bg-primary border-2 border-lighter dark:border-darker outline-none w-full";

            inputWrap.append(input);
            task.append(inputWrap);
            setTimeout(() => {
                input.focus();
            })
        } else {
            const checkWrap = document.createElement("div");
            checkWrap.className = "flex items-center justify-center w-10 me-6";

            const check = document.createElement("i");
            check.className = `${this.props.elem.done ? 'ri-checkbox-line ' : 'ri-checkbox-blank-line'} text-4xl`;
            check.addEventListener("click", (e) => {
                this.props.elem.done = !this.props.elem.done;
                this.toggleAttribute('done')
                this.props.save();
            })

            checkWrap.append(check);

            const textWrap = document.createElement("div");
            textWrap.className = "flex grow items-center";

            const span1 = document.createElement("span");
            span1.className = `font-bold decoration-2 text-lg${this.props.elem.done ? ' line-through' : ''}`;
            span1.innerText = this.props.elem.contents;

            const buttons = document.createElement("div");
            buttons.className = "buttons flex items-center justify-center text-3xl";

            const edit = document.createElement("button");
            const editIcon = document.createElement('i');
            editIcon.className = "ri-edit-line";
            edit.addEventListener("click", (e) => {
                e.stopPropagation();
                this.setAttribute('editing', '')
            });
            edit.append(editIcon);

            const trash = document.createElement("button");
            const trashIcon = document.createElement("i");
            trashIcon.className = "ri-delete-bin-6-line";
            trash.addEventListener("click", (e) => {
                e.stopPropagation();
                this.props.removeTaskItem(this.props.i);
            });
            trash.append(trashIcon);

            textWrap.append(span1);
            buttons.append(edit, trash);
            task.append(checkWrap, textWrap, buttons);
        }
        this.append(task);
    }
}
customElements.define("task-item", TaskItem);