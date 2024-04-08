import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { ProductosXCategoria } from '../models/productos-xcategoria';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productosXCategoria: ProductosXCategoria[] = [];
  productosMostrados: Producto[] = [];
  inicio: boolean = true;

  constructor(private api: APIService) { }

  async ngOnInit(): Promise<void> {
    this.productosXCategoria = await this.api.getProductos() as ProductosXCategoria[];
  }

  mostrarProductos(categoria: string) {
    if (this.inicio) this.inicio = false;
    let categoriaEncontrada = this.productosXCategoria.find(cat => cat.Categoria === categoria);
    if (categoriaEncontrada) {
      this.productosMostrados = categoriaEncontrada.Productos;
    }

  }

}