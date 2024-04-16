import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { Mesa } from '../models/mesa';
import { ActivatedRoute } from '@angular/router';
import { ListaProductos } from '../models/lista-productos';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  total: number = 0;
  mesa: Mesa = new Mesa();

  constructor(private api: APIService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.mesa = await this.api.getMesa(+id);
      this.calcularTotal()
    }
  }

  changeCantidad(dif: number, producto: ListaProductos) {
    producto.Cantidad += dif;
    if (producto.Cantidad <= 0) {
      this.mesa.Productos.splice(this.mesa.Productos.indexOf(producto), 1)
    }
    this.calcularTotal()
  }

  calcularTotal() {
    this.total = 0;
    for (let producto of this.mesa.Productos) {
      this.total += +(producto.Cantidad * producto.Producto.Precio).toFixed(2);
    }
  }

}
