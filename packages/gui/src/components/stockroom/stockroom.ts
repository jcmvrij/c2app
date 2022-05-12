import m, { FactoryComponent } from 'mithril';
import { LayoutForm, registerPlugin, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { Button, SubmitButton } from 'mithril-materialized';
import { configureMaplibrePlugin, maplibrePlugin } from 'mithril-ui-form-maplibre-plugin';
// import { createEmptyConfiguration } from './stockroom-utils';
// import { Gamestate } from 'c2app-models-utils';
import { loadPresetGame1 } from './stockroom-utils';
import red from '../../assets/pawns/red.png';
import blue from '../../assets/pawns/blue.png';
import white from '../../assets/pawns/white.png';
import maplibregl from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

const appIcons = [
  [red, 'RED'],
  [blue, 'BLUE'],
  [white, 'WHITE'],
] as Array<[img: any, name: string]>;

// let obj = createEmptyConfiguration();
let obj = loadPresetGame1();

const form = [
  { id: 'gameId', label: 'Game Title', type: 'text', maxLength: 80 },
  {
    id: 'gameArea',
    label: 'Location of game',
    type: 'select',
    checkboxClass: 'col s3',
    options: [
      { id: 'EindhovenAirport', label: 'Eindhoven Airport' },
      { id: 'Buitenhof', label: 'Buitenhof' },
      { id: 'Schiphol', label: 'Gebied 3' },
    ],
  },
  {
    id: 'libremap',
    type: 'libremap',
    drawnPolygonLimit: 1,
    className: 'col s12',
  },
  {
    id: 'players',
    label: 'Players',
    repeat: 0,
    type: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        maxLength: 80,
        required: true,
        icon: 'person_add',
        className: 'col s6',
      },
      {
        id: 'team',
        label: 'Team',
        type: 'select',
        options: [
          { id: 'blue', label: 'Blue' },
          { id: 'red', label: 'Red' },
        ],
        required: true,
        className: 'col s6',
      },
    ],
  },
] as UIForm;

export const Stockroom: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  configureMaplibrePlugin({ maplibregl: maplibregl, mapboxdraw: MapboxDraw }, appIcons);
  registerPlugin('libremap', maplibrePlugin);
  return {
    view: (_vnode) => {
      return m(
        'div',
        m(
          '#configurator.col.l8.offset-l2',
          m('h4', 'Stockroom'),
          m(
            '.center-align',
            m(LayoutForm, {
              form,
              obj,
            })
          ),
          m(Button, {
            label: 'Load preset game 1',
            onclick: () => {
              obj = loadPresetGame1();
            },
          }),
          m(Button, {
            label: 'Clear configuration',
            onclick: () => {
              // obj = createEmptyConfiguration();
            },
          }),
          m(SubmitButton, {
            label: 'Create Game',
            iconName: 'send',
            iconClass: 'right',
            onclick: () => {
              // vnode.attrs.actions.sendStockroomConfiguration(obj);
              // console.log('Client sent game configuration to server: ' + obj);
            },
          }),
          m('.col.s12', JSON.stringify(obj))
        )
      );
    },
  };
};
