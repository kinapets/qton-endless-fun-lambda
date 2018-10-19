export const createMongoConnectionString = () => {
  return process.env.MONGO_CONNECTION_STRING.replace('<user>', process.env.MONGO_USER)
    .replace('<password>', process.env.MONGO_PASSWORD)
    .replace('<database>', process.env.MONGO_DATABASE);
};
