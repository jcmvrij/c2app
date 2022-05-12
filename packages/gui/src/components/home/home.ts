import m, { FactoryComponent } from 'mithril';
import { IActions, IAppModel } from '../../services/meiosis';

export const Home: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: (_vnode) => {
      return m('div', m('.col.s12.l8.offset-l2', m('h4', 'Home'), m('p', 'login here..')));
    },
  };
};
