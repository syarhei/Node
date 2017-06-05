const config = require('../config.json');

module.exports = (Sequelize) => {
    const cf = process.env.NODE_ENV === 'production' ? config.pg : config.db;

    const options = {
        host: cf.host,
        dialect: cf.dialect,
        logging: false,
        define: {
            paranoid: false,
            timestamps: false
        }
    };

    const sequelize = new Sequelize(cf.name, cf.user, cf.password, options);
    const item = require('../models/item') (Sequelize, sequelize);

    return {
        item: item,
        sequelize: sequelize
    };
};