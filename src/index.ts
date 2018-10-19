import * as mongoose from 'mongoose';
import { config } from './config';
import { RekognizeHandler } from './modules/rekognize/index.handler';
import { MongooseService } from './services/mongoose.service';

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
  },
  AppContainer,
);
export const recognize = recognizeHandler.handle;
