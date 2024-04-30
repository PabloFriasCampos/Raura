import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Pedidos } from '../models/pedidos';

@Component({
  selector: 'app-vista-cocinero',
  templateUrl: './vista-cocinero.component.html',
  styleUrls: ['./vista-cocinero.component.css']
})
export class VistaCocineroComponent implements OnInit {

  pedidos: Pedidos[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getAllPedidos().subscribe((data: Pedidos[]) => {
      this.pedidos = data as Pedidos[];
    });
    this.socketService.listen();
  }

  getAllPedidos() {
    this.socketService.getAllPedidos().subscribe((data: Pedidos[]) => {
      this.pedidos = data as Pedidos[];
    });
  }

  cambiarEstado(id: number, Estado: string) {
    this.socketService.cambiarEstado(id, Estado)
  }

}
