import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { SubmitButton } from 'mithril-materialized';
// @ts-ignore
const placeholderBounds = () => {
  return {
    sw: {
      lng: 4.27936263874642,
      lat: 52.107610237627654,
    },
    ne: {
      lng: 4.330818014164407,
      lat: 52.11574774600376,
    },
  };
};
// @ts-ignore
const placeholder2 = () => {
  return {
    'id119fdd00-units': [
      {
        id: 'id2ed4e0b5',
        name: 'speler1-unit1',
        unit: 'lightUnit',
      },
      {
        id: 'id282d0a61',
        name: 'speler1-unit2',
        unit: 'heavyUnit',
      },
    ],
    'id01cd8dcf-units': [
      {
        id: 'iddcb0efa7',
        name: 'speler2-unit1',
        unit: 'lightUnit',
      },
      {
        id: 'id2f1869e1',
        name: 'speler2-unit2',
        unit: 'lightUnit',
      },
    ],
  };
};

const placeholderSources = [
  {
    id: 'TeamBlueUnit1',
    source: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            movable: true,
          },
          geometry: {
            type: 'Point',
            coordinates: [4.327293, 52.11],
          },
        },
      ],
    },
    layers: [
      {
        id: 'Layer',
        type: 'symbol',
        layout: {
          'icon-image': 'BLUE',
          'icon-size': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 0.7, 20, 0.2],
          'icon-allow-overlap': true,
        },
        paint: {
          'icon-opacity': 0.8,
        },
        filter: ['all'],
      },
    ],
  },
  {
    id: 'TeamRedUnit1',
    source: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            movable: true,
          },
          geometry: {
            type: 'Point',
            coordinates: [4.327293, 52.111],
          },
        },
      ],
    },
    layers: [
      {
        id: 'Layer',
        type: 'symbol',
        layout: {
          'icon-image': 'RED',
          'icon-size': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 0.7, 20, 0.2],
          'icon-allow-overlap': true,
        },
        paint: {
          'icon-opacity': 0.8,
        },
        filter: ['all'],
      },
    ],
  },
  {
    id: 'TeamWhiteUnit1',
    source: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            movable: true,
          },
          geometry: {
            type: 'Point',
            coordinates: [4.327293, 52.112],
          },
        },
      ],
    },
    layers: [
      {
        id: 'Layer',
        type: 'symbol',
        layout: {
          'icon-image': 'WHITE',
          'icon-size': ['interpolate', ['exponential', 0.5], ['zoom'], 15, 0.7, 20, 0.2],
          'icon-allow-overlap': true,
        },
        paint: {},
        filter: ['all'],
      },
    ],
  },
];

const obj = {
  map: {
    sources: placeholderSources,
  },
};

const form = [
  {
    id: 'unitsPlaatsen',
    type: 'md',
    value: 'Units plaatsen',
  },
  {
    id: 'map',
    type: 'libremap',
    polygonControlBar: false,
    zoom: 0,
    maxBounds: placeholderBounds(),
    className: 'col s12',
  },
] as UIForm;

export const creatorUnitPlacement: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: () => {
      return m(
        'div.container#configurator',
        m('h4', 'Units plaatsen'),
        m(SubmitButton, {
          label: 'Create Game',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {
            alert('Game created');
          },
        }),
        m(LayoutForm, {
          form,
          obj,
        }),
        m(SubmitButton, {
          label: 'AddUnit',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {},
        }),
        m('.col.s12', JSON.stringify(obj, null, 2))
      );
    },
  };
};
