import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../services/api.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  producto: Producto = new Producto();
  imageUrl: string = '';
  cantidad = 1;
  id = sessionStorage.getItem('id') || '0'

  constructor(private api: APIService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.producto = await this.api.cargarProducto(+id);
      this.imageUrl = this.api.getFotoUrl(+id);
    }
  }

  async addToMesa() {
    await this.api.addToMesa(this.producto, this.cantidad, +this.id);
  }

  changeCantidad(dif: number) {
    this.cantidad += dif;
    if (this.cantidad < 1) {
      this.cantidad = 1;
    }
  }

}