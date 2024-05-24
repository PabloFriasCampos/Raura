import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import * as api from '../../assets/api.json';
import { SocketService } from './socket.service';
import { Mesa } from '../models/mesa';
import { jwtDecode } from "jwt-decode";
import { Cuenta } from '../models/cuenta';
import { Producto } from '../models/producto';
import { Trabajador } from '../models/trabajador';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  api: any = api;
  API_URL: String = this.api.API_URL;

  constructor(private http: HttpClient, private socketService: SocketService) { }

  // --------------------- LOG IN ---------------------

  async login(email: string, password: string) {
    let options = this.getRequestOptions();
    const body = { Correo: email, Contrasena: password };
    const request$ = this.http.post(`${this.API_URL}/auth/login`, JSON.stringify(body), options);
    return await lastValueFrom(request$);
  }

  /*   async testProtected() {
      let JWT = sessionStorage.getItem('JWT')
      if (JWT) {
        const optionsJWT = this.getRequestOptionsJWT(JWT);
        const request$ = this.http.get(`${this.API_URL}/auth/protected`, optionsJWT);
        console.log(await lastValueFrom(request$))
      } else {
        console.log('No access')
      }
    } */

  // --------------------- COCINA ---------------------

  async cambiarEstado(id: number, estado: string) {
    const request$ = await this.http.get(`${this.API_URL}/mesas/estado/${id}/?estado=${estado}`);
    await lastValueFrom(request$);
    this.refrescar();
  }

  // --------------------- MESAS ---------------------

  async getMesas(): Promise<Mesa[]> {
    const request$ = await this.http.get(`${this.API_URL}/mesas`);
    return await lastValueFrom(request$) as Mesa[];
  }

  async getMesa(id: number): Promise<Mesa> {
    const request$ = await this.http.get(`${this.API_URL}/mesas/${id}`);
    return await lastValueFrom(request$) as Mesa;
  }

  // --------------------- CUENTA ---------------------

  async pedirCuenta(mesa: Mesa) {
    let JWT = sessionStorage.getItem('JWT')
    if (JWT) {
      const optionsJWT = this.getRequestOptionsJWT(JWT);
      const request$ = await this.http.post(`${this.API_URL}/cuenta/crear`, JSON.stringify(mesa), optionsJWT)
      await lastValueFrom(request$);
    }
  }

  async getCuentas(): Promise<Cuenta[]> {
    const request$ = await this.http.get(`${this.API_URL}/cuenta/`)
    return await lastValueFrom(request$) as Cuenta[];
  }

  async getCuenta(id: string): Promise<Cuenta> {
    const request$ = await this.http.get(`${this.API_URL}/cuenta/${id}`);
    return await lastValueFrom(request$) as Cuenta;
  }

  // --------------------- ADMIN ---------------------

  async getProductosAdmin(): Promise<Producto[]> {
    const request$ = await this.http.get(`${this.API_URL}/admin/productos`)
    return await lastValueFrom(request$) as Producto[];
  }

  async getTrabajadoresAdmin(): Promise<Trabajador[]> {
    const request$ = await this.http.get(`${this.API_URL}/admin/trabajadores`)
    return await lastValueFrom(request$) as Trabajador[];
  }


  // --------------------- MÉTODOS ---------------------

  private getRequestOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text'
    };
  }

  private getRequestOptionsJWT(JWT: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT}`
      }),
      responseType: 'text'
    };
  }

  getRoleFromToken(): string | null {
    const token = sessionStorage.getItem('JWT');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.Rol;
    }
    return null;
  }

  refrescar() {
    this.socketService.refrescar();
  }

}
