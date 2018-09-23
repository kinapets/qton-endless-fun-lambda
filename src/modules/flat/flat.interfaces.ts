import * as mongoose from 'mongoose';

export interface FlatDefinition {
  title: string;
}

export interface FlatsModel extends FlatDefinition, mongoose.Document {}
