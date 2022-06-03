import m, { FactoryComponent, RouteDefs } from 'mithril';
import { actions, states, IAppModel, IActions } from './meiosis';
import { IPage, Pages } from '../models';
import { Layout } from '../components/layout';
import { Map } from '../components/map/map';
import { mapSideBar } from '../components/sidebars/map-sidebar';
import { sideBar } from '../components/sidebars/sidebar';
import { Chat } from '../components/chat/chat';
import { Settings } from '../components/settings/settings';
import { Alerts } from '../components/alerts/alerts';
import { chatSidebar } from '../components/sidebars/chat-sidebar';
import { Home } from '../components/home/home';
import { creatorGame, creatorTeamComposition, creatorUnitPlacement } from '../components/creator';

class RoutingService {
  private pages!: ReadonlyArray<IPage>;

  constructor(private layout: FactoryComponent<{ state: IAppModel; actions: IActions }>, pages: IPage[]) {
    this.setList(pages);
  }

  public setList(list: IPage[]) {
    this.pages = Object.freeze(list);
  }

  public getPages() {
    return this.pages;
  }

  public get defaultRoute() {
    const page = this.pages.filter((p) => p.default).shift();
    return page ? page.route : this.pages[0].route;
  }

  public route(pageId: Pages) {
    const page = this.pages.filter((p) => p.id === pageId).shift();
    return page ? page.route : this.defaultRoute;
  }

  public switchTo(
    pageId: Pages,
    params?: { [key: string]: string | number | undefined },
    query?: { [key: string]: string | number | undefined }
  ) {
    const page = this.pages.filter((p) => p.id === pageId).shift();
    if (page) {
      const url = page.route + (query ? '?' + m.buildQueryString(query) : '');
      m.route.set(url, params);
    }
  }

  public routingTable() {
    return this.pages.reduce((r, p) => {
      r[p.route] = p.hasSidebar
        ? {
            render: () =>
              m(this.layout, { state: states(), actions: actions }, [
                m(p.sidebar, { state: states(), actions: actions }),
                m(p.component, { state: states(), actions: actions }),
              ]),
          }
        : {
            render: () =>
              m(
                this.layout,
                { state: states(), actions: actions },
                m(p.component, { state: states(), actions: actions })
              ),
          };
      return r;
    }, {} as RouteDefs);
  }
}

export const routingSvc: RoutingService = new RoutingService(Layout, [
  {
    id: Pages.HOME,
    title: 'Home',
    icon: 'home',
    route: '/home',
    visible: true,
    component: Home,
    sidebar: sideBar,
    hasSidebar: false,
    default: true,
  },
  {
    id: Pages.CREATORGAME,
    title: 'CreatorGame',
    icon: 'tune',
    route: '/creatorgame',
    visible: true,
    component: creatorGame,
    sidebar: sideBar,
    hasSidebar: false,
  },
  {
    id: Pages.CREATORTEAMCOMPOSITION,
    title: 'Team composition',
    icon: 'tune',
    route: '/creator-team-composition',
    visible: true,
    component: creatorTeamComposition,
    sidebar: sideBar,
    hasSidebar: false,
  },
  {
    id: Pages.CREATORUNITPLACEMENT,
    title: 'Unit placement',
    icon: 'tune',
    route: '/creator-unit-placement',
    visible: true,
    component: creatorUnitPlacement,
    sidebar: sideBar,
    hasSidebar: false,
  },
  {
    id: Pages.MAP,
    title: 'Map',
    icon: 'map',
    route: '/map',
    visible: true,
    component: Map,
    sidebar: mapSideBar,
    hasSidebar: true,
  },
  {
    id: Pages.CHAT,
    title: 'Chat',
    icon: 'chat',
    route: '/chat',
    visible: true,
    component: Chat,
    sidebar: chatSidebar,
    hasSidebar: true,
  },
  {
    id: Pages.SETTINGS,
    title: 'Settings',
    icon: 'settings',
    route: '/settings',
    visible: true,
    component: Settings,
    sidebar: sideBar,
    hasSidebar: false,
  },
  {
    id: Pages.ALERTS,
    title: 'Alerts',
    icon: 'warning',
    route: '/alerts',
    visible: true,
    component: Alerts,
    sidebar: sideBar,
    hasSidebar: false,
  },
] as IPage[]);
