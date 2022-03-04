import m from 'mithril';
import maplibregl, { GeoJSONFeature, IControl, Listener, MapEvent, MapEventType } from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
// @ts-ignore
import { RulerControl } from '@prashis/maplibre-gl-controls';
import { MeiosisComponent } from '../../services/meiosis';
import * as MapUtils from './map-utils';

declare type MapLayerEventTypeTwo = {
  'draw.create': (e: { type: string; features: GeoJSONFeature[] }) => void;
  'draw.update': (e: { type: string; features: GeoJSONFeature[] }) => void;
};

// interface MapLayerEventTypeTwo {
//   'draw.create': (e: {type: string, features: unknown}) => void;
//   // 'draw.create': (el: string, wasNew: boolean) => void;
//   'delete': (changedCount: number) => void;
// }

declare interface DrawableMap {
  // on<T extends keyof MapLayerEventType>(
  //   type: T,
  //   layer: string,
  //   listener: (ev: MapLayerEventType[T] & Object) => void
  // ): this;
  on<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): this;
  on(type: MapEvent, listener: Listener): this;
  on<U extends keyof MapLayerEventTypeTwo>(event: U, listener: MapLayerEventTypeTwo[U]): this;

  // emit<U extends keyof MapLayerEventTypeTwo>(event: U, ...args: Parameters<MapLayerEventTypeTwo[U]>): boolean;
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

      // Check if basemap should be switched
      if (!map.getStyle().sprite?.includes(appState.app.mapStyle)) {
        MapUtils.switchBasemap(map).catch();
      }

      MapUtils.updateSourcesAndLayers(appState, actions, map);
      MapUtils.updateSatellite(appState, map);
    },
  };
};
