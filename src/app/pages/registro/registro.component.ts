import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  nuevoUsuario: any = {
    nombre: '',
    email: '',
    rol: 'usuario',
    contrasena: ''
  };

  constructor (private http: HttpClient, private router: Router){

  }

  guardarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.contrasena) {
      Swal.fire({
        title: "Advertencia",
        text: "Todos los campos son obligatorios.",
        icon: "warning"
      });
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(this.nuevoUsuario.contrasena)) {
      Swal.fire({
        title: "Advertencia",
        text: "La contraseña debe tener al menos una letra mayúscula, un número, un carácter especial y un mínimo de 6 caracteres.",
        icon: "warning"
      });
      return;
    }


    this.http.post('http://localhost:8080/usuarios/crear', this.nuevoUsuario)
      .subscribe(
        response => {
          Swal.fire({
            title: "Bienvenido!",
            text: "Cuenta creada!",
            icon: "success"
          });
          console.log('Usuario creado:', response);
          this.resetForm();
          this.router.navigateByUrl('/login');
        },
        error => {
          console.error('Error al crear el usuario:', error);
        }
      );
  }

  resetForm() {
    this.nuevoUsuario = {
      nombre: '',
      email: '',
      rol: 'usuario',
      contrasena: ''
    };
  }
}
