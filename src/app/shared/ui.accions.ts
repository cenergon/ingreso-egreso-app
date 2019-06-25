//Acciones de la aplicacion relacionada a la interfaz del usuario

import { Action } from '@ngrx/store';

//Permite saber si la aplicacion esta cargando
export const ACTIVAR_LOADING = '[IU Loadin] Cargando...' ;
export const DESACTIVAR_LOADING = '[UI Loadin Fin de carga..]';

//Clases de mis acciones
export class ActivarLoadingAction implements Action{

    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action{

    readonly type = DESACTIVAR_LOADING;
}

//Acciones validas que puedo emitir a mi reducer, esto e smi type de acciones
export type acciones = ActivarLoadingAction | DesactivarLoadingAction;