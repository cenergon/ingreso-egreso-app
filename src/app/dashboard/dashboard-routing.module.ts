import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashBoardRoutes } from './dashboard.routes';
//import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes =[
     { 
        path: '', 
        component: DashboardComponent,
        children: dashBoardRoutes,
        // canActivate: [ AuthGuardService ] //condiciones para entrar a las rutas
    },
  ]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
