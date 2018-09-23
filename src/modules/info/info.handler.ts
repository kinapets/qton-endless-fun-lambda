import { Handler, IHandlerServices } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { MongooseService } from '../../services/mongoose.service';
import { IAppContainer } from '../..';
import { publishMessage } from '../../services/sns-publisher.service';

interface IInfoHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
}

export class InfoHandler extends Handler<APIGatewayEvent> {
  private mongooseService: MongooseService;
  constructor(services: IInfoHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
    this.mongooseService = services.mongooseService;
  }
  async process(event: APIGatewayEvent, context: Context) {
    await publishMessage({ test: 'testdvatri' });
    return {
      statusCode: 200,
      body: JSON.stringify({
        last: this.mongooseService.getInitializationLastAttempt(),
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      }),
    };
  }
}
