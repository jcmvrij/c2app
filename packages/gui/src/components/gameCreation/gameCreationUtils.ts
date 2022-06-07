import faker from '@faker-js/faker';
import { Point, Polygon } from 'geojson';
import { GeoJSONFeature } from 'maplibre-gl';
import { UIForm } from 'mithril-ui-form';
import { MapLibrePluginBBox, MapLibrePluginState } from 'mithril-ui-form-maplibre-plugin';
import { IMapLibreSource } from 'mithril-ui-form-maplibre-plugin/lib/componentUtils';

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
  } as MapLibrePluginBBox;
};

export interface ConfigurationBasic {
  id: string;
  location: MapLibrePluginBBox;
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  color: string;
  units?: Unit[];
  sources?: IMapLibreSource[];
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
  if (!location) {
    alert('Location is invalid');
    return false;
  }
  if (teams.length < 2 || teams.some((team) => !team.id || !team.name || !team.color)) {
    alert('Teams are misconfigured');
    return false;
  }
  return true;
};

export const isValidConfigurationOfUnits = (_configuration: ConfigurationBasic) => {
  // const { unitCreationExplanation, ...restConfig } = configuration;
  // for (const key in restConfig) {
  //   if (Object.prototype.hasOwnProperty.call(restConfig, key)) {
  //     const element = restConfig[key];
  //     for (const unit of element) {
  //       if (!unit.id || !unit.name || !unit.type) {
  //         alert('Configuration is invalid');
  //         return false;
  //       }
  //     }
  //   }
  // }
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

export const createConfiguration = (obj: { id: string; location: MapLibrePluginState; teams: Team[] }) => {
  return {
    id: obj.id,
    location: boundingBoxFromPolygon(obj.location.polygons[0]),
    teams: obj.teams,
  } as ConfigurationBasic;
};

export const createTeamCompositionObj = (teams: Team[]) => {
  const obj: Record<string, Unit[]> = {};
  teams.forEach(
    (team) =>
      (obj[team.id] = [
        { id: '', name: faker.name.findName(), type: '' },
        { id: '', name: faker.name.findName(), type: '' },
        { id: '', name: faker.name.findName(), type: '' },
        { id: '', name: faker.name.findName(), type: '' },
      ])
  );
  return obj;
};

export const createTeamCompositionForm = (teams: Team[]) => {
  const form: UIForm = [
    {
      id: 'unitCreationExplanation',
      type: 'md',
      value: 'Units creëren',
    },
  ];
  for (let team of teams) {
    form.push({
      id: team.id,
      label: team.name + ' units',
      // @ts-ignore
      repeat: 0,
      type: [
        {
          id: 'id',
          autogenerate: 'id',
        },
        {
          id: 'name',
          label: 'Naam',
          type: 'text',
          className: 'col s8',
          iconName: 'title',
          required: true,
        },
        {
          id: 'type',
          label: 'Type',
          type: 'select',
          options: [
            {
              id: 'lightUnit',
              label: 'Light Unit',
            },
            {
              id: 'heavyUnit',
              label: 'Heavy Unit',
            },
          ],
          className: 'col s4',
        },
      ],
    });
  }
  return form;
};

export const createTeamCompositionConfiguration = (
  configurationBasic: ConfigurationBasic,
  obj: Record<string, Unit[]>
) => {
  configurationBasic.teams.forEach((team) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (team.id === key) {
          team.units = element;
        }
      }
    }
  });
  return configurationBasic;
};

export const createUnitPlacementObj = (teams: Team[], location: MapLibrePluginBBox) => {
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
                  teamId: team.id,
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
  const coordinates = createCoordinates(numberOfUnits, location);
  sources.forEach((source) => {
    const coordinate = coordinates.shift();
    if (coordinate) (source.source.features[0].geometry as Point).coordinates = coordinate;
  });

  return {
    map: {
      sources: sources,
    },
  };
};

export const createUnitPlacementConfiguration = (
  configuration: ConfigurationBasic,
  sources: IMapLibreSource[]
) => {
  configuration.teams.forEach((team) => {
    const matchingSources = sources.filter(
      (source) =>
        source.source.features[0].properties && source.source.features[0].properties.teamId === team.id
    );
    team.sources = matchingSources;
  });
  return configuration;
};

export const isValidConfiguration = (_configuration: any) => {
  return true;
};
