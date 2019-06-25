import * as fromUI from './ui.accions';

//Declaro interfaz
export interface State {
    isLoading: boolean;
}

const initSate : State ={
    isLoading : false
}

//Creo mi reducer de ui
//Recibo el estado inicial y las acciones siempre, siempre regreso algo de tipo state
export function uiReducer ( state = initSate, action: fromUI.acciones): State{
    
    switch ( action.type ) {

        case fromUI.ACTIVAR_LOADING:
            return{
                isLoading : true
            }
        case fromUI.DESACTIVAR_LOADING:
            return{
                isLoading : false
            }
        
        default:
            return state;
    }

}