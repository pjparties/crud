// Update with your config settings.

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/products.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/migrations",
    },
  },
};
