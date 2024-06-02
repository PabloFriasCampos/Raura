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
  file: any
  productoId: number = 0;

  constructor(private api: APIService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    let rol = this.api.getRoleFromToken();
    if (rol === null) this.router.navigate(['/login']);
    if (rol === 'COCINERO') this.router.navigate(['/cocina']);
    if (rol === 'CAMARERO') this.router.navigate(['/camarero']);

  }


  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  async saveNewProducto() {
    if (this.producto.Nombre == '' || this.producto.Categoria == '' || this.producto.Nombre == '' || this.producto.Precio == 0) {
      this.toastr.warning('Rellene todos los campos para crear nuevo producto')
    } else {
      let result = await this.api.saveNewProducto(this.producto);
      if (result) {
        let json = JSON.parse(result)
        this.productoId = json.productoId;
        console.log('id del producto creado: ', this.productoId);
        await this.api.updateProductoImage(this.productoId, this.file)
        this.toastr.success('Producto creado correctamente');
        this.router.navigate(['/adminProductos'])
      } else {
        this.toastr.error('Error al crear Producto');
      }
    }

  }

}
