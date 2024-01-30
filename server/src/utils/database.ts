import dotenv from "dotenv"
import mysql from "mysql2"
dotenv.config()

const connection = mysql.createPool({
     database:process.env.DATABASE_NAME,
    user:process.env.USER_NAME,
    password:process.env.PASSWORD,
    host:process.env.LOCALHOST,
    port:Number(process.env.PORT)
});

const database = connection.promise();

export default database;