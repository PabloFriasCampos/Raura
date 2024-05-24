import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../models/trabajador';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-admin-trabajadores',
  templateUrl: './admin-trabajadores.component.html',
  styleUrls: ['./admin-trabajadores.component.css']
})
export class AdminTrabajadoresComponent implements OnInit {

  trabajadores: Trabajador[] = [];

  constructor(private api: APIService) { }

  async ngOnInit() {
    this.trabajadores = await this.api.getTrabajadoresAdmin();
  }

}
