import * as mongoose from 'mongoose';
import { config } from './config';
import { RekognizeHandler } from './modules/story-item/index.handler';
import { MongooseService } from './services/mongoose.service';
import { AwsService } from './services/aws.service';
import { GameHandler } from './modules/game/index.handler';
import { ResultHandler } from './modules/result/index.handler';

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

const mongooseService = new MongooseService(config.mongoConnectionString);
const awsService = new AwsService({ rekognition: { region: 'eu-west-1' }, s3: { bucket: 'endless-fun-image-storage' } });

const recognizeHandler = new RekognizeHandler(
  {
    mongooseService,
    awsService,
  },
  AppContainer,
);
export const recognize = recognizeHandler.handle;

const gameHandler = new GameHandler({ mongooseService }, AppContainer);
export const game = gameHandler.handle;

const resultsHandler = new ResultHandler({ mongooseService }, AppContainer);
export const results = resultsHandler.handle;
