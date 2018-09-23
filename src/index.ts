import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import * as mongoose from 'mongoose';
import { InfoHandler } from './modules/info/info.handler';
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

export const hello = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
};

const infoHandler = new InfoHandler(
  {
    mongooseService: new MongooseService('test'),
  },
  AppContainer,
);

export const info = infoHandler.handle;
