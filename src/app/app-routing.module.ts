import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { Role } from './models/role';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    //data: { roles: [Role.User] },
    children: [
      {
        path: 'acolhimento',
        loadChildren: () =>
          import('./acolhimento/acolhimento.module').then(
            (m) => m.AcolhimentoModule
          ),
      },
      {
        path: 'comunidade',
        loadChildren: () =>
          import('./comunidade/comunidade.module').then(
            (m) => m.ComunidadeModule
          ),
      },
      {
        path: 'colaborador',
        loadChildren: () =>
          import('./colaborador/colaborador.module').then(
            (m) => m.ColaboradorModule
          ),
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.SuperAdmin] },
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path:'',
        component:HomeComponent

      }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
