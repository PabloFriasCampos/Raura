import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private api: APIService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.producto = await this.api.cargarProducto(+id);
      this.imageUrl = this.api.getFotoUrl(+id);
    }
  }

  async addToMesa() {
    try {
      await this.api.addToMesa(this.producto, this.cantidad, +this.id);
      this.toastr.info('Añadido a la cesta')
      this.router.navigate(['/mesa/' + this.id])
    } catch (error) {
      this.toastr.error('No se pudo añadir a la cesta')
      console.log(error)
    }
  }

  changeCantidad(dif: number) {
    this.cantidad += dif;
    if (this.cantidad < 1) {
      this.cantidad = 1;
    }
  }

}
