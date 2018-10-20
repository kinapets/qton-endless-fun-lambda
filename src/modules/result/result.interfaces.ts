import * as mongoose from 'mongoose';

export interface ResultDefinition {
  user: string;
  storyItemId: string;
  gameId: string;
  image: string;
  note: string;
}

export interface ResultsModel extends ResultDefinition, mongoose.Document {}
