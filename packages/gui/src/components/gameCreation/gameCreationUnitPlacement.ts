import m, { FactoryComponent } from 'mithril';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { IActions, IAppModel } from '../../services/meiosis';
import { Collapsible, SubmitButton } from 'mithril-materialized';
import {
  createUnitPlacementConfiguration,
  createUnitPlacementObj,
  isValidConfiguration,
} from './gameCreationUtils';
import { IMapLibreSource } from 'mithril-ui-form-maplibre-plugin/lib/componentUtils';
import { Pages } from '../../models';

let obj: {
  map: {
    sources: IMapLibreSource[];
  };
};
let form: UIForm;

export const gameCreationUnitPlacement: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = ({ attrs: { state, actions } }) => {
  return {
    oninit: () => {
      const { teams, location } = state.app.configuration;
      obj = createUnitPlacementObj(teams, location);
      form = [
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
          maxBounds: location,
          className: 'col s12',
        },
      ] as UIForm;
    },
    view: () => {
      return m(
        'div.container#configurator',
        m('h4', 'Units plaatsen'),
        m(SubmitButton, {
          label: 'Create Game',
          iconName: 'send',
          iconClass: 'right',
          onclick: () => {
            const configuration = createUnitPlacementConfiguration(state.app.configuration, obj.map.sources);
            if (isValidConfiguration(configuration)) {
              actions.updateConfiguration(configuration);
              alert(`Game created, you can join it via the id: ${configuration.id}`);
              console.log(state.app.configuration);
              actions.switchToPage(Pages.HOME);
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
