import { createMongoConnectionString } from './mongo-connection-string.factory';

export const config = {
  mongoConnectionString: createMongoConnectionString(),
};
