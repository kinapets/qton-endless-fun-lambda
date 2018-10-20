import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { ResultsModel } from './result.interfaces';

export interface BModel extends Model<ResultsModel> {}

const ResultSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },
    storyItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    gameId: { type: String, required: true },
    image: String,
    note: String,
  },
  { timestamps: true },
);

const bModel: BModel = <any>mongoose.model<ResultsModel>('Results', ResultSchema);
export default bModel;
