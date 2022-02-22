import m from 'mithril';
import maplibregl from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
// @ts-ignore
import { RulerControl } from '@prashis/maplibre-gl-controls';
import { MeiosisComponent } from '../../services/meiosis';
import * as MapUtils from './map-utils';

export const Map: MeiosisComponent = () => {
  let map: maplibregl.Map;
  let draw: MapboxDraw;

  return {
    view: () => {
      return m('#mapboxMap.col.s12.l9.right');
    },
    // Executes once on creation
    oncreate: ({ attrs: { state: appState, actions } }) => {
      // Create map and add controls
      map = new maplibregl.Map({
        container: 'mapboxMap',
        style: 'https://geodata.nationaalgeoregister.nl/beta/topotiles-viewer/styles/achtergrond.json',
        center: [4.35, 51.911] as [number, number],
        zoom: 12,
      });
      MapUtils.loadImages(map);
      MapUtils.updateGrid(appState, actions, map);

      // Add draw controls
      draw = new MapboxDraw(MapUtils.drawConfig);
      map.addControl(new maplibregl.NavigationControl(), 'top-left');
      map.addControl(draw, 'top-left');
      map.addControl(new RulerControl(), 'top-left');

      // Add map listeners
      map.on('load', () => {
        map.on('draw.create', ({ features }) => MapUtils.handleDrawEvent(map, features, actions));
        map.on('draw.update', ({ features }) => MapUtils.handleDrawEvent(map, features, actions));

        map.once('styledata', () => {
          MapUtils.updateSourcesAndLayers(appState, actions, map);
          MapUtils.updateSatellite(appState, map);
        });
      });
    },
    // Executes on every redraw
    onupdate: ({ attrs: { state: appState, actions } }) => {
      if (!map.loaded()) return;
      // Check if drawings should be removed from the map
      if (appState.app.clearDrawing.delete) {
        draw.delete(appState.app.clearDrawing.id);
        actions.drawingCleared();
      }

      // Update the grid if necessary
      if (appState.app.gridOptions.updateGrid) {
        MapUtils.updateGrid(appState, actions, map);
      }

      // // Check if basemap should be switched
      // if (!map.getStyle().sprite?.includes(appState.app.mapStyle)) {
      //   MapUtils.switchBasemap(map, appState.app.mapStyle).catch();
      // }

      MapUtils.updateSourcesAndLayers(appState, actions, map);
      MapUtils.updateSatellite(appState, map);
    },
  };
};
