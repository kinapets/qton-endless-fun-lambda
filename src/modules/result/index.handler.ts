import { IHandlerServices, APIGatewayEventHandler, HttpError } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';

import { IAppContainer } from '../..';
import { MongooseService } from '../../services/mongoose.service';
import Result from '../result/result.model';

interface IRekognitionHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
}

export class ResultHandler extends APIGatewayEventHandler {
  constructor(services: IRekognitionHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
  }

  async process(event: APIGatewayEvent, context: Context) {
    const user = event.headers.Authorization;
    const gameId = event.pathParameters.gameId;
    if (!user) {
      throw new HttpError({ statusCode: 401, body: { message: 'Authorization header missing' } });
    }

    const results = await Result.find({ user, gameId })
      .lean()
      .exec();

    return this.response({ body: { results } });
  }
}
