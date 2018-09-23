export const createMongoConnectionString = () => {
  return process.env.MONGO_CONNECTION_STRING.replace('<user>', process.env.MONGO_USER)
    .replace('<password>', process.env.MONGO_PASSWORD)
    .replace('<database>', process.env.MONGO_DATABASE);
};

export const createSnsTopicArn = () => {
  return `arn:aws:sns:${process.env.AWS_CONFIG_REGION}:${process.env.AWS_CONFIG_ACCOUNT_ID}:${process.env.SNS_TOPIC_NAME}`;
};
