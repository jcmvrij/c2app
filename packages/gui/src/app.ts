import m from 'mithril';
import { routingSvc } from './services/routing-service';

import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';

import 'maplibre-gl/dist/maplibre-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@prashis/maplibre-gl-controls/dist/controls.css';

import './styles.css';
import { registerPlugin } from 'mithril-ui-form';
import { mapLibrePlugin } from 'mithril-ui-form-maplibre-plugin';
import { appIcons } from './components/map';
import genericMarkerIcon from './assets/pawns/noun-map-pin-626096.png';

process.env.NODE_ENV === 'development' && console.log('Running in development: no service worker');
if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

registerPlugin('libremap', mapLibrePlugin(genericMarkerIcon, appIcons));

m.route(document.body, routingSvc.defaultRoute, routingSvc.routingTable());
