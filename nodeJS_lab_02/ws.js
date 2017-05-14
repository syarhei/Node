var bus = require('./bus');

var ws_server = require('ws');

var server = new ws_server.Server({
    port: 8082
});

server.on('connection', function(ws) {
    ws.on('message', function(message) {
        var client = {
            socket: ws,
            action: null,
            alltime: false,
            onetime: false,
            package: 0,
            notify: (data, bus)=> {
                if (client.action == "add")
                    ws.send('Добавлена статья ' + data.header);
                if (client.action == "del")
                    ws.send('Удалена статья ' + data.header);
                if (client.action == "upd")
                    ws.send('Изменена статья ' + data);
            }
        };

        if (message == "add") {
            ws.send("Вы подписались на добавление");
            client.action = message;
            client.alltime = true;
            bus.subscribe(client, 1);
        }

        if (message == "del") {
            ws.send("Вы подписались на удаление");
            client.action = message;
            client.alltime = true;
            bus.subscribe(client, 2);
        }

        if (message == "upd") {
            ws.send("Вы подписались на изменение");
            client.action = message;
            client.alltime = true;
            bus.subscribe(client, 3);
        }

        if (message == "add_one") {
            ws.send("Вы подписались на одинарное добавление");
            client.action = "add";
            client.onetime = true;
            bus.subscribe(client, 1);
        }

        if (message == "del_one") {
            ws.send("Вы подписались на одинарное удаление");
            client.action = "del";
            client.onetime = true;
            bus.subscribe(client, 2);
        }

        if (message == "upd_one") {
            ws.send("Вы подписались на одинарное изменение");
            client.action = "upd";
            client.onetime = true;
            bus.subscribe(client, 3);
        }

        if (message == "unsub_add") {
            ws.send("Вы отписались от добавления");
            bus.unsubscribe(client, 1);
        }

        if (message == "unsub_del") {
            ws.send("Вы отписались от удаления");
            bus.unsubscribe(client, 2);
        }

        if (message == "unsub_upd") {
            ws.send("Вы отписались от изменения");
            bus.unsubscribe(client, 3);
        }

        if (message.substr(0,8) == "pack_add") {
            ws.send("Вы подписались на пакетное добавление (" + message.substr(8, message.length - 8) + ")");
            client.action = "add";
            client.package = parseInt(message.substr(8, message.length - 8)) - 1;   // отнимаем 1
            bus.subscribe(client, 1);
        }

        if (message.substr(0,8) == "pack_del") {
            ws.send("Вы подписались на пакетное удаление (" + message.substr(8, message.length - 8) + ")");
            client.action = "del";
            client.package = parseInt(message.substr(8, message.length - 8)) - 1;   // отнимаем 1
            bus.subscribe(client, 2);
        }

        if (message.substr(0,8) == "pack_upd") {
            ws.send("Вы подписались на пакетное изменение (" + message.substr(8, message.length - 8) + ")");
            client.action = "upd";
            client.package = parseInt(message.substr(8, message.length - 8)) - 1;   // отнимаем 1
            bus.subscribe(client, 3);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ');
    });
});


