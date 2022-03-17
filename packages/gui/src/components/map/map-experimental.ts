import { Point } from 'geojson';
import * as turf from '@turf/turf'
import { DrawableMap } from './map';
import { GeoJSONFeature, GeoJSONSource } from 'maplibre-gl';
import { displayInfoSidebar } from './map-utils';
import { IActions } from '../../services/meiosis';

export const experimentalFunctionality = (map: DrawableMap, actions: IActions) => {
    const testPointSource = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
                "type": "man"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                4.274904727935791,
                52.05700299480173
              ]
            }
          }
        ]
      };
      map.addSource('TESTPOINTSOURCE', {
        type: 'geojson',
        data: testPointSource
      });
      map.addLayer({
        'id': 'testpointlayer',
        'type': 'symbol',
        'source': 'TESTPOINTSOURCE',
        'layout': {
          'icon-image': 'FIREFIGHTER',
          'icon-size': 0.5,
        }
      });
      map.addSource('circleData', {
        type: 'geojson',
        data: turf.circle( [
          4.274904727935791,
          52.05700299480173
        ], 0.1)
      });

      map.on('mouseenter', 'testpointlayer', () => (map.getCanvas().style.cursor = 'pointer'));
      map.on('mouseleave', 'testpointlayer', () => (map.getCanvas().style.cursor = ''));
      // const layersToToggle = [ 'country', 'water', 'terrain_z0-Z12', 'terrain_z12-Z20', 'water_line', 'urban_z0-Z12', 'urban_z12-Z20', 'roads_case', 'roads_fill', 'train_case', 'train_fill', 'province_borders', 'labels_highway', 'water_labels', 'building_labels', 'labels_roads_top10'];
      const layersToToggle = ['roads_case', 'roads_fill', 'province_borders', 'labels_highway', 'water_labels', 'building_labels', 'labels_roads_top10'];

      map.on('click', 'testpointlayer', ({ features }) => {
        map.moveLayer('water', 'urban_z0-Z12');
        displayInfoSidebar(features as GeoJSONFeature[], actions);
        (map.getSource('circleData') as GeoJSONSource).setData(turf.circle((features![0].geometry as Point).coordinates, 0.5));
        layersToToggle.forEach((x) => {map.setLayoutProperty(x, 'visibility', 'none')});
        map.addLayer({
            id: "circle-fill",
            type: "fill",
            source: "circleData",
            'layout': {
              'visibility': 'visible'
            },
            paint: {
              "fill-color": "red",
              "fill-opacity": 0.5,
            },
          }, 'water');
      });
      map.on('click', 'circle-fill', (e) => {
        const renderedFeatures = map.queryRenderedFeatures(e.point);
        (renderedFeatures[0].layer.id === 'circle-fill') ? console.log('A click at ' + e.lngLat) : console.log("Clicking here is not allowed.");
        (renderedFeatures[0].layer.id === 'circle-fill') ? (map.getSource('circleData') as GeoJSONSource).setData(turf.circle([e.lngLat.lng, e.lngLat.lat], 0.5)) : console.log("didntwork");
      })
      map.on('mouseleave', 'circle-fill', () => {
        map.moveLayer('water', 'terrain_z0-Z12');
        layersToToggle.forEach((x) => {map.setLayoutProperty(x, 'visibility', 'visible')});
        map.removeLayer('circle-fill');
    });
};