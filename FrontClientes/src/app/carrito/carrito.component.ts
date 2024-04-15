import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { Mesa } from '../models/mesa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  mesa: Mesa = new Mesa();

  constructor(private api: APIService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const id = await this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.mesa = await this.api.getMesa(+id);
    }
  }

}
