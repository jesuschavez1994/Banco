import { Action } from '@ngrx/store';
import { UserStore } from '../../models/models-@ngrx/userStore.models';
export const SET_USER = '[Auth] Set user';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: UserStore){}
}

export type actions = SetUserAction;
