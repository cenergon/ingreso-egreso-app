//  Este es el archivo global que tiene toda 
//  la definicion del estado de la aplicacion

//importo mi reducer
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

import { ActionReducerMap } from '@ngrx/store';

//Estado completo de la aplicacion
export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

//Configuracion global de mis Reducer
//ActionReducerMap es propio de ngrx y me permite tener y fusionar mas de un reucer
export const appReducers: ActionReducerMap<AppState> = {
        ui: fromUI.uiReducer,
        auth: fromAuth.authReducer,
        ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
}