import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { Cuenta } from '../models/cuenta';

@Component({
  selector: 'app-vista-cuenta',
  templateUrl: './vista-cuenta.component.html',
  styleUrls: ['./vista-cuenta.component.css']
})
export class VistaCuentaComponent implements OnInit {

  id: string = '';
  cuenta: Cuenta = new Cuenta;

  constructor(private activatedRoute: ActivatedRoute, private api: APIService, private router: Router) { }

  async ngOnInit() {
    let rol = this.api.getRoleFromToken();
    if (rol === null) this.router.navigate(['/login'])
    if (rol === 'COCINERO') this.router.navigate(['/cocina'])
    if (rol === 'CAMARERO') this.router.navigate(['/camarero'])

    this.id = await this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.cuenta = await this.api.getCuenta(this.id) as Cuenta;
    const date = new Date(this.cuenta.FechaCuenta);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;

    this.cuenta.FechaCuenta = formattedDate;
  }

  abrirPDF() {
    this.api.abrirPDF(this.cuenta.id);
  }

}
