import { ComponentTypes } from 'mithril';

type IconResolver = () => string;
type IconOrResolver = string | IconResolver;




export enum Pages {
  HOME = 'HOME',
  CONFIGURATOR = 'CONFIGURATOR',
  CONFIGURATORTEAMS = 'CONFIGURATORTEAMS',
  MAP = 'MAP',
  CHAT = 'CHAT',
  SETTINGS = 'SETTINGS',
  ALERTS = 'ALERTS',
  CONFIGURATORUNITS = "CONFIGURATORUNITS",
  CONFIGURATORPLACEMENT = "CONFIGURATORPLACEMENT"
}

export interface IPage {
  id: Pages;
  default?: boolean;
  hasNavBar?: boolean;
  title: string;
  icon?: IconOrResolver;
  route: string;
  visible: boolean;
  component: ComponentTypes<any, any>;
  sidebar: ComponentTypes<any, any>;
  hasSidebar: boolean;
}
