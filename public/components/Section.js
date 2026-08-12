export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this.container.prepend(element);
    }
    renderItems() {
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }
}
