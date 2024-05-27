import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-new-producto',
  templateUrl: './admin-new-producto.component.html',
  styleUrls: ['./admin-new-producto.component.css']
})
export class AdminNewProductoComponent implements OnInit {

  producto: Producto = new Producto;

  constructor(private api: APIService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    let rol = this.api.getRoleFromToken();
    if (rol === null) this.router.navigate(['/login']);
    if (rol === 'COCINERO') this.router.navigate(['/cocina']);
    if (rol === 'CAMARERO') this.router.navigate(['/camarero']);

  }

  async saveNewProducto() {
    if (this.producto.Nombre == '' || this.producto.Categoria == '' || this.producto.Nombre == '' || this.producto.Precio == 0) {
      this.toastr.warning('Rellene todos los campos para crear nuevo producto')
    } else {
      let result = await this.api.saveNewProducto(this.producto);
      if (result) {
        this.toastr.success('Producto creado correctamente');
        this.router.navigate(['/adminProductos'])
      } else {
        this.toastr.error('Error al crear Producto');
      }
    }

  }

}
