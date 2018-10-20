import { IHandlerServices, APIGatewayEventHandler } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';

import { IAppContainer } from '../..';
import { MongooseService } from '../../services/mongoose.service';
import StoryItem from '../story-item/story-item.model';
import Game from '../game/game.model';

interface IRekognitionHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
}

export class GameHandler extends APIGatewayEventHandler {
  constructor(services: IRekognitionHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
  }

  async process(event: APIGatewayEvent, context: Context) {
    const gameId = event.pathParameters.gameId;
    const storyItems = await StoryItem.find({ gameId })
      .lean()
      .exec();

    const game = await Game.findOne({ gameId })
      .lean()
      .exec();

    if (storyItems.length === 0) {
      return this.response({ statusCode: 404, body: { message: `Game with id ${gameId} was not found` } });
    }
    return this.response({ body: { storyItems, ...game } });
  }
}
