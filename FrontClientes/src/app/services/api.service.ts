import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductosXCategoria } from '../models/productos-xcategoria';
import { Producto } from '../models/producto';
import { Mesa } from '../models/mesa';
import { SocketService } from './socket.service';
import { ListaProductos } from '../models/lista-productos';
import * as api from '../../assets/api.json';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  api: any = api;
  API_URL: String = this.api.API_URL;

  constructor(private http: HttpClient, private socketService: SocketService) {
    this.socketService.listen();
  }

  // --------------------- PRODUCTOS ---------------------

  async getProductos(): Promise<ProductosXCategoria[]> {
    const request$ = await this.http.get(`${this.API_URL}/productos`);
    return await lastValueFrom(request$) as ProductosXCategoria[];
  }

  async cargarProducto(id: number): Promise<Producto> {
    const request$ = await this.http.get(`${this.API_URL}/productos/${id}`)
    return await lastValueFrom(request$) as Producto;
  }

  // --------------------- MESAS ---------------------

  async addToMesa(producto: Producto, cantidad: number, mesaId: string) {
    let options = this.getRequestOptions();
    const request$ = await this.http.post(`${this.API_URL}/mesas/add/${mesaId}?cantidad=${cantidad}`, JSON.stringify(producto), options)
    await lastValueFrom(request$);
  }

  async getMesa(id: string): Promise<Mesa> {
    const request$ = await this.http.get(`http://localhost:3030/mesas/${id}?cesta=1`);
    return await lastValueFrom(request$) as Mesa;
  }

  async changeCantidad(total: number, id: number) {
    const request$ = await this.http.get(`${this.API_URL}/mesas/cantidad/${id}?cantidad=${total}`);
    await lastValueFrom(request$);
  }

  async mandarCocina(productos: ListaProductos[]) {
    let options = this.getRequestOptions();
    const request$ = await this.http.post(`${this.API_URL}/mesas/send`, JSON.stringify(productos), options)
    await lastValueFrom(request$);
    setTimeout(() => this.refrescar(), 2000)
  }

  // --------------------- MÉTODOS ---------------------

  getFotoUrl(id: number): string {
    return `${this.API_URL}/images/${id}.jpg`;
  }

  private getRequestOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text'
    };
  }

  refrescar() {
    this.socketService.refrescar();
  }

}
