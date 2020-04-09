module.exports = {
  development: {
    dialect: 'postgres',
    protocol: 'postgres',
  },
  test: {
    dialect: 'postgres',
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
