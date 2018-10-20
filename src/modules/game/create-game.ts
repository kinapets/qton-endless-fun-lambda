import { StoryItemDefinition } from '../story-item/story-item.interfaces';
import StoryItemModel from '../story-item/story-item.model';
import GameModel from '../game/game.model';
import * as mongoose from 'mongoose';
import { GameDefinition } from './game.interfaces';

interface Game {
  game: GameDefinition;
  storyItems: StoryItemDefinition[];
}

const holesoviceTour: Game = {
  game: {
    description: 'holesovice je nejlepsi mesto na svete',
    gameId: 'holesoviceTour',
    title: 'holesouvice cesta z mesta',
    image: null,
  },
  storyItems: [
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
  ],
};

async function main() {
  //tslint:disable
  await mongoose.connect(
    'mongodb://flat-checker:fu4Di4thu6@flat-checker-shard-00-00-esftu.mongodb.net:27017,flat-checker-shard-00-01-esftu.mongodb.net:27017,flat-checker-shard-00-02-esftu.mongodb.net:27017/flat-checker?ssl=true&replicaSet=flat-checker-shard-0&authSource=admin&retryWrites=true',
  );
  await StoryItemModel.remove({});
  await GameModel.remove({});
  await GameModel.create(holesoviceTour.game);
  return StoryItemModel.create(holesoviceTour.storyItems);
}
main().then((done) => process.exit(0));
