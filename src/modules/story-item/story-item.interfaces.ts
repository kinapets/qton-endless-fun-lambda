import * as mongoose from 'mongoose';

export interface StoryItemDefinition {
  title: string;
  gameId: string;
  description: string;
  location: {
    type: 'Point';
    coordinates: Number[];
  };
}

export interface StoryItemsModel extends StoryItemDefinition, mongoose.Document {}
