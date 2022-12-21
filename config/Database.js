import { Sequelize } from 'sequelize';

const db = new Sequelize('warung_online2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
