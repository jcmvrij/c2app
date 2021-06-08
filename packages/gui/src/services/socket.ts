import { FeatureCollection } from 'geojson';
import { IAppModel, UpdateStream } from './meiosis';
import io from 'socket.io-client';
import { IAlert, IGroup, IMessage } from '../../../shared/src';
import { IChemicalHazard } from '../../../shared/src';
import M from 'materialize-css';

export class Socket {
  private socket: SocketIOClient.Socket;

  constructor(us: UpdateStream) {
    this.socket = io(process.env.SERVER || 'http://localhost:3000');

    this.socket.on('positions', (data: FeatureCollection) => {
      if (!this.shouldUpdate()) {
      } else {
        us({ app: { positionSource: data } });
      }
    });
    this.socket.on('alert', (data: IAlert) => {
      us({
        app: {
          alerts: (alerts: Array<IAlert>) => {
            const index = alerts.findIndex((val: IAlert) => {
              return val.identifier === data.identifier;
            });
            if (index > -1) {
              alerts[index] = data;
              return alerts;
            }
            alerts.push(data);
            return alerts;
          },
          alertLayers: (layers: Array<[string, boolean]>) => {
            const index = layers.findIndex((val: [string, boolean]) => {
              return val[0] === data.identifier;
            });
            if (index > -1) {
              return layers;
            }
            layers.push([data.identifier, true]);
            return layers;
          },
        },
      });
      M.toast({ html: 'New Alert' });
    });
    this.socket.on('server-message', (data: string) => {
      const message = JSON.parse(data) as IMessage;
      us({
        app: {
          messages: (messages: Map<string, Array<IMessage>>) => {
            let messageList = messages.get(message.id) as Array<IMessage>;
            if (!messageList) messageList = new Array<IMessage>();
            messageList.push(message);
            messages.set(message.id, messageList);
            return messages;
          },
          newMessages: (messages: { [key: string]: number }) => {
            messages[message.id] += 1;
            return messages;
          },
        },
      });
      M.toast({ html: 'New Chat' });
    });
    this.socket.on('server-notification', (data: string) => {
      const result = JSON.parse(data) as Array<IGroup>;
      us({
        app: {
          groups: () => {
            return result;
          },
          newMessages: (messages: { [key: string]: number }) => {
            result.forEach((group: IGroup) => {
              messages[group.id] = 0;
            })
            return messages;
          },
        },
      });
    });
    M.toast({ html: 'Added to a new group' });
  }

  serverInit(s: IAppModel): Promise<Array<IGroup>> {
    return new Promise((resolve) => {
      this.socket.emit('client-init', { callsign: s.app.callsign }, (result: string) => {
        resolve(JSON.parse(result));
      });
    });
  }

  serverCreate(s: IAppModel, name: string): Promise<Array<IGroup>> {
    return new Promise((resolve) => {
      this.socket.emit(
        'client-create',
        { callsign: s.app.callsign, group: s.app.selectedFeatures, name: name },
        (result: string) => {
          resolve(JSON.parse(result));
        },
      );
    });
  }

  serverUpdate(s: IAppModel, id: string, name: string): Promise<Array<IGroup>> {
    return new Promise((resolve) => {
      this.socket.emit(
        'client-update',
        { callsign: s.app.callsign, id: id, name: name },
        (result: string) => resolve(JSON.parse(result)),
      );
    });
  }

  serverDelete(s: IAppModel, id: string): Promise<Array<IGroup>> {
    return new Promise((resolve) => {
      this.socket.emit('client-delete', { callsign: s.app.callsign, id: id }, (result: string) => {
        resolve(JSON.parse(result));
      });
    });
  }

  serverSend(s: IAppModel, group: IGroup, message: string) {
    this.socket.emit(
      'client-message',
      { id: group.id, callsign: s.app.callsign, message: message },
      (_result: string) => {
      },
    );
  }

  serverCHT(hazard: Partial<IChemicalHazard>): Promise<FeatureCollection> {
    return new Promise((resolve) => {
      this.socket.emit('client-cht', { hazard: hazard }, (result: string) => {
        resolve(JSON.parse(result));
      });
    });
  }

  shouldUpdate(): boolean {
    let update: boolean = true;
    const elems = document.querySelectorAll('.modal');
    elems.forEach((elem: Element) => {
      if (M.Modal.getInstance(elem).isOpen) update = false;
    });
    return update;
  }
}
