import {Action} from '@ngrx/store';
import { ACTIVAR_LOADING, DESACTIVAR_LOADING, actions } from './ui.accions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: actions): State {

    switch (action.type){

        case ACTIVAR_LOADING:
        return{
            isLoading: true
        };

        case   DESACTIVAR_LOADING:
        return{
            isLoading: false
        };

        default:
        return state;
    }
}
