/**
 * Created by Sergei on 05.06.2017.
 */

module.exports = (item) => {
    function Item(item) {
        this.getItems = getItems;
        this.addItem = addItem;
        this.updateItem = updateItem;
        this.deleteItem = deleteItem;

        function getItemById(id) {
            return new Promise((resolve, reject) => {
                item.findById(id).then(resolve).catch(reject);
            })
        }

        function getItems(options) {
            let params = {};
            if (options != undefined && options.offset !=undefined && options.limit != undefined)
                params = {offset: options.offset, limit: options.limit};
            return new Promise((resolve, reject) => {
                item.findAll(params).then(resolve).catch(reject);
            })
        }

        function addItem(object) {
            return new Promise((resolve, reject) => {
                item.create(object).then(resolve).catch(reject);
            })
        }

        function updateItem(options) {
            return new Promise((resolve, reject) => {
                return getItemById(options.id).then((model) => {
                    let obj = { name: model.name };
                    if (model.isDone)
                        obj.push({ isDOne: false });
                    else obj.push({ isDone: true });
                    return item.update(obj).then(resolve);
                }).catch(reject)
            })
        }

        function deleteItem(options) {
            return new Promise((resolve, reject) => {
                item.destroy({ where: options}).then(resolve).catch(reject);
            })
        }
    }

    return new Item(item);
};