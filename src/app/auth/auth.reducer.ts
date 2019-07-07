import * as fromAuth from './auth.actions';
import { User } from './user.model';

//aca esta todo lo relacionado al estado de autenticacion
// o el usuario autenticado
export interface AuthState {
    user: User;
}

const estadoInicial: AuthState = {
    user: null
};

//Reducer
export function authReducer (state = estadoInicial, action: fromAuth.acciones ): AuthState{

    switch ( action.type ){
        
        case fromAuth.SET_USER:
            return {
                user: { ...action.user} //tomo cada propiedad del objeto user y hago pares de valores. De esta forma clono el objeto
            }
        case fromAuth.UNSET_USER:
            return{
                user:null
            }
      
        default:
            return state;
    }
}