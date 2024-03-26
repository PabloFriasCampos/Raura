import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  constructor(private http: HttpClient) { }

  async test() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const request$ = await this.http.get('http://localhost:3030/productos', { headers })
    let json = await lastValueFrom(request$)
    console.log(json)

  }

}
