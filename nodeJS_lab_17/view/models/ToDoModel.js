const $ = require("jquery");

module.exports = class ToDoModel {
    constructor() {
        this.list = [];
    }

    syncItems(items) {
        return new Promise(resolve => {
            $.get('/api/items', items => {
                this.list = items;
                resolve();
            })
        });
    }

    getItems() {
        return this.list;
    }

    getActiveItems() {
        return this.list.filter(x => !x.completed);
    }

    getCompletedItems() {
        return this.list.filter(x => x.completed);
    }

    getActiveCount() {
        return this.list.filter(x => !x.completed).length;
    }

    getCompletedCount() {
        return this.list.filter(x => x.completed).length;
    }

    addItem(text) {
        return new Promise((resolve, reject) => {
            $.ajax({url: '/api/items', type: 'POST', data: {text: text}, success: resolve, error: reject});
        });
    }

    removeItem(id) {
        return new Promise(resolve => {
            $.ajax({url: '/api/items/' + id, type: 'DELETE', success: resolve});
        });
    }

    removeCompleted() {
        return new Promise(resolve => {
            $.ajax({url: '/api/items/completed', type: 'DELETE', success: resolve});
        });
    }

    updateItem(id, text) {
        return new Promise(resolve => {
            $.ajax({url: '/api/items/' + id, type: 'PUT', data: {text: text}, success: resolve});
        });
    }

    toggleItem(id) {
        let index = this.list.findIndex(x => x.id === id);

        return new Promise(resolve => {
            $.ajax({
                url: '/api/items/' + id,
                type: 'PUT',
                data: {completed: !this.list[index].completed},
                success: resolve
            });
        });
    }

    switchAllTo(completed) {
        return new Promise(resolve => {
            $.ajax({url: '/api/items/', type: 'PUT', data: {completed: completed}, success: resolve});
        });
    }
}