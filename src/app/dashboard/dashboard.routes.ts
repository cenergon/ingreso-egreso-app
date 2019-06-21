import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';

//Rutas Hijas
export const dashBoardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'detalle', component: DetalleComponent },
    { path: '**', pathMatch:'full', redirectTo: '' }
];

@NgModule({
        imports:[
            RouterModule.forRoot( dashBoardRoutes )
        ],
        exports :[
            RouterModule
        ]

})
export class AppRoutingModule {}