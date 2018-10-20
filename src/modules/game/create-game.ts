import { StoryItemDefinition } from '../story-item/story-item.interfaces';
import StoryItemModel from '../story-item/story-item.model';
import * as mongoose from 'mongoose';

const holesoviceTour: StoryItemDefinition[] = [
  {
    title: 'first title game',
    gameId: 'holesoviceTour',
    description: 'holesovice tour description',
    location: {
      type: 'Point',
      coordinates: [50.1006155, 14.437384],
    },
    labels: ['road'],
    image: null,
  },
  {
    title: 'nadrazi holesovice',
    gameId: 'holesoviceTour',
    description: 'nadrazo holesovice',
    location: {
      type: 'Point',
      coordinates: [50.1090312, 14.4401134],
    },
    labels: ['road'],
    image: null,
  },
];

async function main() {
  //tslint:disable
  await mongoose.connect(
    'mongodb://flat-checker:fu4Di4thu6@flat-checker-shard-00-00-esftu.mongodb.net:27017,flat-checker-shard-00-01-esftu.mongodb.net:27017,flat-checker-shard-00-02-esftu.mongodb.net:27017/flat-checker?ssl=true&replicaSet=flat-checker-shard-0&authSource=admin&retryWrites=true',
  );
  await StoryItemModel.remove({});
  return StoryItemModel.create(holesoviceTour);
}
main().then((done) => process.exit(0));
