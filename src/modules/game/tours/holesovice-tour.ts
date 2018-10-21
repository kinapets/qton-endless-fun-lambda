import { Game } from '../create-game';
//tslint:disable
export const holesoviceTour: Game = {
  game: {
    description: 'holesovice je nejlepsi mesto na svete',
    gameId: 'holesoviceTour',
    title: 'holesouvice cesta z mesta',
    image: null,
  },
  storyItems: [
    {
      title: 'Není nad pěknou čerpací stanici',
      subtitle: 'Kdopak nám najde čerpací stanici plnou příběhu',

      gameId: 'holesoviceTour',
      description: 'Žil pán a ten měl jeden krám, ten krám byla čerpací stanice a nezbylo z ní nikdy více.',
      location: {
        type: 'Point',
        coordinates: [50.1087416, 14.4370219],
      },
      labels: ['Automobile', 'Road'],
      image: null,
    },
    {
      title: 'Best place to live',
      subtitle: 'Nádraží holešovice',
      gameId: 'holesoviceTour',
      description:
        'Někdy je vláček a je to vláček motoráček, prostě jen tak sviští jako lidi na smetišti no a co více říce když máme jenom lžíce ',
      location: {
        type: 'Point',
        coordinates: [50.1100984, 14.4384006],
      },
      labels: ['Terminal', 'Train Station', 'Subway'],
      image: null,
    },
  ],
};
