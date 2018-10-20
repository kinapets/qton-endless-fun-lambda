import * as mongoose from 'mongoose';

export interface GameDefinition {
  title: string;
  description: string;
  image: string;
  gameId: string;
}

export interface GamesModel extends GameDefinition, mongoose.Document {}
