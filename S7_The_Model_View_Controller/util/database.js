const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete-course',
  password: '12042003',
});

module.exports = pool.promise();
