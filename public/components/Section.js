export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this.container.prepend(element);
    }
    setItems(items) {
        this.items = items;
    }
    renderItems(items) {
        if (items) {
            this.items = items;
        }
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }
}
