import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Cuenta } from '../models/cuenta';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent implements OnInit {

  cuentas: Cuenta[] = [];

  constructor(private api: APIService) { }

  async ngOnInit() {
    let cuentasProv: Cuenta[] = await this.api.getCuentas()
    this.cuentas = cuentasProv.map(cuenta => {
      const date = new Date(cuenta.FechaCuenta);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;
      return {
        FechaCuenta: formattedDate,
        TotalCuenta: cuenta.TotalCuenta
      }
    });
  }

}