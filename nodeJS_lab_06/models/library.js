module.exports=(Sequelize,sequelize)=>{
    return sequelize.define('library',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title: {
            type: Sequelize.STRING,
            scopes: {
                create: { set: true }
            }
        },
        capacity:Sequelize.INTEGER
    }, {
        scopes: {
            size: {
                where: {
                    capacity: {
                        $gte: 150
                    }
                }
            },
            between_id: {
                where: {
                    id: {
                        $between: [1,40]
                    }
                }
            },
            title_lib: {
                where: {
                    title: {
                        $like: '%lib%'
                    }
                }
            },
            size_fn: function () {
                return {
                    where: {
                        capacity: {
                            $lte: 4000
                        }
                    }
                }
            },
            size_fn_param: function (value) {
                return {
                    where: {
                        capacity: {
                            $lte: value
                        }
                    }
                }
            }
        }
    });
};