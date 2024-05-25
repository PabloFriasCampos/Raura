import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { ProductosXCategoria } from '../models/productos-xcategoria';
import { Producto } from '../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import Sqids from 'sqids';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productosXCategoria: ProductosXCategoria[] = [];
  productosMostrados: Producto[] = [];
  inicio: boolean = true;
  id: string = '';
  showId: string = '';
  sqids: Sqids = new Sqids()

  constructor(private api: APIService, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (sessionStorage.getItem('id') && this.id != sessionStorage.getItem('id')) {
      this.id = sessionStorage.getItem('id') || '';
      this.router.navigate(['/mesa/' + this.id]);
    } else {
      sessionStorage.setItem('id', this.id)
    }
    this.showId = this.sqids.decode(this.id)[0].toString();
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