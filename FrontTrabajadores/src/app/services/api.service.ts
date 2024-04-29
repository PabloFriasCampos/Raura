import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL: String = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

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

  async getAllCocina() {
    let options = this.getRequestOptions();
    const request$ = this.http.get(`${this.API_URL}/cocina/all`, options);
    return await lastValueFrom(request$);
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

}
