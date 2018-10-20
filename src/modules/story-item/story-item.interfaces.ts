import * as mongoose from 'mongoose';

export interface StoryItemDefinition {
  title: string;
  gameId: string;
  description: string;
  image: string;
  labels: string[];
  location: {
    type: 'Point';
    coordinates: Number[];
  };
}

export interface StoryItemsModel extends StoryItemDefinition, mongoose.Document {}
