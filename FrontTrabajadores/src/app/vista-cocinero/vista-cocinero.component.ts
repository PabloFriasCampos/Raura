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
  pedidosCocina: Pedidos[] = [];
  pedidosPreparacion: Pedidos[] = []

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getAllPedidos().subscribe((data: Pedidos[]) => {
      this.pedidos = data as Pedidos[];
      this.pedidosCocina = this.pedidos.filter((pedido) => pedido.Estado == 'COCINA');
      this.pedidosPreparacion = this.pedidos.filter((pedido) => pedido.Estado == 'PREPARACION');
    });
    this.socketService.listen();
  }

  getAllPedidos() {
    this.socketService.getAllPedidos().subscribe((data: Pedidos[]) => {
      this.pedidos = data as Pedidos[];
      this.pedidosCocina = this.pedidos.filter((pedido) => pedido.Estado == 'COCINA');
      this.pedidosPreparacion = this.pedidos.filter((pedido) => pedido.Estado == 'PREPARACION');
    });
  }

  cambiarEstado(id: number, Estado: string) {
    this.socketService.cambiarEstado(id, Estado)
  }

}
