import { Action } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
export const SET_USER = '[Auth] Set user';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: Usuario){}
}

export type actions = SetUserAction;
