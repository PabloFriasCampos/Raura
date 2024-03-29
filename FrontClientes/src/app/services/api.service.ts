import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductosXCategoria } from '../models/productos-xcategoria';

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

}
