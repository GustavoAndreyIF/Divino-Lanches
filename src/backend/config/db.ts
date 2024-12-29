import * as mysql from 'mysql'
import 'dotenv/config'

const db = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.USER || 'root',
    password: process.env.PASSWORD ||'',
    port: 3306,
    database: process.env.DATABASE,
    multipleStatements: true
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log('conectado ao banco...')
    }
})