import { Component, OnInit } from '@angular/core';
import { Mesa } from '../models/mesa';
import { APIService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vista-mesa',
  templateUrl: './vista-mesa.component.html',
  styleUrls: ['./vista-mesa.component.css']
})
export class VistaMesaComponent implements OnInit {

  total: number = 0;
  mesa: Mesa = new Mesa;
  id: string = '';

  constructor(private api: APIService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  async ngOnInit() {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.mesa = await this.api.getMesa(+this.id) as Mesa;
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = 0;
    for (let producto of this.mesa.Productos) {
      this.total += +(producto.Cantidad * producto.Producto.Precio).toFixed(2);
    }
  }

  async pedirCuenta() {
    if (this.mesa.Productos.length == 0) {
      this.toastr.warning('No hay productos para generar cuenta')
    } else {
      let lista = this.mesa.Productos.filter((producto) => producto.Estado != 'SERVIDO' && producto.Estado != 'CESTA')
      if (lista.length > 0) {
        this.toastr.error('No todos los pedidos se han servido')
      } else {
        await this.api.pedirCuenta(this.mesa);
        this.toastr.success('Cuenta creada');
        this.router.navigate(['/camarero'])
      }
    }
  }

}
