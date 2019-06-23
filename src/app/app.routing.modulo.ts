import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashBoardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: '', 
        component: DashboardComponent,
        children: dashBoardRoutes,
        canActivate: [ AuthGuardService ] //condiciones para entrar a las rutas
    },
    { path: '**', pathMatch:'full', redirectTo: '' }
];


@NgModule({
        imports:[
            RouterModule.forRoot( routes )
        ],
        exports :[
            RouterModule
        ]

})
export class AppRoutingModule {}