import { Game } from '../create-game';
//tslint:disable
export const qton: Game = {
  game: {
    description: 'Qton 3.0 game',
    gameId: 'qton',
    title: 'Příběh stvořený přímo pro hackathon 3.0 v Průšalabu',
    image: null,
  },
  storyItems: [
    {
      title: 'Najdi si své místo',
      subtitle: 'Židle',
      gameId: 'qton',
      description: 'Každý člověk je rád když si může najít své místo v životě - není nad to když bude i tak trochu na hraně - židle',
      location: {
        type: 'Point',
        coordinates: [50.1089771, 14.4369199],
      },
      labels: ['Chair'],
      image: null,
    },
    {
      title: 'Model formule 1',
      subtitle: 'Najdi model formule 1 uvnitř Průšalabu',
      gameId: 'qton',
      description: '3D tisk, laser CNC, komplexní modelování není v průšalabu žádný problém, můžeme si vyzkoušet vše co je jen možné.',
      location: {
        type: 'Point',
        coordinates: [50.1090537, 14.4360092],
      },
      labels: ['Formula One', 'Car'],
      image: null,
    },
    {
      title: 'Skvělá parta lidí',
      subtitle: 'Udělej si fotku s někým tady na hackathonu, hackathon je plný zajáímavých lidí.',
      gameId: 'qton',
      description:
        'Letošního hackathonu se zúčastnilo 8 týmů a skoro 40 lidí. Vzniklo spoustu skvělých nápadů jak zlepšit nejen město ale i celý svět.',
      location: {
        type: 'Point',
        coordinates: [50.1089771, 14.4369199],
      },
      labels: ['Human'],
      image: null,
    },
    {
      title: 'Jídlo základ života',
      subtitle: 'Zaznamenej to skvělé jídlo které nás provází celým hackathonem!!!!',
      gameId: 'qton',
      description: 'Jídlo na hackathonu bylo nejen naprosto úžasné ale i naprosto úžasně zdravé. Měli jsme se opravdu velmi velmi dobře.',
      location: {
        type: 'Point',
        coordinates: [50.1089771, 14.4369199],
      },
      labels: ['Food'],
      image: null,
    },
    {
      title: 'Víš kam s odpadky?',
      subtitle: 'Jednou všechna sranda ',
      gameId: 'qton',
      description: 'Bylo více než důležité po sobě pěkně uklidit. A na to jsme měli tyhle skvělé popelnice které nám ulehčili život.',
      location: {
        type: 'Point',
        coordinates: [50.1089771, 14.4369199],
      },
      labels: ['Trash Can', 'Tin', 'Can'],
      image: null,
    },
  ],
};
