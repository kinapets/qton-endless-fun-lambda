import { StoryItemDefinition } from '../story-item/story-item.interfaces';
import StoryItemModel from '../story-item/story-item.model';
import GameModel from '../game/game.model';
import * as mongoose from 'mongoose';
import { GameDefinition } from './game.interfaces';
import { holesoviceTour } from './tours/holesovice-tour';
import { testTour } from './tours/test-tour';
import { qton } from './tours/qton';
import { sundayWalking } from './tours/sunday-walking';
import { anthropoid } from './tours/anthropoid';
// tslint:disable
export interface Game {
  game: GameDefinition;
  storyItems: StoryItemDefinition[];
}

async function main() {
  //tslint:disable
  await mongoose.connect(
    'mongodb://flat-checker:fu4Di4thu6@flat-checker-shard-00-00-esftu.mongodb.net:27017,flat-checker-shard-00-01-esftu.mongodb.net:27017,flat-checker-shard-00-02-esftu.mongodb.net:27017/flat-checker?ssl=true&replicaSet=flat-checker-shard-0&authSource=admin&retryWrites=true',
  );
  await StoryItemModel.remove({});
  await GameModel.remove({});
  await GameModel.create(holesoviceTour.game);
  await StoryItemModel.create(holesoviceTour.storyItems);

  await GameModel.create(testTour.game);
  await StoryItemModel.create(testTour.storyItems);

  await GameModel.create(qton.game);
  await StoryItemModel.create(qton.storyItems);

  await GameModel.create(sundayWalking.game);
  await StoryItemModel.create(sundayWalking.storyItems);

  await GameModel.create(anthropoid.game);
  await StoryItemModel.create(anthropoid.storyItems);
}
main().then((done) => process.exit(0));
