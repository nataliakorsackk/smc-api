const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
    host: '192.168.3.21',
    port: '3306',
    user: 'laura',
    password: 'laura',
    database: 'mydb',
  });

  global.connection = connection;
  return connection;
}

async function query(sql) {
  const conn = await connect();
  const [rows] = await conn.query(sql);
  return rows;
}

module.exports = { query };
