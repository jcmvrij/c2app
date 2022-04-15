import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { faker } from '@faker-js/faker';
import { SubmitButton } from 'mithril-materialized';

export interface initGameState {
  gameId: string;
  gameArea: string;
  players: [];
  redUnits: [];
  blueUnits: [];
  whiteUnits: [];
}

const obj: initGameState = {
  gameId: faker.random.words(2).toLowerCase(),
  gameArea: '',
  players: [],
  redUnits: [],
  blueUnits: [],
  whiteUnits: [],
};

const form = [
  { id: 'gameId', label: 'Game Title', type: 'text', maxLength: 80 },
  {
    id: 'gameArea',
    label: 'Location of game',
    type: 'select',
    checkboxClass: 'col s3',
    options: [
      { id: 'map1', label: 'Eindhoven Airport' },
      { id: 'map2', label: 'Buitenhof' },
      { id: 'map3', label: 'Gebied 3' },
    ],
  },
  {
    id: 'Players',
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
          { id: 'Blue', label: 'Blue' },
          { id: 'Red', label: 'Red' },
        ],
        required: true,
        icon: 'groups',
        className: 'col s6',
      },
    ],
  },
  {
    id: 'redUnits',
    label: 'Red Units',
    repeat: 0,
    type: [
      {
        id: 'id',
        autogenerate: 'id',
        type: 'none',
      },
      {
        id: 'unitName',
        label: 'Unit name',
        type: 'text',
        className: 'col s8',
        iconName: 'title',
        required: true,
      },
      {
        id: 'unitType',
        label: 'Unit type',
        type: 'select',
        options: [
          { id: 'light', label: 'Light Unit' },
          { id: 'heavy', label: 'Heavy Unit' },
        ],
        className: 'col s4',
      },
      {
        id: 'region',
        label: 'Region',
        type: 'select',
        options: [
          {
            id: 'eu',
            label: 'Europe',
          },
          {
            id: 'other',
            label: 'Rest of the world',
          },
        ],
        className: 'col s6',
      },
    ],
  },
  {
    id: 'BlueUnits',
    label: 'Blue Units',
    repeat: 0,
    type: [
      {
        id: 'id',
        autogenerate: 'id',
        type: 'none',
      },
      {
        id: 'unitName',
        label: 'Unit name',
        type: 'text',
        className: 'col s8',
        iconName: 'title',
        required: true,
      },
      {
        id: 'unitType',
        label: 'Unit type',
        type: 'select',
        options: [
          { id: 'light', label: 'Light Unit' },
          { id: 'heavy', label: 'Heavy Unit' },
        ],
        className: 'col s4',
      },
    ],
  },
] as UIForm;

export const Stockroom: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: (vnode) => {
      return m(
        'div',
        m('div', [
          m('.col.s12.l2'),
          m(
            '.col.s12.l8',
            m('h4', 'Stockroom'),
            m(LayoutForm, {
              form,
              obj,
            })
          ),
          m('.col.s12.l2'),
        ]),
        m(SubmitButton, {
          label: 'End Turn',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {
            vnode.attrs.actions.sendStockroomConfiguration(obj);
            console.log('Client sent game configuration to server: ' + obj);
          },
        }),
        m('.col.s12', JSON.stringify(obj))
      );
    },
  };
};
