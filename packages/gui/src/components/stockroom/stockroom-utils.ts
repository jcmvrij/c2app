import faker from '@faker-js/faker';

export const loadPresetGame1 = () => {
  return {
    gameId: faker.random.words(2).toLowerCase(),
    gameArea: 'map1',
    players: [
      { name: 'Player1', team: 'blue' },
      { name: 'Player2', team: 'red' },
    ],
    libremap: {
      polygons: {
        type: 'FeatureCollection',
        features: [
          {
            id: '4430943cc1c115dab684af7716c01672',
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: [
                [
                  [4.325164424453902, 52.110598279004506],
                  [4.326287984399585, 52.109583138578614],
                  [4.3241056852743895, 52.10957650359774],
                  [4.325164424453902, 52.110598279004506],
                ],
              ],
              type: 'Polygon',
            },
          },
        ],
      },
      sources: [
        {
          id: 'TeamBlueUnit1',
          source: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  movable: true,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [4.327293, 52.11],
                },
              },
            ],
          },
          layers: [
            {
              id: 'Layer',
              // type: 'circle',
              // layout: {},
              type: 'symbol',
              layout: {
                'icon-image': 'BLUE',
                'icon-size': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 0.7, 20, 0.2],
                'icon-allow-overlap': true,
              },
              paint: {
                'icon-opacity': 0.8,
                // 'circle-radius': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 30, 20, 5],
                // 'circle-color': '#3887be',
              },
              filter: ['all'],
            },
          ],
        },
        {
          id: 'TeamRedUnit1',
          source: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  movable: true,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [4.327293, 52.111],
                },
              },
            ],
          },
          layers: [
            {
              id: 'Layer',
              // type: 'circle',
              // layout: {},
              type: 'symbol',
              layout: {
                'icon-image': 'RED',
                'icon-size': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 0.7, 20, 0.2],
                'icon-allow-overlap': true,
              },
              paint: {
                'icon-opacity': 0.8,
                // 'circle-radius': 15,
                // 'circle-color': '#eb4034',
              },
              filter: ['all'],
            },
          ],
        },
        {
          id: 'TeamWhiteUnit1',
          source: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  movable: true,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [4.327293, 52.112],
                },
              },
            ],
          },
          layers: [
            {
              id: 'Layer',
              // type: 'circle',
              // layout: {},
              type: 'symbol',
              layout: {
                'icon-image': 'WHITE',
                'icon-size': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 0.7, 20, 0.2],
                'icon-allow-overlap': true,
              },
              paint: {
                // 'circle-radius': 15,
                // 'circle-color': '#ffffff',
                // 'circle-stroke-color': '#eb4034',
                // 'circle-stroke-width': 1,
              },
              filter: ['all'],
            },
          ],
        },
      ],
    },
  };
};

export const createEmptyConfiguration = () => {
  return {
    gameId: faker.random.words(2).toLowerCase(),
    gameArea: '',
    players: [{ id: '', name: '', team: '' }],
    // turn: [],
    // boardResult: {
    //   blue: {},
    //   red: {},
    //   white: {},
    // },
    libremap: {},
  };
};
