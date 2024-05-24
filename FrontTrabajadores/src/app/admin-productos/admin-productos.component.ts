import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private api: APIService) { }

  async ngOnInit() {
    this.productos = await this.api.getProductosAdmin();
  }

}
