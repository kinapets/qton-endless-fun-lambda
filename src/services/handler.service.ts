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

  protected async registerServices(context: Context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const services = _.map(this.services, (service: IHandlerService) => service.register(this.appContainer));
    return await Promise.all(services);
  }

  public handle = (event: E, context: Context, cb: Callback) => {
    this.registerServices(context).then(() => {
      this.process(event, context)
        .then((response) => cb(null, response))
        .catch((err) => {
          cb(err);
        });
    });
  };
}

export abstract class APIGatewayEventHandler extends Handler<APIGatewayEvent> {
  protected response(config: { statusCode?: number; body?: {} }) {
    const bodyObj = config.body ? { body: JSON.stringify(config.body) } : {};
    const statusCode = config.statusCode ? config.statusCode : 200;
    return { ...bodyObj, statusCode };
  }

  public handle = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    this.registerServices(context).then(() => {
      this.process(event, context)
        .then((response) => cb(null, response))
        .catch((err) => {
          if ((err.name = 'HandlerServiceHttpError')) {
            return cb(null, { statusCode: err.reponse.statusCode, body: JSON.stringify(err.reponse.body) });
          }
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

interface IHttpErrorResponse {
  statusCode: number;
  body: { message: string };
}

export class HttpError extends Error {
  reponse: IHttpErrorResponse;
  name: string;
  constructor(reponse: IHttpErrorResponse) {
    super(reponse.body.message);
    this.reponse = reponse;
    this.name = 'HandlerServiceHttpError';
  }
}
