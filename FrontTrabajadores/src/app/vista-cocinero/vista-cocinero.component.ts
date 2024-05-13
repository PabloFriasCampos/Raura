import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Pedidos } from '../models/pedidos';
import { APIService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vista-cocinero',
  templateUrl: './vista-cocinero.component.html',
  styleUrls: ['./vista-cocinero.component.css']
})
export class VistaCocineroComponent implements OnInit {

  pedidos: Pedidos[] = [];
  pedidosCocina: Pedidos[] = [];
  pedidosPreparacion: Pedidos[] = []

  constructor(private socketService: SocketService, private api: APIService, private toastr: ToastrService) { }

  ngOnInit() {
    this.socketService.getAllPedidos().subscribe((data: Pedidos[]) => {
      this.pedidos = data as Pedidos[];
      this.pedidosCocina = this.pedidos.filter((pedido) => pedido.Estado == 'COCINA');
      this.pedidosPreparacion = this.pedidos.filter((pedido) => pedido.Estado == 'PREPARACION');
    });
    this.socketService.listen();
    this.socketService.refrescar();
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

  async cambiarEstadoCocina(pedido: Pedidos, estado: string) {
    try {
      pedido.Estado = estado;
      this.pedidosCocina = this.pedidos.filter((pedido) => pedido.Estado == 'COCINA');
      this.pedidosPreparacion = this.pedidos.filter((pedido) => pedido.Estado == 'PREPARACION');
      await this.api.cambiarEstado(pedido.ListaProductosMesaID, estado);
    } catch (error) {
      this.toastr.error('No se pudo modificar el estado')
      console.log(error)
    }
  }

}
