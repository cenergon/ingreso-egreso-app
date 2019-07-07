import * as fromIngresEgreso from './ingreso-egresp.actions'
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const estadoInicial :  IngresoEgresoState ={
    items: []
};

//Creo Reducer
export function ingresoEgresoReducer( state =  estadoInicial, action: fromIngresEgreso.acciones ):IngresoEgresoState{

    switch (action.type){

        case fromIngresEgreso.SET_ITEMS:
        return {
            items: [ //barro el arreglo y retorno el objeto nuevo, rompo la relacion por refencia.
                ...action.items.map( item => {
                    return {
                        ...item
                    };
                })
            ]
        };

        case fromIngresEgreso.UNSET_ITEMS:
            return {
                items: []
            }
        
        default:
            return state;
    } 
}