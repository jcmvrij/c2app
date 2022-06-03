import faker from '@faker-js/faker';
import { Point, Polygon } from 'geojson';
import { GeoJSONFeature } from 'maplibre-gl';
import { MapLibrePluginBBox, MapLibrePluginState } from 'mithril-ui-form-maplibre-plugin';
import { IMapLibreSource } from 'mithril-ui-form-maplibre-plugin/lib/componentUtils';

export const loadPresetGame1 = () => {
  return {
    gameId: faker.random.words(2).toLowerCase(),
    gameLocation: {
      polygons: {
        type: 'FeatureCollection',
        features: [],
      },
    },
    players: [
      { name: 'Player1', team: 'blue' },
      { name: 'Player2', team: 'red' },
    ],
    gameUnitLocations: {
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

export const loadEmptyConfiguration = () => {
  return {
    id: faker.random.words(2).toLowerCase(),
    map: {} as MapLibrePluginState,
    teams: [{}, {}],
  };
};

export const loadEmptyConfiguration2 = () => {
  return {
    gameUnitPlacement: {},
  };
};

export const boundingBoxFromPolygon = (feature: GeoJSONFeature) => {
  const points = (feature.geometry as Polygon).coordinates;
  const pointsFlattened = Array.prototype.concat.apply([], points);

  const collectedLongs: number[] = [];
  const collectedLats: number[] = [];
  pointsFlattened.forEach((point) => {
    collectedLongs.push(point[0]);
    collectedLats.push(point[1]);
  });

  return {
    sw: {
      lng: Math.min(...collectedLongs),
      lat: Math.min(...collectedLats),
    },
    ne: {
      lng: Math.max(...collectedLongs),
      lat: Math.max(...collectedLats),
    },
  };
};

export interface ConfigurationBasic {
  id: string;
  location: MapLibrePluginState;
  teams: Team[];
}

export interface ConfigurationOfUnits extends Record<string, Unit[]> {}

export interface Team {
  id: string;
  name: string;
  color: string;
  units?: Unit[];
}

export interface Unit {
  id: string;
  name: string;
  type: string;
}

export const isValidConfigurationBasic = (configuration: ConfigurationBasic): boolean => {
  const { id, location, teams } = configuration;
  if (!id) {
    alert('Id is invalid');
    return false;
  }
  if (!location.polygons) {
    alert('Location is invalid');
    return false;
  }
  if (teams.length < 2 || teams.some((team) => !team.id || !team.name || !team.color)) {
    alert('Teams are misconfigured');
    return false;
  }
  return true;
};

export const isValidConfigurationOfUnits = (configuration: ConfigurationOfUnits) => {
  const { unitCreationExplanation, ...restConfig } = configuration;
  for (const key in restConfig) {
    if (Object.prototype.hasOwnProperty.call(restConfig, key)) {
      const element = restConfig[key];
      for (const unit of element) {
        if (!unit.id || !unit.name || !unit.type) {
          alert('Configuration is invalid');
          return false;
        }
      }
    }
  }
  return true;
};

export const createSources = (teams: Team[], mapBounds: MapLibrePluginBBox) => {
  const sources: IMapLibreSource[] = [];

  teams.forEach((team) => {
    const { units } = team;
    if (units)
      units.forEach((unit) => {
        sources.push({
          id: unit.id,
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
                  coordinates: [0, 0],
                },
              },
            ],
          },
          layers: [
            {
              id: 'Layer',
              // @ts-ignore
              type: 'symbol',
              layout: {
                'icon-image': team.color.toUpperCase(),
                'icon-size': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 0.7, 20, 0.2],
                'icon-allow-overlap': true,
              },
              paint: {
                'icon-opacity': 0.8,
              },
              filter: ['all'],
            },
          ],
        });
      });
  });

  let numberOfUnits = 0;
  teams.forEach((team) => (numberOfUnits += team.units!.length));
  const coordinates = createCoordinates(numberOfUnits, mapBounds);
  sources.forEach((source) => {
    const coordinate = coordinates.shift();
    if (coordinate) (source.source.features[0].geometry as Point).coordinates = coordinate;
  });
  return sources;
};

const createCoordinates = (numberOfTeams: number, mapBounds: MapLibrePluginBBox) => {
  const midLng = (mapBounds.sw.lng + mapBounds.ne.lng) / 2;
  const midLat = (mapBounds.sw.lat + mapBounds.ne.lat) / 2;
  const coordinates = [];
  let gapFromPoint = 0;
  for (let index = 0; index < numberOfTeams; index++) {
    coordinates.push([midLng + gapFromPoint, midLat]);
    gapFromPoint += 0.001;
  }
  return coordinates;
};
