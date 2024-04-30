import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

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

  API_URL: string = 'http://localhost:3030';

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
