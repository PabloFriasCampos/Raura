import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private api: APIService, private router: Router) { }

  async ngOnInit() {
    let rol = this.api.getRoleFromToken();
    if (rol === null) this.router.navigate(['/login'])
    if (rol === 'COCINERO') this.router.navigate(['/cocina'])
    if (rol === 'CAMARERO') this.router.navigate(['/camarero'])

    this.productos = await this.api.getProductosAdmin();
  }

}
