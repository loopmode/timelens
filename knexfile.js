module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './.local/default.sqlite3',
    },
    migrations: {
      directory: './static/db/migrations',
    },
    seeds: {
      directory: './static/db/seeds',
    },
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './static/db/default.sqlite3',
    },
    migrations: {
      directory: './static/db/migrations',
    },
    seeds: {
      directory: './static/db/seeds',
    },
  },
};
// https://medium.com/@MajikMan/starting-a-node-project-from-scratch-with-sqlite3-knex-and-express-fb4b765aca
