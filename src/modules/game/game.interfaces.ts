import * as mongoose from 'mongoose';

export interface GameDefinition {
  title: string;
}

export interface GamesModel extends GameDefinition, mongoose.Document {}
