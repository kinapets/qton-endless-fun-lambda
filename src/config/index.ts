import { createMongoConnectionString } from './properties.factory';

export const config = {
  mongoConnectionString: createMongoConnectionString(),
  awsRegion: process.env.AWS_CONFIG_REGION,
};
