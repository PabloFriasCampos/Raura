import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as api from '../../assets/api.json';

class MySocket extends Socket {
  constructor(urlSocket: string) {
    super({
      url: urlSocket,
      options: {
        transports: ['websocket']
      },
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  api: any = api;
  API_URL: string = this.api.API_URL;

  private socket: MySocket;

  constructor() {
    this.socket = new MySocket(this.API_URL);
  }

  listen() {
    this.socket.on('connection', () => {
      console.log('server listening...');
    });
  }

  refrescar() {
    this.socket.emit('refrescar');
  }

}
