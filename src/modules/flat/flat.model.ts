import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { FlatsModel } from './flat.interfaces';

export interface BModel extends Model<FlatsModel> {}

const FlatSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

const bModel: BModel = <any>mongoose.model<FlatsModel>('Flats', FlatSchema);
export default bModel;
