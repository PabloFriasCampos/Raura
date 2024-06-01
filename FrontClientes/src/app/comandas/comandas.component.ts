import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mesa } from '../models/mesa';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.component.html',
  styleUrls: ['./comandas.component.css']
})
export class ComandasComponent implements OnInit {

  mesa: Mesa = new Mesa;

  constructor(private activatedRoute: ActivatedRoute, private api: APIService) { }

  async ngOnInit() {
    const id = await this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.mesa = await this.api.getComandas(id);
    }
  }

}
