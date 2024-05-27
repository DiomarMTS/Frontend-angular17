import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  userName: string | null = null;

  constructor(private authService: AuthService,private router: Router) {

  }
  ngOnInit() {
    const user = this.authService.getUser();
    this.userName = user ? user.nombre : null;
  }

  SingUp() {
    this.router.navigateByUrl('/login');
  }

  logoff() {
    this.router.navigateByUrl('/login');
  }
}
