import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../models/trabajador';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-trabajadores',
  templateUrl: './admin-trabajadores.component.html',
  styleUrls: ['./admin-trabajadores.component.css']
})
export class AdminTrabajadoresComponent implements OnInit {

  trabajadores: Trabajador[] = [];

  constructor(private api: APIService, private router: Router) { }

  async ngOnInit() {
    let rol = this.api.getRoleFromToken();
    if (rol === null) this.router.navigate(['/login'])
    if (rol === 'COCINERO') this.router.navigate(['/cocina'])
    if (rol === 'CAMARERO') this.router.navigate(['/camarero'])

    this.trabajadores = await this.api.getTrabajadoresAdmin();
  }

}
