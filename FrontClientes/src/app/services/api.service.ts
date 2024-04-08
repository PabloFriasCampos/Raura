import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductosXCategoria } from '../models/productos-xcategoria';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL: String = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

  // --------------------- PRODUCTOS ---------------------

  async getProductos(): Promise<ProductosXCategoria[]> {
    const request$ = await this.http.get(`${this.API_URL}/productos`);
    return await lastValueFrom(request$) as ProductosXCategoria[];
  }

  async cargarProducto(id: number): Promise<Producto> {
    const request$ = await this.http.get(`${this.API_URL}/productos/${id}`)
    return await lastValueFrom(request$) as Producto;
  }

  // --------------------- MÉTODOS ---------------------

  getFotoUrl(id: number): string {
    return `${this.API_URL}/images/${id}.jpg`;
  }

}
