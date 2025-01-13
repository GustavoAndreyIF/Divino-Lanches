import * as mysql from "mysql";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

let portEnv: number = process.env.PORT ? parseInt(process.env.PORT) : 0

const db = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "",
  port: portEnv,
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
