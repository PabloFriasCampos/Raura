import { Component } from '@angular/core';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private api: APIService) { }

  inputEmail: string = '';
  inputPassword: string = '';
  JWT: any;

  async login() {
    this.JWT = await this.api.login(this.inputEmail, this.inputPassword);
    this.JWT = JSON.parse(this.JWT).token
    sessionStorage.setItem('JWT', this.JWT)
    this.api.testProtected()
  }

}
