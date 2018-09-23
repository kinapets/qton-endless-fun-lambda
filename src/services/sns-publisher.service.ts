// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';
import { config } from '../config';

AWS.config.update({ region: 'eu-central-1' });

export const publishMessage = (message: { [key: string]: Object }) => {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: config.snsTopicArn,
  };
  return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
};
