import { FeatureCollection } from 'geojson';
import { IActions, ILayer, ISource, SourceType } from '../../services/meiosis';

const testPointSource = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        type: 'man',
      },
      geometry: {
        type: 'Point',
        coordinates: [4.274904727935791, 52.05700299480173],
      },
    },
  ],
};

export const addSource = (actions: IActions) => {
  const testSource = {
    id: 'id-of-test-source',
    source: testPointSource as FeatureCollection,
    sourceName: 'TESTPOINTSOURCE',
    sourceCategory: SourceType.realtime,
    shared: false,
    layers: [
      {
        layerName: 'testpointlayer',
        showLayer: true,
        type: { type: 'symbol' } as maplibregl.LayerSpecification,
        layout: {
          'icon-image': 'FIREFIGHTER',
          'icon-size': 0.5,
          'icon-allow-overlap': true,
        },
        filter: ['all', ['in', 'type', 'man', 'firefighter']],
      },
    ] as ILayer[],
  } as ISource;
  actions.addSource(testSource);
};
