import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  producto: Producto = new Producto();
  imageUrl: string = '';
  cantidad = 1;
  id = sessionStorage.getItem('id') || '0';
  loading: boolean = false;

  constructor(private api: APIService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router, private translate: TranslateService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.producto = await this.api.cargarProducto(+id);
      this.imageUrl = this.api.getFotoUrl(+id);
    }
  }

  async addToMesa() {
    try {
      this.loading = true;
      await this.api.addToMesa(this.producto, this.cantidad, this.id);
      this.loading = false;
      this.toastr.info(this.translate.getTranslation('addToCart'))
      this.router.navigate(['/mesa/' + this.id])
    } catch (error) {
      this.loading = false;
      this.toastr.error(this.translate.getTranslation('notAddToCart'))
      console.log(error)
    }
  }

  changeCantidad(dif: number) {
    this.cantidad += dif;
    if (this.cantidad < 1) {
      this.cantidad = 1;
    }
  }

}
