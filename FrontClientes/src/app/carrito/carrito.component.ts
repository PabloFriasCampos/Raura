import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { Mesa } from '../models/mesa';
import { ActivatedRoute } from '@angular/router';
import { ListaProductos } from '../models/lista-productos';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  total: number = 0;
  mesa: Mesa = new Mesa();
  loading: boolean = false;
  id: string = '';

  constructor(private api: APIService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private translate: TranslateService) { }

  async ngOnInit(): Promise<void> {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.mesa = await this.api.getMesa(this.id);
    this.calcularTotal()
  }

  async changeCantidad(dif: number, producto: ListaProductos) {
    producto.Cantidad += dif;
    await this.api.changeCantidad(producto.Cantidad, producto.ListaProductosMesaID);
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
      this.toastr.warning(this.translate.getTranslation('emptyToSend'))
    } else {
      try {
        this.loading = true;
        await this.api.mandarCocina(this.mesa.Productos);
        this.loading = false;
        this.toastr.success(this.translate.getTranslation('sent'))
        this.mesa.Productos = [];
        this.total = 0;
      } catch (error) {
        this.loading = false;
        console.log(error)
        this.toastr.error(this.translate.getTranslation('error'))
      }
    }
  }

}
