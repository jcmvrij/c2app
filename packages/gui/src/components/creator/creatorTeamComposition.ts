import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { SubmitButton } from 'mithril-materialized';
import { Pages } from '../../models';
import faker from '@faker-js/faker';
import { Team, Unit, isValidConfigurationOfUnits } from './creatorUtils';

const placeholderTeams: Team[] = [
  { id: 'ide4bca90b', name: 'speler1', color: 'blue' },
  { id: 'id61127b0e', name: 'speler2', color: 'red' },
];

const createObj = (teams: Team[]) => {
  const obj: Record<string, Unit[]> = {};
  teams.forEach(
    (team) =>
      (obj[team.id] = [
        { id: '', name: faker.name.findName(), type: '' },
        { id: '', name: faker.name.findName(), type: '' },
        { id: '', name: faker.name.findName(), type: '' },
        { id: '', name: faker.name.findName(), type: '' },
      ])
  );
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
      id: team.id,
      label: team.name + ' units',
      // @ts-ignore
      repeat: 0,
      type: [
        {
          id: 'id',
          autogenerate: 'id',
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
          id: 'type',
          label: 'Type',
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

const obj = createObj(placeholderTeams);
const form = createForm(placeholderTeams);

export const creatorTeamComposition: FactoryComponent<{
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
          label: 'Next',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {
            if (isValidConfigurationOfUnits(obj)) switchToPage(Pages.CREATORUNITPLACEMENT);
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
