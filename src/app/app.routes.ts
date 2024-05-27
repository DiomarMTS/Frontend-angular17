import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService  } from './service/auth.service';
import { ListarproductosComponent } from './pages/listarproductos/listarproductos.component';
import { CrearproductosComponent } from './pages/productos/crearproductos/crearproductos.component';
import { EditarproductosComponent } from './pages/productos/editarproductos/editarproductos.component';
import { FormularioeditarComponent } from './pages/productos/formularioeditar/formularioeditar.component';
import { EliminarproductosComponent } from './pages/productos/eliminarproductos/eliminarproductos.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'admin_dashboard',
    component: AdminDashboardComponent
  },
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [AuthService]
      },
      {
        path: 'productos',
        component: ListarproductosComponent
      },
      {
        path: 'crearproductos',
        component: CrearproductosComponent
      },
      {
        path: 'editarproductos',
        component: EditarproductosComponent
      },
      {
        path: 'formularioeditar/:id',
        component: FormularioeditarComponent
      },
      {
        path: 'eliminarproductos',
        component: EliminarproductosComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthService]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: 'productos',
        component: ListarproductosComponent
      },
      {
        path: 'crearproductos',
        component: CrearproductosComponent
      },
      {
        path: 'editarproductos',
        component: EditarproductosComponent
      },
      {
        path: 'formularioeditar/:id',
        component: FormularioeditarComponent
      },
      {
        path: 'eliminarproductos',
        component: EliminarproductosComponent
      }
    ]
  }
];
