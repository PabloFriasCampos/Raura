import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../models/trabajador';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-new-trabajador',
  templateUrl: './admin-new-trabajador.component.html',
  styleUrls: ['./admin-new-trabajador.component.css']
})
export class AdminNewTrabajadorComponent implements OnInit {

  trabajador: Trabajador = new Trabajador;

  constructor(private api: APIService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    let rol = this.api.getRoleFromToken();
    if (rol === null) this.router.navigate(['/login']);
    if (rol === 'COCINERO') this.router.navigate(['/cocina']);
    if (rol === 'CAMARERO') this.router.navigate(['/camarero']);

  }

  async saveNewTrabajador() {
    if (this.trabajador.Contrasena == '' || this.trabajador.Correo == '' || this.trabajador.Nombre == '' || this.trabajador.Rol == '') {
      this.toastr.warning('Rellene todos los campos para crear nuevo trabajador')
    } else {
      let result = await this.api.saveNewTrabajador(this.trabajador);
      if (result) {
        this.toastr.success('Trabajador creado correctamente');
        this.router.navigate(['/adminTrabajadores'])
      } else {
        this.toastr.error('Error al crear Trabajador');
      }
    }

  }

}
