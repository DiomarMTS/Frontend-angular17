import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, contrasena: string) {
    return this.http.post<{ message: string, result: boolean, data: { token: string, rol: string, nombre: string } }>(
      'http://localhost:8080/usuarios/iniciarSesion',
      { email, contrasena }
    ).subscribe(
      (res) => {
        if (res.result) {
          this.userSubject.next(res.data);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data));
          if (res.data.rol === 'administrador') {
            Swal.fire({
              title: "Bienvenido",
              text: "Acceso correcto!{{res.data.nombre}}",
              icon: "success"
            });
            this.router.navigateByUrl('/admin_dashboard');
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        } else {
          alert(res.message);
        }
      },
      (error) => {
        console.error('Login error:', error);
        Swal.fire({
          title: "Error",
          text: "credenciales incorrectas",
          icon: "error"
        });
      }
    );
  }

  getUser() {
    return this.userSubject.value;
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }
}
