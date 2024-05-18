import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputEmail: string = '';
  inputPassword: string = '';
  JWT: any;
  wrongLogin: boolean = false;

  constructor(private api: APIService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    let JsonWebToken = sessionStorage.getItem('JWT');
    if (JsonWebToken) {
      let rol = this.api.getRoleFromToken();
      let url = this.getRolUrl(rol);
      this.router.navigate([url]);
    }
  }

  async login() {
    try {
      this.JWT = await this.api.login(this.inputEmail, this.inputPassword);
      this.JWT = JSON.parse(this.JWT).token;
      sessionStorage.setItem('JWT', this.JWT);
      let rol = this.api.getRoleFromToken();
      let url = this.getRolUrl(rol);
      this.router.navigate([url]);
    } catch (error) {
      this.toastr.error('Usuario o contraseña incorrectos')
    }
  }

  getRolUrl(rol: string | null): string {
    let url = '';
    if (rol === 'ADMIN') url = '/admin'
    if (rol === 'COCINERO') url = '/cocina'
    if (rol === 'CAMARERO') url = '/camarero'
    return url;
  }

}
