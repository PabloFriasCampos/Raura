// admin-productos.component.ts
import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  productos: Producto[] = [];
  productosBackup: { [id: number]: Producto } = {};
  selectedFiles: { [id: number]: File } = {};

  constructor(private api: APIService, private router: Router, private toastr: ToastrService) { }

  async ngOnInit() {
    let rol = this.api.getRoleFromToken();
    if (rol === null) this.router.navigate(['/login']);
    if (rol === 'COCINERO') this.router.navigate(['/cocina']);
    if (rol === 'CAMARERO') this.router.navigate(['/camarero']);

    this.productos = await this.api.getProductosAdmin();
    this.productos.forEach(producto => producto.editing = false);
  }

  editProducto(producto: Producto) {
    this.productosBackup[producto.id] = { ...producto };
    producto.editing = true;
  }

  cancelEdit(producto: Producto) {
    const id = producto.id;
    this.productos = this.productos.map(p => p.id === id ? { ...this.productosBackup[id], editing: false } : p);
    delete this.productosBackup[id];
    delete this.selectedFiles[id];
  }

  onFileSelected(event: any, producto: Producto) {
    this.selectedFiles[producto.id] = event.target.files[0];
  }

  async saveProducto(producto: Producto) {
    producto.editing = false;
    let result = await this.api.updateProducto(producto);
    if (result != null) {
      this.toastr.success('Producto actualizado');
      if (this.selectedFiles[producto.id]) {
        let uploadResult = await this.api.updateProductoImage(producto.id, this.selectedFiles[producto.id]);
      }
    } else {
      this.toastr.error('Error actualizando producto');
    }
    delete this.productosBackup[producto.id];
    delete this.selectedFiles[producto.id];
  }

}
