function Bus () {
    this.clients = {};
    this.emit = (event, data) => {
        var obj = this.clients[event];
        if (!obj) return;
        for (var i = 0; i < obj.length; i++) {
            obj[i].notify(data, this);
            if (!obj[i].alltime) {
                if (obj[i].onetime) {
                    obj.splice(i, 1);
                }
                else if(obj[i].package > 0) {
                    obj[i].package--;
                }
                else obj.splice(i, 1);
            }
        }
    };

    this.subscribe = (client, event) => {
        if (!this.clients[event])
            this.clients[event] = [];
        this.clients[event].push(client);
    }

    this.unsubscribe = (client, event) => {
        var obj = this.clients[event];
        for (var i = 0; i < obj.length; i++)
            if(obj[i].socket == client.socket)
                obj.splice(i,1);
    }
}

module.exports = new Bus();