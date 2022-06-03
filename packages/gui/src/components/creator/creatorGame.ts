import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { SubmitButton } from 'mithril-materialized';
import { Pages } from '../../models';
import faker from '@faker-js/faker';
import { boundingBoxFromPolygon, ConfigurationBasic, Team, isValidConfigurationBasic } from './creatorUtils';
import { MapLibrePluginState } from 'mithril-ui-form-maplibre-plugin';

const obj: ConfigurationBasic = {
  id: faker.random.words(2).toLowerCase(),
  location: {} as MapLibrePluginState,
  teams: [
    { id: '', name: '', color: '' },
    { id: '', name: '', color: '' },
  ] as Team[],
};

const availableTeamColors = [
  { id: 'blue', label: 'Blue' },
  { id: 'red', label: 'Red' },
  { id: 'green', label: 'Green' },
  { id: 'yellow', label: 'Yellow' },
];

const form = [
  { id: 'id', label: 'Game Id', type: 'text', maxLength: 80 },
  {
    id: 'locationExplanation',
    type: 'md',
    value: 'Locatie\n\nTeken een figuur om het gewenste speelveld',
  },
  {
    id: 'location',
    type: 'libremap',
    drawnPolygonLimit: 1,
    className: 'col s12',
  },
  {
    id: 'teams',
    label: 'Teams',
    repeat: 0,
    type: [
      { id: 'id', autogenerate: 'id' },
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
        id: 'color',
        label: 'Team Color',
        type: 'select',
        options: availableTeamColors,
        required: true,
        className: 'col s6',
      },
    ],
  },
] as UIForm;

export const creatorGame: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = ({ attrs: { actions } }) => {
  const { switchToPage } = actions;
  return {
    view: () => {
      return m(
        'div.container#configurator',
        m('h4', 'Configurator'),
        m(SubmitButton, {
          label: 'Next',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {
            if (obj.location.polygons) {
              console.log(boundingBoxFromPolygon(obj.location.polygons[0]));
            }
            if (isValidConfigurationBasic(obj)) switchToPage(Pages.CREATORTEAMCOMPOSITION);
          },
        }),
        m(LayoutForm, {
          form,
          obj,
        }),
        m.trust(JSON.stringify(obj))
      );
    },
  };
};
