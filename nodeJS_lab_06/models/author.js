module.exports = (Sequelize,sequelize)=>{
    return sequelize.define('authors',{
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name: {
            type: Sequelize.STRING,
            set: function (value) {
                this.setDataValue('name', change(value));
            }
        },
        country:Sequelize.STRING,
        pseudonym: {
            type:Sequelize.STRING,
            validate: {
                isLowercase: true
            },
        }
    },
        {
            getterMethods: {
                psname: function () {
                    return this.getDataValue('name') + ' ' + this.getDataValue('pseudonym');
                }
            },
            hooks: {
                validationFailed: function(user, options) {
                    console.log("validationFailed");
                },
                beforeCreate: function(user, options) {
                    console.log("beforeCreate");
                },
                beforeDestroy: function(user, options) {
                    console.log("beforeDestroy");
                },
                beforeUpdate: function(user, options) {
                    console.log("beforeUpdate");
                },
                beforeSave: function(user, options) {
                    console.log("beforeSave");
                },
                beforeUpsert: function(user, options) {
                    console.log("beforeUpsert");
                },
                afterCreate: function(user, options) {
                    console.log("afterCreate");
                },
                afterDestroy: function(user, options) {
                    console.log("afterDestroy");
                },
                afterUpdate: function(user, options) {
                    console.log("afterUpdate");
                },
                afterSave: function(user, options) {
                    console.log("afterSave");
                },
                afterUpsert: function(user, options) {
                    console.log("afterUpsert");
                },

            }
        }
    );

    function change(value) {
        value = value.toLowerCase();
        return value;
    }
};