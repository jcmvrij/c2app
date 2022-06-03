import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { SubmitButton } from 'mithril-materialized';
import { MapLibrePluginBBox } from 'mithril-ui-form-maplibre-plugin';
import { createSources, Team } from './creatorUtils';
import { IMapLibreSource } from 'mithril-ui-form-maplibre-plugin/lib/componentUtils';

const placeholderTeams: Team[] = [
  {
    id: 'ide4bca90b',
    name: 'speler1',
    color: 'blue',
    units: [
      {
        id: 'id2ed4e0b5',
        name: 'speler1-unit1',
        type: 'lightUnit',
      },
      {
        id: 'id282d0a61',
        name: 'speler1-unit2',
        type: 'heavyUnit',
      },
    ],
  },
  {
    id: 'id61127b0e',
    name: 'speler2',
    color: 'red',
    units: [
      {
        id: 'iddcb0efa7',
        name: 'speler2-unit1',
        type: 'lightUnit',
      },
      {
        id: 'id2f1869e1',
        name: 'speler2-unit2',
        type: 'lightUnit',
      },
    ],
  },
];

const placeholderBounds: MapLibrePluginBBox = {
  sw: {
    lng: 4.27936263874642,
    lat: 52.107610237627654,
  },
  ne: {
    lng: 4.330818014164407,
    lat: 52.11574774600376,
  },
};

const placeholderSources: IMapLibreSource[] = createSources(placeholderTeams, placeholderBounds);

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
    maxBounds: placeholderBounds,
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
        m('.col.s12', JSON.stringify(obj, null, 2))
      );
    },
  };
};
