import { FeatureCollection } from 'geojson';
import { IActions, ILayer, ISource, SourceType } from '../../services/meiosis';

const testPointSourceRed = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'red',
        type: 'man',
      },
      geometry: {
        type: 'Point',
        coordinates: [4.274904727935791, 52.05700299480173],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'red',
        type: 'man',
      },
      geometry: {
        type: 'Point',
        coordinates: [4.274207353591919, 52.05807827925525],
      },
    },
  ],
};

const testPointSourceBlue = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'blue',
        type: 'man',
      },
      geometry: {
        type: 'Point',
        coordinates: [4.281256198883057, 52.05706896391835],
      },
    },
  ],
};

const testPointSourcewWhite = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'white',
        type: 'man',
      },
      geometry: {
        type: 'Point',
        coordinates: [4.279088973999023, 52.05478637585534],
      },
    },
  ],
};

export const addISources = (actions: IActions) => {
  actions.addISource({
    id: 'id-of-test-source-red',
    source: testPointSourceRed as FeatureCollection,
    sourceName: 'TESTPOINTSOURCERED',
    sourceCategory: SourceType.realtime,
    shared: false,
    layers: [
      {
        layerName: 'testpointREDlayer',
        showLayer: true,
        type: { type: 'symbol' } as maplibregl.LayerSpecification,
        layout: {
          'icon-image': 'RED',
          'icon-size': 0.5,
          'icon-allow-overlap': true,
        },
      },
    ] as ILayer[],
  } as ISource);

  actions.addISource({
    id: 'id-of-test-source-blue',
    source: testPointSourceBlue as FeatureCollection,
    sourceName: 'TESTPOINTSOURCEBLUE',
    sourceCategory: SourceType.realtime,
    shared: false,
    layers: [
      {
        layerName: 'testpointbluelayer',
        showLayer: true,
        type: { type: 'symbol' } as maplibregl.LayerSpecification,
        layout: {
          'icon-image': 'BLUE',
          'icon-size': 0.5,
          'icon-allow-overlap': true,
        },
      },
    ] as ILayer[],
  } as ISource);

  actions.addISource({
    id: 'id-of-test-source-white',
    source: testPointSourcewWhite as FeatureCollection,
    sourceName: 'TESTPOINTSOURCEWIT',
    sourceCategory: SourceType.realtime,
    shared: false,
    layers: [
      {
        layerName: 'testpointwhitelayer',
        showLayer: true,
        type: { type: 'symbol' } as maplibregl.LayerSpecification,
        layout: {
          'icon-image': 'WHITE',
          'icon-size': 0.5,
          'icon-allow-overlap': true,
        },
      },
    ] as ILayer[],
  } as ISource);
};
