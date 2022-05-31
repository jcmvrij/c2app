import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { SubmitButton } from 'mithril-materialized';
import { Pages } from '../../models';
import faker from '@faker-js/faker';

interface Team {
  id: string;
  name: string;
  color: string;
}

const placeholder = {
  teams: [
    {
      id: 'id119fdd00',
      name: 'speler1',
      color: 'blue',
    },
    {
      id: 'id01cd8dcf',
      name: 'speler2',
      color: 'red',
    },
  ],
};

const createObj = (teams: Team[]) => {
  const obj: Record<string, any> = {};
  for (let team of teams) {
    obj[team.id + '-units'] = [{ name: faker.name.findName() }, { name: faker.name.findName() }];
  }
  return obj;
};

const createForm = (teams: Team[]) => {
  const form: UIForm = [
    {
      id: 'unitCreationExplanation',
      type: 'md',
      value: 'Units creëren',
    },
  ];
  for (let team of teams) {
    form.push({
      id: team.id + '-units',
      label: team.name + ' units',
      // @ts-ignore
      repeat: 0,
      type: [
        {
          id: 'id',
          autogenerate: 'id',
          type: 'none',
        },
        {
          id: 'name',
          label: 'Naam',
          type: 'text',
          className: 'col s8',
          iconName: 'title',
          required: true,
        },
        {
          id: 'unit',
          label: 'Unit',
          type: 'select',
          options: [
            {
              id: 'lightUnit',
              label: 'Light Unit',
            },
            {
              id: 'heavyUnit',
              label: 'Heavy Unit',
            },
          ],
          className: 'col s4',
        },
      ],
    });
  }
  return form;
};

const obj = createObj(placeholder.teams);
const form = createForm(placeholder.teams);

export const configuratorUnits: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = ({ attrs: { actions } }) => {
  const { switchToPage } = actions;
  return {
    view: () => {
      return m(
        'div.container#configurator',
        m('h4', 'Configurator Units'),
        m(SubmitButton, {
          label: 'Next page',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {
            switchToPage(Pages.CONFIGURATORPLACEMENT);
          },
        }),
        m(LayoutForm, {
          form,
          obj,
        }),
        m('.col.s12', JSON.stringify(obj))
      );
    },
  };
};
