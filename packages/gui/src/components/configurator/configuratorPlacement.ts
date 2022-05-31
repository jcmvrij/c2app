import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { SubmitButton } from 'mithril-materialized';

// @ts-ignore
const placeholder = () => {
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

const obj = {
  map: {},
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
    maxBounds: {
      sw: {
        lng: 4.322391847973449,
        lat: 52.10594537493236,
      },
      ne: {
        lng: 4.336521202800014,
        lat: 52.111738043400635,
      },
    },
    className: 'col s12',
  },
] as UIForm;

export const configuratorPlacement: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: () => {
      return m(
        'div.container#configurator',
        m('h4', 'Stockroom Units'),
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
        m('.col.s12', JSON.stringify(obj, null, 2))
      );
    },
  };
};
