require('dotenv').config(); //importing dotenv so we have acess to the env file
const { createPool } = require('mysql');
// Create connection variable
let connection = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    port: process.env.dbPort,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 30
});
module.exports = connection;



/*
1.import on L1
2. then install mysql == nmp i mysql
3. export connecnting L13




 */