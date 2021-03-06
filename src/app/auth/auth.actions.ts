import { Action } from '@ngrx/store';
import { User } from './user.model';
import { acciones } from '../shared/ui.accions';

export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] UnSet User';


export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor( public user: User ){}
        
}


export class UnSetUserAction implements Action {
    readonly type = UNSET_USER;
        
}

export type acciones = SetUserAction | UnSetUserAction;
