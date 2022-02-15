
const mysql_package = require("mysql");

const dotenv_package = require("dotenv");
const { static } = require("express");

dotenv_package.config();

//configuring the connection
const my_conn = mysql_package.createConnection({
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

//creating the connection
my_conn.connect(function (error) {

    if (error) {
        console.log("not connected");
        console.log(error);
        return;
    }
    console.log("connected");
})

// a class to get an instance of the connection to database and then to get connected
class My_db
{
    static get_db_instance(){
        return new My_db();
    }

    get_conn() {
        return my_conn;
    }
}

module.exports = My_db;