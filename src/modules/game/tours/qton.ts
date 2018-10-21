import { Game } from '../create-game';
//tslint:disable
export const qton: Game = {
  game: {
    description: 'Qton 3.0 game',
    gameId: 'qton',
    title: 'Příběh stvořený přímo pro hackathon 3.0',
    image: null,
  },
  storyItems: [
    {
      title: 'Život je plná poznávání - není nad to poznat nové lidi',
      subtitle: 'selfie',
      gameId: 'qton',
      description: 'Jsme rádi že se máte rádi a že budete kamarádi.',
      location: {
        type: 'Point',
        coordinates: [50.1090537, 14.4360092],
      },
      labels: ['Human', 'People', 'Person'],
      image: null,
    },
    {
      title: 'Najdi si své místo',
      subtitle: 'Židle',
      gameId: 'qton',
      description: 'Každý člověk je rád když si může najít své místo v životě - není nad to když bude i tak trochu na hraně - židle',
      location: {
        type: 'Point',
        coordinates: [50.1090537, 14.4360092],
      },
      labels: ['Chair'],
      image: null,
    },
    {
      title: 'Viděli jsme pavouka',
      subtitle: 'Židle',
      gameId: 'qton',
      description: 'Každý člověk je rád když si může najít své místo v životě - není nad to když bude i tak trochu na hraně - židle',
      location: {
        type: 'Point',
        coordinates: [50.1090537, 14.4360092],
      },
      labels: ['Spider'],
      image: null,
    },
  ],
};
