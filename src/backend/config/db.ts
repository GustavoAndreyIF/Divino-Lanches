import * as mysql from "mysql";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const db = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "",
  port: 3307,
  database: process.env.DATABASE,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("conectado ao banco...");
  }
});

export default db;
