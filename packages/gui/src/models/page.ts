import { ComponentTypes } from 'mithril';

type IconResolver = () => string;
type IconOrResolver = string | IconResolver;

export enum Pages {
  HOME = 'HOME',
  MAP = 'MAP',
  CHAT = 'CHAT',
  SETTINGS = 'SETTINGS',
  ALERTS = 'ALERTS',
  CREATORTEAMCOMPOSITION = 'CREATORTEAMCOMPOSITION',
  CREATORGAME = 'CREATORGAME',
  CREATORUNITPLACEMENT = 'CREATORUNITPLACEMENT',
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
