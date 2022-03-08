import { GeoJSONSource, GeoJSONFeature } from 'maplibre-gl';
import bbox from '@turf/bbox';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { Point, Feature, Polygon, FeatureCollection, Geometry } from 'geojson';
import { IActions, IAppModel, ILayer, ISource } from '../../services/meiosis';
import SquareGrid from '@turf/square-grid';
import polylabel from 'polylabel';
import { appIcons } from './map-icons';

export const drawConfig = {
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true,
    point: true,
  },
};

export const handleDrawEvent = (map: maplibregl.Map, features: GeoJSONFeature[], actions: IActions) => {
  actions.updateDrawings(features[0]);
  if (features[0].geometry.type === 'Polygon') {
    getFeaturesInPolygon(map, features, actions);
  }

  const elem = document.getElementById('layerSelect') as HTMLElement;
  M.FormSelect.init(elem);
  const instance = M.Modal.getInstance(document.getElementById('createPOIModal') as HTMLElement);
  instance.open();
};

const getFeaturesInPolygon = (map: maplibregl.Map, features: GeoJSONFeature[], actions: IActions) => {
  let layers: Array<string> = [];

  if (map.getLayer('ResourcesresourcesIDfiremanResources')) layers.push('ResourcesresourcesIDfiremanResources');
  if (map.getLayer('ResourcesresourcesIDpolicemanResources')) layers.push('ResourcesresourcesIDpolicemanResources');
  if (map.getLayer('ResourcesresourcesIDfirst_responderResources'))
    layers.push('ResourcesresourcesIDfirst_responderResources');
  if (map.getLayer('ResourcesresourcesIDsanitaryResources')) layers.push('ResourcesresourcesIDsanitaryResources');
  if (map.getLayer('ResourcesresourcesIDcarResources')) layers.push('ResourcesresourcesIDcarResources');
  if (map.getLayer('ResourcesresourcesIDvanResources')) layers.push('ResourcesresourcesIDvanResources');
  if (map.getLayer('ResourcesresourcesIDtruckResources')) layers.push('ResourcesresourcesIDtruckResources');
  if (map.getLayer('ResourcesresourcesIDairResources')) layers.push('ResourcesresourcesIDairResources');
  if (map.getLayer('ResourcesresourcesIDgroundResources')) layers.push('ResourcesresourcesIDgroundResources');

  if (layers.length === 0) return;

  const bounding = bbox(features[0]);
  let bboxFeatures = map.queryRenderedFeatures(
    [map.project([bounding[0], bounding[1]]), map.project([bounding[2], bounding[3]])],
    { layers: layers }
  );
  const polyFeatures = bboxFeatures.filter((element) =>
    booleanPointInPolygon(
      [(element.geometry as Point).coordinates[0], (element.geometry as Point).coordinates[1]],
      features[0] as Feature<Polygon>
    )
  );
  actions.updateSelectedFeatures(polyFeatures);
};

export const displayInfoSidebar = (features: GeoJSONFeature[], actions: IActions) => {
  actions.updateClickedFeature(features[0] as GeoJSONFeature);
  const instance = M.Sidenav.getInstance(document.getElementById('slide-out-2') as HTMLElement);
  instance.open();
};

export const getGridSource = (
  map: maplibregl.Map,
  actions: IActions,
  appState: IAppModel
): FeatureCollection<Polygon> => {
  if (appState.app.gridOptions.updateLocation) {
    const bounds = map.getBounds();
    actions.updateGridLocation([bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]);
    appState.app.gridOptions.gridLocation = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
  }

  return SquareGrid(appState.app.gridOptions.gridLocation, appState.app.gridOptions.gridCellSize, {
    units: 'kilometers',
  });
};

const getRowLetter = (index: number, rows: number) => {
  return String.fromCharCode(Math.abs((index % rows) - rows) + 64);
};

const getColumnNumber = (index: number, rows: number) => {
  return Math.floor(index / rows) + 1;
};

export const getLabelsSource = (gridSource: FeatureCollection<Polygon>): FeatureCollection => {
  let rows = new Set<number>();
  let prev_size: number = 0;
  gridSource.features.some((feature: Feature) => {
    let longLat = polylabel((feature.geometry as Polygon).coordinates);
    rows.add(longLat[1]);
    const curr_size = rows.size;
    if (prev_size === curr_size) return true;
    prev_size = curr_size;
    return false;
  });

  return {
    type: 'FeatureCollection',
    features: gridSource.features.map((feature: Feature, index: number) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: polylabel((feature.geometry as Polygon).coordinates),
        } as Geometry,
        properties: {
          cellLabel: `${getRowLetter(index, rows.size) + getColumnNumber(index, rows.size)}`,
        },
      } as Feature;
    }),
  } as FeatureCollection;
};

export const loadImages = (map: maplibregl.Map) => {
  appIcons.forEach(([image, name]) => {
    map.loadImage(image, (error, img) => {
      if (error) throw error;
      if (!map.hasImage(name)) map.addImage(name, img as ImageBitmap);
    });
  });
};

export const updateSourcesAndLayers = (appState: IAppModel, actions: IActions, map: maplibregl.Map) => {
  appState.app.sources.forEach((source: ISource) => {
    // Set source
    const sourceName = source.sourceName.concat(source.id);
    if (!map.getSource(sourceName)) {
      map.addSource(sourceName, {
        type: 'geojson',
        data: source.source,
      });
    } else {
      (map.getSource(sourceName) as GeoJSONSource).setData(source.source);
    }

    // Set Layers
    source.layers.forEach((layer: ILayer) => {
      const layerName = sourceName.concat(layer.layerName);

      if (!map.getLayer(layerName)) {
        map.addLayer({
          id: layerName,
          type: layer.type.type,
          source: sourceName,
          layout: layer.layout ? layer.layout : {},
          // @ts-ignore
          paint: layer.paint ? layer.paint : {},
          filter: layer.filter ? layer.filter : ['all'],
        });
        map.on('click', layerName, ({ features }) => displayInfoSidebar(features as GeoJSONFeature[], actions));
        map.on('mouseenter', layerName, () => (map.getCanvas().style.cursor = 'pointer'));
        map.on('mouseleave', layerName, () => (map.getCanvas().style.cursor = ''));
      }
      map.setLayoutProperty(layerName, 'visibility', layer.showLayer ? 'visible' : 'none');
      
      // if (source.sourceCategory === SourceType.alert || source.sourceCategory === SourceType.plume)
      // map.setPaintProperty(layerName, 'line-opacity', (layer.paint as LineLayerSpecification['paint'])!['line-opacity']);
    });
  });
};

export const updateGrid = (appState: IAppModel, actions: IActions, map: maplibregl.Map) => {
  const gridSource = getGridSource(map, actions, appState);
  const gridLabelsSource = getLabelsSource(gridSource);

  actions.updateGrid(gridSource, gridLabelsSource);
};

export const updateSatellite = (appState: IAppModel, map: maplibregl.Map) => {
  // Set source
  const sourceName = 'wms-satellite-source';
  if (!map.getSource(sourceName)) {
    map.addSource(sourceName, {
      type: 'raster',
      tiles: ['https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg'],
      tileSize: 256,
      maxzoom: 18,
    });
  }
  // Set Layer
  const layerName = 'wms-satellite-layer';

  if (!map.getLayer(layerName)) {
    map.addLayer(
      {
        id: layerName,
        type: 'raster',
        source: sourceName,
        layout: {
          visibility: appState.app.showSatellite ? 'visible' : 'none',
        },
        paint: {},
      },
      'roads_case'
    );
  }
  map.setLayoutProperty(layerName, 'visibility', appState.app.showSatellite ? 'visible' : 'none');
  // map.setPaintProperty(
  // 'background',
  // 'fill-opacity',
  // appState.app.showSatellite ? 0 : ['interpolate', ['linear'], ['zoom'], 15, 0, 16, 1]
  // );
};
