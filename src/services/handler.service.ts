import { IAppContainer } from '..';
import { APIGatewayEvent, S3CreateEvent, CognitoUserPoolEvent, CustomAuthorizerEvent, Callback, Context } from 'aws-lambda';
import * as _ from 'lodash';

type TAwsLambdaEvent = APIGatewayEvent | S3CreateEvent | CognitoUserPoolEvent | CustomAuthorizerEvent;

export interface IHandlerService {
  register: (container: IAppContainer) => Promise<void>;
}

export interface IHandler {
  handle: (event: any, context: Context, cb: Callback) => void;
}

export interface IHandlerServices {
  [serviceName: string]: IHandlerService;
}

export abstract class Handler<E extends TAwsLambdaEvent> implements IHandler {
  protected services: { [serviceName: string]: IHandlerService };
  protected appContainer: IAppContainer;

  constructor(services: IHandlerServices, appContainer: IAppContainer) {
    this.services = services;
    this.appContainer = appContainer;
  }

  abstract async process(event: E, context: Context);

  public handle = (event: E, context: Context, cb: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const services = _.map(this.services, (service: IHandlerService) => service.register(this.appContainer));
    Promise.all(services).then(() => {
      this.process(event, context)
        .then((response) => cb(null, response))
        .catch((err) => {
          cb(null, {
            statusCode: 500,
            body: JSON.stringify({
              message: err.message,
              name: err.name,
            }),
          });
        });
    });
  };
}

export abstract class APIGatewayEventHandler extends Handler<APIGatewayEvent> {
  protected response(config: { statusCode?: number; body?: {} }) {
    const bodyObj = config.body ? { body: config.body } : {};
    const statusCode = config.statusCode ? config.statusCode : 200;
    return { ...bodyObj, statusCode };
  }
}
