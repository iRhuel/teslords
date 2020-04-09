import { Sequelize, Options } from 'sequelize';

import dbConfigAll from './config.js';

const { DATABASE_URL } = process.env;

const dbConfig = (dbConfigAll[(process.env.NODE_ENV as keyof typeof dbConfigAll) || 'development'] as any) as Options;

const db = new Sequelize(DATABASE_URL!, {
  ...dbConfig,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const startDB = async () => {
  try {
    await db.authenticate();

    if (process.env.SEQUELIZE_SYNC) {
      console.log('executing sequelize sync');
      await db.sync();
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log('Database connection has been established successfully.');
    }
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }
};

export default db;
