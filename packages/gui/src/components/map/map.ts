import m from 'mithril';
import maplibregl, { GeoJSONFeature, IControl, Listener, MapEvent, MapEventType } from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { RulerControl } from '@prashis/maplibre-gl-controls';
import { MeiosisComponent } from '../../services/meiosis';
import * as MapUtils from './map-utils';

declare type MapLayerEventTypeTwo = {
  'draw.create': (e: { type: string; features: GeoJSONFeature[] }) => void;
  'draw.update': (e: { type: string; features: GeoJSONFeature[] }) => void;
};

declare interface DrawableMap {
  on<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): this;
  on(type: MapEvent, listener: Listener): this;
  on<U extends keyof MapLayerEventTypeTwo>(event: U, listener: MapLayerEventTypeTwo[U]): this;
}

declare interface DrawableMap {
  on<T extends keyof MapLayerEventTypeTwo>(
    type: T,
    layer: string,
    listener: (ev: MapLayerEventTypeTwo[T]) => void
  ): this;
}

class DrawableMap extends maplibregl.Map {}

export const Map: MeiosisComponent = () => {
  let map: DrawableMap;
  let draw: MapboxDraw;

  return {
    view: () => {
      return m('#maplibreMap.col.s12.l9.right');
    },
    // Executes once on creation
    oncreate: ({ attrs: { state: appState, actions } }) => {
      // Create map and add controls
      map = new maplibregl.Map({
        container: 'maplibreMap',
        style: 'https://geodata.nationaalgeoregister.nl/beta/topotiles-viewer/styles/achtergrond.json',
        center: [4.3, 52.07] as [number, number],
        zoom: 12,
      }) as DrawableMap;
      MapUtils.loadImages(map);
      MapUtils.updateGrid(appState, actions, map);

      // Add draw controls
      draw = new MapboxDraw(MapUtils.drawConfig);
      map.addControl(
        new maplibregl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }),
        'top-left'
      );
      map.addControl(draw as unknown as IControl, 'top-left');
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

      MapUtils.updateSourcesAndLayers(appState, actions, map);
      MapUtils.updateSatellite(appState, map);
    },
  };
};
