import { Action } from '@ngrx/store';
import { User } from './user.model';
import { acciones } from '../shared/ui.accions';

export const SET_USER = '[Auth] Set User';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor( public user: User ){}
        
}

export type acciones = SetUserAction;
