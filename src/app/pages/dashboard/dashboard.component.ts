import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  productosMostrados: Producto[] = [];
  usuariosMostrados: Usuario[] = [];
  userName: string | null = null;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {

    const user = this.authService.getUser();
    this.userName = user ? user.nombre : null;

    this.http.get<Usuario[]>('http://localhost:8080/usuarios/listar').subscribe(data => {
      this.usuariosMostrados = data.slice(0, 6);
    });


    this.http.get<Producto[]>('http://localhost:8080/productos/listar').subscribe(data => {
      this.productosMostrados = data.slice(0, 6);
      this.actualizarURLImagenes();
    });

  }

  actualizarURLImagenes(): void {
    this.productosMostrados.forEach(producto => {
      if (producto.detalleProducto && producto.detalleProducto.imagenProducto) {
        producto.detalleProducto.imagenProducto = `http://localhost:8080/imagenes/${producto.detalleProducto.imagenProducto}`;
      }
    });
  }
}
