import m from 'mithril';
import maplibregl, {
  GeoJSONFeature,
  IControl,
  Listener,
  MapEvent,
  MapEventType,
  MapLayerEventType,
} from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { RulerControl } from '@prashis/maplibre-gl-controls';
import { MeiosisComponent } from '../../services/meiosis';
import * as MapUtils from './map-utils';
import { addISources } from './map-experimental';

declare type MapLayerEventTypeTwo = MapLayerEventType & {
  'draw.create': (e: { type: string; features: GeoJSONFeature[] }) => void;
  'draw.update': (e: { type: string; features: GeoJSONFeature[] }) => void;
};

export declare interface DrawableMap {
  on(type: MapEvent, listener: Listener): this;
  on<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): this;
  on<U extends keyof MapLayerEventTypeTwo>(event: U, listener: MapLayerEventTypeTwo[U]): this;
  on<T extends keyof MapLayerEventTypeTwo>(
    type: T,
    layer: string,
    listener: (ev: MapLayerEventTypeTwo[T]) => void
  ): this;
}

export class DrawableMap extends maplibregl.Map {}

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
        center: [4.27, 52.05] as [number, number],
        zoom: 14,
        maxZoom: 15.99,
      }) as DrawableMap;
      map.doubleClickZoom.disable();
      MapUtils.loadImages(map);
      MapUtils.updateGrid(appState, actions, map);

      // Add draw controls
      draw = new MapboxDraw(MapUtils.drawConfig);
      map.addControl(
        new maplibregl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }),
        'top-left'
      );
      // @ts-ignore
      map.addControl(draw as IControl, 'top-left');
      map.addControl(new RulerControl(), 'top-left');

      // Add map listeners
      map.on('load', () => {
        map.on('draw.create', ({ features }) => MapUtils.handleDrawEvent(map, features, actions));
        map.on('draw.update', ({ features }) => MapUtils.handleDrawEvent(map, features, actions));

        map.once('styledata', async () => {
          addISources(actions);
          MapUtils.updateSourcesAndLayers(appState, actions, map);
          MapUtils.updateSatellite(appState, map);

          map.on('styleimagemissing', (e) => {
            console.log(`Image ${e.id} is missing!`);
          });
        });

        MapUtils.addAreaOfMovementLayerMapListeners(actions, map);
      });
    },

    // Executes on every redraw
    onupdate: async ({ attrs: { state: appState, actions } }) => {
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

      console.log('Map update executed');
    },
  };
};
