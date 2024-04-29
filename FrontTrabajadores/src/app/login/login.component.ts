import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

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

  constructor(private api: APIService, private router: Router) { }

  ngOnInit() {
    let JsonWebToken = sessionStorage.getItem('JWT');
    if (JsonWebToken) this.router.navigate(['/cocina']);
  }

  async login() {
    try {
      this.JWT = await this.api.login(this.inputEmail, this.inputPassword);
      this.JWT = JSON.parse(this.JWT).token;
      sessionStorage.setItem('JWT', this.JWT);
      this.router.navigate(['/cocina']);
    } catch (error) {
      this.wrongLogin = true;
    }
  }

}
