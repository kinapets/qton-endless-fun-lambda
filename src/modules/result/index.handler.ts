import { IHandlerServices, APIGatewayEventHandler } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';

import { IAppContainer } from '../..';
import { MongooseService } from '../../services/mongoose.service';

interface IRekognitionHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
}

export class ResultHandler extends APIGatewayEventHandler {
  constructor(services: IRekognitionHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
  }

  async process(event: APIGatewayEvent, context: Context) {
    const gameId = event.pathParameters.gameId;
    return this.response({ body: { message: 'results', gameId } });
  }
}
