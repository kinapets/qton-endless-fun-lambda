import { IHandlerServices, APIGatewayEventHandler } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';

import { IAppContainer } from '../..';

interface IRekognitionHandlerServices extends IHandlerServices {}

export class ResultHandler extends APIGatewayEventHandler {
  constructor(services: IRekognitionHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
  }

  async process(event: APIGatewayEvent, context: Context) {
    const gameId = event.pathParameters.gameId;
    return this.response({ body: { message: 'results', gameId } });
  }
}
