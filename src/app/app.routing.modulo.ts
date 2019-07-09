import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path:'',
        loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canLoad: [ AuthGuardService ]
    },
    // { 
    //     path: '', 
    //     component: DashboardComponent,
    //     children: dashBoardRoutes,
    //     canActivate: [ AuthGuardService ] //condiciones para entrar a las rutas
    // },
    { path: '**', redirectTo: '' }
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