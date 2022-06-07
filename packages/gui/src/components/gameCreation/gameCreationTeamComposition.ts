import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { Collapsible, SubmitButton } from 'mithril-materialized';
import { Pages } from '../../models';
import {
  Unit,
  isValidConfigurationOfUnits,
  createTeamCompositionObj,
  createTeamCompositionForm,
  createTeamCompositionConfiguration,
} from './gameCreationUtils';

let obj: Record<string, Unit[]>;
let form: UIForm;

export const gameCreationTeamComposition: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = ({ attrs: { state, actions } }) => {
  return {
    oninit: () => {
      const { teams } = state.app.configuration;
      obj = createTeamCompositionObj(teams);
      form = createTeamCompositionForm(teams);
    },
    view: () => {
      return m(
        'div.container#configurator',
        m('h4', 'Configurator Units'),
        m(SubmitButton, {
          label: 'Next',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {
            const configuration = createTeamCompositionConfiguration(state.app.configuration, obj);
            if (isValidConfigurationOfUnits(configuration)) {
              actions.updateConfiguration(configuration);
              actions.switchToPage(Pages.GAMECREATIONUNITPLACEMENT);
            }
          },
        }),
        m(LayoutForm, {
          form,
          obj,
        }),
        m(Collapsible, {
          items: [{ header: 'JSON', body: JSON.stringify(obj), iconName: 'data_object' }],
        })
      );
    },
  };
};
