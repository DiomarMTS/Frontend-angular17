import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userName = user ? user.nombre : null;
  }

  SingUp() {
    this.router.navigateByUrl('/login');
  }

  productos() {
    this.router.navigateByUrl('/productos');
  }

  logout() {
    this.authService.logout();
  }
}
