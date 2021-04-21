require('dotenv').config();

const { DB_TYPE, DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

module.exports = {

  development: {
    client: DB_TYPE,
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASS,
      host: DB_HOST,
      port: DB_PORT
    },
    migrations: {
      directory: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
