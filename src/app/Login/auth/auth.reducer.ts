import * as fromAuth from './auth.actions';
import { Usuario } from '../../models/usuario.model';

export interface AuthState {
    user: Usuario;
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
