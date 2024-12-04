const { timeStamp } = require("console");

module.exports ={
    dialect: 'postgres',
    host: 'localhost',
    username: 'docker',
    passowrd: 'docker',
    databese: 'sqlnode',
    define:{
        timestamps: true,
        underscored: true,
    },
};

//created_at, update_at