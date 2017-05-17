/**
 * Created by Sergei on 07.02.2017.
 */

function connect(config, seq) {

    const options = {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: {$eq: null}
                }
            }
        }
    };

    return new seq(config.db.name, config.db.user, config.db.password, options); // подключаемся к БД
}

exports.connect = connect;