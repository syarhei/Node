module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options); // подключаемся к БД
    const user = require('../models/user')(Sequelize, sequelize);  // определяем все наши объекты базы данных
    const domain = require('../models/domain') (Sequelize, sequelize);

    user.hasMany(domain);
    domain.belongsTo(user);

    return {
        user: user,
        domain: domain,
        sequelize: sequelize
    };
};