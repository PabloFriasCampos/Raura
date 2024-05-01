import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { Mesa } from '../models/mesa';
import { ActivatedRoute } from '@angular/router';
import { ListaProductos } from '../models/lista-productos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  total: number = 0;
  mesa: Mesa = new Mesa();

  constructor(private api: APIService, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.mesa = await this.api.getMesa(+id);
      this.calcularTotal()
    }
  }

  async changeCantidad(dif: number, producto: ListaProductos) {
    producto.Cantidad += dif;
    await this.api.changeCantidad(producto.Cantidad, producto.id);
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

  async mandarCocina() {
    if (this.mesa.Productos.length == 0) {
      this.toastr.warning('No hay nada que mandar')
    } else {
      try {
        await this.api.mandarCocina(this.mesa.Productos);
        this.toastr.success('Mandado a cocina')
        this.mesa.Productos = [];
        this.total = 0;
      } catch (error) {
        console.log(error)
        this.toastr.error('Se ha producido un error')
      }
    }
  }

}
