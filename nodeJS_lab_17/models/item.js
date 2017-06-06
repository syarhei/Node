/**
 * Created by Sergei on 04.06.2017.
 */

module.exports = (Sequelize,sequelize,user)=>{
    return sequelize.define('item',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        text: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
};