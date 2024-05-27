import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userName = user ? user.nombre : null;
  }

  logoff() {
    this.authService.logout();
  }

  productos() {
    this.router.navigateByUrl('/productos');
  }

  crearproductos() {
    this.router.navigateByUrl('/crearproductos');
  }

  editarproductos() {
    this.router.navigateByUrl('/editarproductos');
  }

  eliminarproductos() {
    this.router.navigateByUrl('/eliminarproductos');
  }
}
