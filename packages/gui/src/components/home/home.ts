import m, { FactoryComponent } from 'mithril';
import { IInputOptions, SubmitButton, TextInput } from 'mithril-materialized';
import { IActions, IAppModel } from '../../services/meiosis';
import image from '../../assets/screenshots/tempscreenshot.png';

export const Home: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: () => {
      return m(
        'div',
        m(
          '.col.s12.l4',
          // 'div.col.s12.l8.offset-l2',

          m('h2', 'C2app game'),
          m(
            'blockquote',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
          ),
          m(TextInput, {
            id: 'gameIdInput',
            label: 'Enter game id',
            helperText: 'The game id consists of two random lowercase words. E.g. "table bear"',
            dataSuccess: 'Id valid',
            dataError: 'Id invalid',
            validate: (v) => v && /\b[a-z]+\s[a-z]+\b/.test(v),
          } as IInputOptions),
          m(SubmitButton, {
            label: 'Join game',
            iconName: 'send',
            iconClass: 'right',
            onclick: () => alert((document.querySelector('#gameIdInput') as HTMLInputElement).value),
          })
        ),
        m('.col.s12.l8', m('img.responsive-img', { src: image }))
      );
    },
  };
};
