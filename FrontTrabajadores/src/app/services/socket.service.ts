import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Pedidos } from '../models/pedidos';

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

  cambiarEstado(id: number, Estado: string) {
    this.socket.emit('cambiarEstado', id, Estado);
  }

  getAllPedidos(): Observable<Pedidos[]> {
    return new Observable<Pedidos[]>((observer) => {
      this.socket.on('getAllPedidos', (data: Pedidos[]) => {
        observer.next(data);
      });
    });
  }

}
