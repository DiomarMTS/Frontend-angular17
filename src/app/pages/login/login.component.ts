import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: Login;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  register() {
    this.router.navigateByUrl('/registro');
  }

  onLogin() {
    this.authService.login(this.loginObj.email, this.loginObj.contrasena);
  }
}

export class Login {
  email: string;
  contrasena: string;
  constructor() {
    this.email = '';
    this.contrasena = '';
  }
}
