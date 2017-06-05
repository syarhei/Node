/**
 * Created by Sergei on 05.06.2017.
 */

module.exports = (item) => {
    function Item(item) {
        this.getItems = getItems;
        this.addItem = addItem;
        this.deleteItem = deleteItem;

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

        function deleteItem(options) {
            return new Promise((resolve, reject) => {
                item.destroy({ where: {
                    id: options.id
                }}).then(resolve).catch(reject);
            })
        }
    }

    return new Item(item);
};