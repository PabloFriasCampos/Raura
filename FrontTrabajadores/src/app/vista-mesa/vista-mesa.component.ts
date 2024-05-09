import { Component, OnInit } from '@angular/core';
import { Mesa } from '../models/mesa';
import { APIService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-mesa',
  templateUrl: './vista-mesa.component.html',
  styleUrls: ['./vista-mesa.component.css']
})
export class VistaMesaComponent implements OnInit {

  mesa: Mesa = new Mesa;
  id: string = '';

  constructor(private api: APIService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.id = await this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.mesa = await this.api.getMesa(+this.id) as Mesa;
  }

}
