import m, { FactoryComponent } from 'mithril';
import { IActions, ISource, IAppModel } from '../../services/meiosis';
import M from 'materialize-css';
import { LayoutForm } from 'mithril-ui-form';
import { formGenerator } from '../../template/form';
import {
  IChemicalIncident,
  IChemicalIncidentControlParameters,
  IChemicalIncidentScenario,
  ICbrnProperties,
} from 'c2app-models-utils';
import { LayerSpecification } from 'maplibre-gl';
import { Collapsible } from 'mithril-materialized';

export interface IGeoJSONFeatureTwo extends GeoJSON.Feature<GeoJSON.Geometry> {
  layer: LayerSpecification;
  source: string;
  sourceLayer: string;
  state: { [key: string]: any };
}

export const formatMan = (ft: IGeoJSONFeatureTwo) => {
  const props = ft?.properties;
  return (
    m('div'),
    [
      m(Collapsible, {
        accordion: false,
        items: [
          { header: 'ID', body: props?.id || 'No ID', iconName: 'person_pin', active: true },
          { header: 'Type', body: props?.type || 'No Type', iconName: 'person_outline', active: true },
          {
            header: 'Callsign',
            body: props?.name || 'No Callsign',
            iconName: 'record_voice_over',
            active: true,
          },
          { header: 'Layer Name', body: ft.layer.id || 'No Layer', iconName: 'layers', active: true },
        ],
      }),
      m('hr'),
      m('div'),
      [
        m(Collapsible, {
          items: [{ header: 'Full JSON', body: JSON.stringify(ft), iconName: 'remove_red_eye' }],
        }),
      ],
    ]
  );
};

export const formatCar = (ft: IGeoJSONFeatureTwo) => {
  const props = ft?.properties;
  return m('div', [m('p', 'Layer Name: ' + ft.layer.id), m('p', 'Type: ' + props?.type)]);
};

export const formatUnknown = (ft: IGeoJSONFeatureTwo) => {
  const props = ft?.properties;
  return m('div', [
    m('p', 'Layer Name: ' + ft.layer.id),
    m('p', 'ID: ' + props?.id),
    m('p', 'Height: ' + props?.height),
    m('p', 'Type: ' + props?.type),
  ]);
};

export const alertFormatComponent: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: (vnode) => {
      const ft = vnode.attrs.state.app.clickedFeature as IGeoJSONFeatureTwo;
      const alert = vnode.attrs.state.app.sources.find((v: ISource) => {
        return v.sourceName + v.id === ft.source;
      }) as ISource;
      return m('div', [
        m('p', 'Layer Name: ' + ft.layer.id),
        m('p', 'Source Name: ' + ft.source),
        m('p', 'Comments: ' + (ft.properties as ICbrnProperties).comments),
        m('p', 'Toxicity: ' + (ft.properties as ICbrnProperties).toxicityLevel),
        m('p', 'Confidence: ' + (ft.properties as ICbrnProperties).confidence),
        m(
          'p.range-field',
          m('input-field', [
            m('input', {
              type: 'range',
              min: '0',
              max: Math.max(...(alert.dts as Array<number>)),
              onchange: (event: Event) => {
                vnode.attrs.actions.setCHOpacities(
                  Number((event.target as HTMLInputElement).value),
                  alert.sourceName + alert.id
                );
              },
            }),
            m('label', 'Delta time [s]'),
          ])
        ),
      ]);
    },
    oncreate: () => {
      const array_of_dom_elements = document.querySelectorAll('input[type=range]');
      M.Range.init(array_of_dom_elements);
    },
  };
};

export const contextFormatComponent: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: (vnode) => {
      const ft = vnode.attrs.state.app.clickedFeature as IGeoJSONFeatureTwo;
      return m('div', [
        m('p', 'ID: ' + ft.properties?.id),
        m('p', 'Description: ' + ft.properties?.description),
        m('p', 'Start: ' + ft.properties?.start),
      ]);
    },
  };
};

export const resourceFormatComponent: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: (vnode) => {
      const ft = vnode.attrs.state.app.clickedFeature as IGeoJSONFeatureTwo;
      return m('div', [
        m('p', 'ID: ' + ft.properties?.id),
        m('p', 'Type: ' + ft.properties?.resourceType),
        m('p', 'Sub Type: ' + ft.properties?.resourceSubType),
        m('p', 'Height: ' + ft.properties?.height),
      ]);
    },
  };
};

export const sensorFormatComponent: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  return {
    view: (vnode) => {
      const ft = vnode.attrs.state.app.clickedFeature as IGeoJSONFeatureTwo;
      const sensors = JSON.parse(ft.properties?.sensors);
      return m(
        'li',
        sensors.map((sensor: any) => {
          return [
            m('.divider'),
            m('p', 'ID: ' + sensor.id),
            m('p', 'Type: ' + sensor.sensorType),
            m('p', 'Height: ' + sensor.height),
            m(
              'p',
              sensor.measurement.metricFeature +
                ': ' +
                sensor.measurement.value +
                ' ' +
                sensor.measurement.unit
            ),
          ];
        })
      );
    },
  };
};

export const incidentLocationFormatComponent: FactoryComponent<{
  state: IAppModel;
  actions: IActions;
}> = () => {
  let source = {
    scenario: {} as IChemicalIncidentScenario,
    control_parameters: {} as IChemicalIncidentControlParameters,
  };
  return {
    view: (vnode) => {
      const ft = vnode.attrs.state.app.clickedFeature as IGeoJSONFeatureTwo;
      const scenario = JSON.parse(ft.properties?.scenario) as IChemicalIncidentScenario;
      const form = formGenerator({});

      return [
        m('p', 'ID: ' + ft.properties?.id),
        m('p', 'Chemical: ' + scenario.chemical),
        m('p', 'Start of release: ' + scenario.start_of_release),
        m(
          'button.btn',
          {
            onclick: () => {
              source.scenario.source_location = scenario.source_location;
              const chemicalIncident = {
                context: ft.properties?.context,
                _id: ft.properties?.id,
                scenario: source.scenario,
                control_parameters: source.control_parameters,
                timestamp: new Date().valueOf(),
              } as IChemicalIncident;

              vnode.attrs.actions.updateCHT(chemicalIncident);
            },
          },
          'Recalculate'
        ),
        m(LayoutForm, {
          form,
          obj: source,
          section: 'source',
        }),
        m('p', 'test text'),
      ];
    },
    oncreate: () => {
      M.AutoInit();
    },
  };
};
