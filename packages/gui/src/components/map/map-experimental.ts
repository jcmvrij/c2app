import { FeatureCollection } from 'geojson';
import { IAppModel, ILayer, ISource, SourceType } from '../../services/meiosis';
import * as turf from '@turf/turf';
// import { displayInfoSidebar } from './map-utils';
// import { GeoJSONFeature, GeoJSONSource } from 'maplibre-gl';

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

export const experimentalFunctionality = (appState: IAppModel, map: maplibregl.Map) => {
  appState.app.sources.push({
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
  } as ISource);

  map.addSource('circleData', {
    type: 'geojson',
    data: turf.circle([4.274904727935791, 52.05700299480173], 0.1),
  });

  // const layersToToggle = [ 'country', 'water', 'terrain_z0-Z12', 'terrain_z12-Z20', 'water_line', 'urban_z0-Z12', 'urban_z12-Z20', 'roads_case', 'roads_fill', 'train_case', 'train_fill', 'province_borders', 'labels_highway', 'water_labels', 'building_labels', 'labels_roads_top10'];
  // const layersToToggle = [
  //   'roads_case',
  //   'roads_fill',
  //   'province_borders',
  //   'labels_highway',
  //   'water_labels',
  //   'building_labels',
  //   'labels_roads_top10',
  // ];

  // map.on('click', 'testpointlayer', (e) => {
  //   map.moveLayer('water', 'urban_z0-Z12');
  //   displayInfoSidebar(e.features as GeoJSONFeature[], actions);
  //   (map.getSource('circleData') as GeoJSONSource).setData(
  //     turf.circle(((e.features as GeoJSONFeature[])[0].geometry as Point).coordinates, 0.5)
  //   );
  //   layersToToggle.forEach((layer) => {
  //     map.setLayoutProperty(layer, 'visibility', 'none');
  //   });
  //   map.addLayer(
  //     {
  //       id: 'circle-fill',
  //       type: 'fill',
  //       source: 'circleData',
  //       layout: {
  //         visibility: 'visible',
  //       },
  //       paint: {
  //         'fill-color': 'red',
  //         'fill-opacity': 0.5,
  //       },
  //     },
  //     'water'
  //   );
  // });
  // map.on('click', 'circle-fill', (e) => {
  //   const renderedFeatures = map.queryRenderedFeatures(e.point);
  //   if (renderedFeatures[0].layer.id === 'circle-fill') {
  //     (map.getSource('circleData') as GeoJSONSource).setData(turf.circle([e.lngLat.lng, e.lngLat.lat], 0.5));
  //     testPointSource.features[0].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat];
  //     (map.getSource('TESTPOINTSOURCE') as GeoJSONSource).setData(testPointSource as FeatureCollection);
  //   } else {
  //     console.log('Clicking here is not allowed.');
  //   }
  // });
  // map.on('mouseleave', 'circle-fill', () => {
  //   map.moveLayer('water', 'terrain_z0-Z12');
  //   layersToToggle.forEach((x) => {
  //     map.setLayoutProperty(x, 'visibility', 'visible');
  //   });
  //   map.removeLayer('circle-fill');
  // });
};
