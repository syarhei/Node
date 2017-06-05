/**
 * Created by Sergei on 04.06.2017.
 */

module.exports = (Sequelize,sequelize,user)=>{
    return sequelize.define('item',{
        name: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        }
    });
};