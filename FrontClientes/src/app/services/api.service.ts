import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductosXCategoria } from '../models/productos-xcategoria';
import { Producto } from '../models/producto';
import { Mesa } from '../models/mesa';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL: String = 'http://localhost:3030';

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

  async addToMesa(producto: Producto, cantidad: number, mesaId: number) {
    let options = this.getRequestOptions();
    const request$ = await this.http.post(`${this.API_URL}/mesas/add/${mesaId}?cantidad=${cantidad}`, JSON.stringify(producto), options)
    await lastValueFrom(request$);
    await this.refrescar();
  }

  async getMesa(id: number): Promise<Mesa> {
    const request$ = await this.http.get(`${this.API_URL}/mesas/${id}`);
    return await lastValueFrom(request$) as Mesa;
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
