import * as fromAuth from './auth.actions';
import { UserStore } from '../../models/models-@ngrx/userStore.models';

export interface AuthState {
    user: UserStore;
}

const estadoInicial: AuthState = {
    user: null
};

export function authReducer( state = estadoInicial, action: fromAuth.actions): AuthState{

    switch ( action.type){

        case fromAuth.SET_USER:
            return {
                user: { ...action.user }
            };

        default:
        return state;
    }

}
