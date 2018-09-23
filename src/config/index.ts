import { createMongoConnectionString, createSnsTopicArn } from './properties.factory';

export const config = {
  mongoConnectionString: createMongoConnectionString(),
  snsTopicArn: createSnsTopicArn(),
  awsRegion: process.env.AWS_CONFIG_REGION,
};
