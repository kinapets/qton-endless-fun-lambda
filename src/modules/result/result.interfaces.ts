import * as mongoose from 'mongoose';

export interface ResultDefinition {
  user: string;
  game: string;
  title: string;
  description: string;
  image: string;
  tasks: { label: string; description: string }[];
  location: {
    type: 'Point';
    coordinates: Number[];
  };
}

export interface ResultsModel extends ResultDefinition, mongoose.Document {}
