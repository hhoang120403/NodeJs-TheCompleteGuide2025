const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete-course', 'root', '12042003', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
