import m from 'mithril';
import mapboxgl, { GeoJSONSource, LinePaint, MapboxGeoJSONFeature } from 'mapbox-gl';
import bbox from '@turf/bbox';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { Point, Feature, Polygon, FeatureCollection, Geometry } from 'geojson';
import { IActions, IAppModel, ILayer, ISource, SourceType } from '../../services/meiosis';
import SquareGrid from '@turf/square-grid';
import polylabel from 'polylabel';
// ICONS
import car from '../../assets/Operations/Car.png';
import van from '../../assets/Operations/Car.png';
import controlPoint from '../../assets/Operations/Control point.png';
import divisionCommand from '../../assets/Operations/Division command.png';
import evacuation from '../../assets/Operations/Evacuation.png';
import fireman from '../../assets/Operations/Firemen unit.png';
import helicopter from '../../assets/Operations/Helicopter.png';
import media from '../../assets/Operations/Media.png';
import sanitary from '../../assets/Operations/Medical services.png';
import military from '../../assets/Operations/Military.png';
import policeman from '../../assets/Operations/Police unit.png';
import roadBlock from '../../assets/Operations/Road block.png';
import truck from '../../assets/Operations/Truck.png';
import chemical from '../../assets/Incidents/Chemical.png';
import air from '../../assets/Operations/air.png';
import ground from '../../assets/Operations/ground.png';
import first_responder from '../../assets/Operations/Medical services.png';

export const drawConfig = {
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true,
    point: true,
  },
};

export const handleDrawEvent = (map: mapboxgl.Map, features: MapboxGeoJSONFeature[], actions: IActions) => {
  actions.updateDrawings(features[0] as MapboxGeoJSONFeature);
  if (features[0].geometry.type === 'Polygon') {
    getFeaturesInPolygon(map, features, actions);
  }

  const elem = document.getElementById('layerSelect') as HTMLElement;
  M.FormSelect.init(elem);
  const instance = M.Modal.getInstance(document.getElementById('createPOIModal') as HTMLElement);
  instance.open();
};

const getFeaturesInPolygon = (map: mapboxgl.Map, features: Feature[], actions: IActions) => {
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

export const displayInfoSidebar = (features: MapboxGeoJSONFeature[], actions: IActions) => {
  actions.updateClickedFeature(features[0] as MapboxGeoJSONFeature);
  const instance = M.Sidenav.getInstance(document.getElementById('slide-out-2') as HTMLElement);
  instance.open();
};

export const getGridSource = (
  map: mapboxgl.Map,
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

export const loadImages = (map: mapboxgl.Map) => {
  map.loadImage(fireman, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('FIREFIGHTER')) map.addImage('FIREFIGHTER', image as ImageBitmap);
  });
  map.loadImage(policeman, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('POLICE')) map.addImage('POLICE', image as ImageBitmap);
  });
  map.loadImage(sanitary, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('MEDICAL')) map.addImage('MEDICAL', image as ImageBitmap);
  });
  map.loadImage(first_responder, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('OTHER')) map.addImage('OTHER', image as ImageBitmap);
  });
  map.loadImage(car, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('CAR')) map.addImage('CAR', image as ImageBitmap);
  });
  map.loadImage(van, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('VAN')) map.addImage('VAN', image as ImageBitmap);
  });
  map.loadImage(truck, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('TRUCK')) map.addImage('TRUCK', image as ImageBitmap);
  });
  map.loadImage(air, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('AIR')) map.addImage('AIR', image as ImageBitmap);
  });
  map.loadImage(ground, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('GROUND')) map.addImage('GROUND', image as ImageBitmap);
  });
  map.loadImage(chemical, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('chemical')) map.addImage('chemical', image as ImageBitmap);
  });
  map.loadImage(roadBlock, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('roadBlock')) map.addImage('roadBlock', image as ImageBitmap);
  });
  map.loadImage(media, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('media')) map.addImage('media', image as ImageBitmap);
  });
  map.loadImage(controlPoint, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('controlPoint')) map.addImage('controlPoint', image as ImageBitmap);
  });
  map.loadImage(divisionCommand, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('divisionCommand')) map.addImage('divisionCommand', image as ImageBitmap);
  });
  map.loadImage(evacuation, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('evacuation')) map.addImage('evacuation', image as ImageBitmap);
  });
  map.loadImage(helicopter, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('helicopter')) map.addImage('helicopter', image as ImageBitmap);
  });
  map.loadImage(military, function (error: any, image: ImageBitmap) {
    if (error) throw error;
    if (!map.hasImage('military')) map.addImage('military', image as ImageBitmap);
  });
};

export const switchBasemap = async (map: mapboxgl.Map, styleID: string) => {
  const currentStyle = map.getStyle();
  const newStyle = (await m.request(
    `https://api.mapbox.com/styles/v1/${styleID}?access_token=` + process.env.ACCESSTOKEN
  )) as mapboxgl.Style;

  // ensure any sources from the current style are copied across to the new style
  newStyle.sources = Object.assign({}, currentStyle.sources, newStyle.sources);

  // find the index of where to insert our layers to retain in the new style
  let labelIndex = newStyle.layers?.findIndex((el) => {
    return el.id == 'state-label';
  });

  // default to on top
  if (labelIndex === -1) {
    labelIndex = newStyle.layers?.length;
  }
  const appLayers = currentStyle.layers?.filter((el) => {
    // app layers are the layers to retain, and these are any layers which have a different source set
    const source = (el as any).source;
    return source &&
      source != 'mapbox://mapbox.satellite' &&
      source != 'mapbox' &&
      source != 'composite';
  });

  if(!newStyle || !newStyle.layers || !appLayers) return;
  newStyle.layers = [  
    ...newStyle.layers.slice(0, labelIndex),
    ...appLayers,
    ...newStyle.layers.slice(labelIndex, -1),
  ];

  map.setStyle(newStyle);
  loadImages(map);
};

export const updateSourcesAndLayers = (appState: IAppModel, actions: IActions, map: mapboxgl.Map) => {
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
        map.on('click', layerName, ({ features }) => displayInfoSidebar(features as MapboxGeoJSONFeature[], actions));
        map.on('mouseenter', layerName, () => (map.getCanvas().style.cursor = 'pointer'));
        map.on('mouseleave', layerName, () => (map.getCanvas().style.cursor = ''));
      }
      map.setLayoutProperty(layerName, 'visibility', layer.showLayer ? 'visible' : 'none');
      if (source.sourceCategory === SourceType.alert || source.sourceCategory === SourceType.plume)
        map.setPaintProperty(layerName, 'line-opacity', (layer.paint as LinePaint)['line-opacity']);
    });
  });
};

export const updateGrid = (appState: IAppModel, actions: IActions, map: mapboxgl.Map) => {
  const gridSource = getGridSource(map, actions, appState);
  const gridLabelsSource = getLabelsSource(gridSource);

  actions.updateGrid(gridSource, gridLabelsSource);
};

export const updateSatellite = (appState: IAppModel, map: mapboxgl.Map) => {
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
      'aeroway-line'
    );
  }
  map.setLayoutProperty(layerName, 'visibility', appState.app.showSatellite ? 'visible' : 'none');
  map.setPaintProperty('building', 'fill-opacity', appState.app.showSatellite ? 0 : ["interpolate", ["linear"], ["zoom"], 15, 0, 16, 1]);
};
