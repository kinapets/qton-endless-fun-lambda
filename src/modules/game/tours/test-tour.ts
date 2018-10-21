import { Game } from '../create-game';
//tslint:disable
export const testTour: Game = {
  game: {
    description: 'holesovice je nejlepsi mesto na svete',
    gameId: 'testTour',
    title: 'holesouvice cesta z mesta',
    image: null,
  },
  storyItems: [
    {
      title: 'first title game',
      subtitle: 'firtst litle Class aptent taciti sociosqu ad litora torquent per conubia nostra',

      gameId: 'testTour',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aenean vel massa quis mauris vehicula lacinia. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Fusce tellus. Pellentesque pretium lectus id turpis. Cras elementum. Fusce aliquam vestibulum ipsum. Proin mattis lacinia justo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Praesent id justo in neque elementum ultrices. Pellentesque pretium lectus id turpis. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut tempus purus at lorem. Maecenas lorem. Nunc dapibus tortor vel mi dapibus sollicitudin. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus.',
      location: {
        type: 'Point',
        coordinates: [50.109245, 14.437835],
      },
      labels: ['Road'],
      image: null,
    },
    {
      title: 'nadrazi holesovice',
      subtitle: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
      gameId: 'testTour',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aenean vel massa quis mauris vehicula lacinia.',
      location: {
        type: 'Point',
        coordinates: [50.109245, 14.437835],
      },
      labels: ['Road'],
      image: null,
    },
  ],
};
