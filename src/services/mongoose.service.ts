import { IAppContainer } from '..';
import * as mongoose from 'mongoose';
import { IHandlerService } from './handler.service';

export class MongooseService implements IHandlerService {
  private connectionString;
  private initializationLastAttempt: boolean = false;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  public async register(container: IAppContainer) {
    if (container.mongoose.connection === null) {
      this.initializationLastAttempt = true;
      container.mongoose.connection = await mongoose.connect(this.connectionString);
    } else {
      this.initializationLastAttempt = false;
    }
  }

  public getInitializationLastAttempt() {
    return this.initializationLastAttempt;
  }
}
