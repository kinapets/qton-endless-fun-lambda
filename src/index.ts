import * as mongoose from 'mongoose';
import { config } from './config';
import { RekognizeHandler } from './modules/story-item/index.handler';
import { MongooseService } from './services/mongoose.service';
import { AwsService } from './services/aws.service';

export interface IAppContainer {
  mongoose: {
    connection: mongoose.Mongoose;
  };
}

export const AppContainer: IAppContainer = {
  mongoose: {
    connection: null,
  },
};

const recognizeHandler = new RekognizeHandler(
  {
    mongooseService: new MongooseService(config.mongoConnectionString),
    awsService: new AwsService({ rekognition: { region: 'eu-west-1' }, s3: { bucket: 'endless-fun-image-storage' } }),
  },
  AppContainer,
);
export const recognize = recognizeHandler.handle;
