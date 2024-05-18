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

  constructor(private router: Router, private api: APIService) { }

  ngOnInit() {
    let rol = this.api.getRoleFromToken();
    this.isAdmin = (rol === 'ADMIN');
  }

  logout() {
    sessionStorage.removeItem('JWT')
    this.router.navigate(['/login'])
  }

}
