const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: process.env.NODE_ENV === 'development',
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    define: {
      timestamps: true
    }
  }
);

sequelize.authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .catch(err => {
    console.error('Erro ao conectar/sincronizar o banco de dados:', err);
  });

module.exports = sequelize;
