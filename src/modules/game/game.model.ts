import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { GamesModel } from './game.interfaces';

export interface BModel extends Model<GamesModel> {}

const GameSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    gameId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

const bModel: BModel = <any>mongoose.model<GamesModel>('Games', GameSchema);
export default bModel;
