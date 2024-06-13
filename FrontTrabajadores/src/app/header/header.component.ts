import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  isCamarero: boolean = false;
  isCocinero: boolean = false;

  constructor(private router: Router, private api: APIService) { }

  ngOnInit() {
    let rol = this.api.getRoleFromToken();
    this.isCamarero = (rol === 'CAMARERO');
    this.isCocinero = (rol === 'COCINERO');
    if (rol === 'ADMIN') {
      this.isAdmin = true;
      this.isCocinero = true;
      this.isCamarero = true;
    }
  }

  logout() {
    sessionStorage.removeItem('JWT')
    this.router.navigate(['/login'])
  }

}
