import { Handler, IHandlerServices } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { MongooseService } from '../../services/mongoose.service';

import * as aws from 'aws-sdk';
import Game from '../game/game.model';
import { IAppContainer } from '../..';

interface IInfoHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
}

export class RekognizeHandler extends Handler<APIGatewayEvent> {
  constructor(services: IInfoHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
  }

  private detectLabels(image: Buffer) {
    return new Promise((resolve, reject) => {
      const rekognition = new aws.Rekognition({ region: 'eu-west-1' });
      rekognition.detectLabels({ Image: { Bytes: image } }, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }

  async process(event: APIGatewayEvent, context: Context) {
    const image = Buffer.from(event.body, 'base64');
    await Game.create({ title: Math.random().toString() });
    const labels = await this.detectLabels(image);

    return {
      statusCode: 200,
      body: JSON.stringify(labels),
    };
  }
}
