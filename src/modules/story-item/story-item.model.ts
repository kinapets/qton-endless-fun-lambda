import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { StoryItemsModel } from './story-item.interfaces';

export interface BModel extends Model<StoryItemsModel> {}

const StoryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    gameId: { type: String, required: true, index: true },
    labels: [String],
    image: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true },
);

const bModel: BModel = <any>mongoose.model<StoryItemsModel>('StoryItem', StoryItemSchema);
export default bModel;
