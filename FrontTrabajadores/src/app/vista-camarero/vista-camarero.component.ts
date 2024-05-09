import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../models/pedidos';
import { SocketService } from '../services/socket.service';
import { APIService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from '../models/mesa';

@Component({
  selector: 'app-vista-camarero',
  templateUrl: './vista-camarero.component.html',
  styleUrls: ['./vista-camarero.component.css']
})
export class VistaCamareroComponent implements OnInit {

  pedidos: Pedidos[] = [];
  pedidosServir: Pedidos[] = [];
  mesas: Mesa[] = [];

  constructor(private socketService: SocketService, private api: APIService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.socketService.getAllPedidos().subscribe((data: Pedidos[]) => {
      this.pedidos = data as Pedidos[];
      this.pedidosServir = this.pedidos.filter((pedido) => pedido.Estado == 'SERVIR');
    });
    this.socketService.listen();
    this.socketService.refrescar();
    this.mesas = await this.api.getMesas();
  }

  getAllPedidos() {
    this.socketService.getAllPedidos().subscribe((data: Pedidos[]) => {
      this.pedidos = data as Pedidos[];
      this.pedidosServir = this.pedidos.filter((pedido) => pedido.Estado == 'SERVIR');
    });
  }

  cambiarEstado(id: number, Estado: string) {
    this.socketService.cambiarEstado(id, Estado)
  }

}
