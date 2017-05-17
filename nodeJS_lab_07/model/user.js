/**
 * Created by Sergei on 07.02.2017.
 */
function user(sequelize, Sequelize) {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vkId: Sequelize.STRING,
        twitterId: Sequelize.STRING,
        password: Sequelize.STRING
    });
};

exports.user = user;