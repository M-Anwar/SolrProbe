// @flow
import { LocalStore } from '../localStore'; 

// Types
export const actionNames = {
    LOAD_CONFIG : 'LOAD_CONFIG',
    UPDATE_CONFIG: 'UPDATE_CONFIG'
}

type LoadConfigAction = {type: typeof actionNames.LOAD_CONFIG}
type UpdateConfigAction = {type: typeof actionNames.UPDATE_CONFIG, payload:{key:string, value:Object}}
type ConfigActions = LoadConfigAction | UpdateConfigAction | {type: "default"}

// Action Creators
export const actions = {
    loadConfig: ():LoadConfigAction => ({type: actionNames.LOAD_CONFIG}),
    updateConfig: (k:string, v:Object): UpdateConfigAction => ({
        type: actionNames.UPDATE_CONFIG,
        payload: {key:k, value:v}
    })
};

//State
type State = {configPath: string, settings: Object}
const initialState: State = {
    configPath: "",
    settings: {}
}

//Reducer
export default function(state:State = initialState, action:ConfigActions): State {
    switch(action.type){
        case actionNames.LOAD_CONFIG:                              
            return {settings: LocalStore.store, configPath:LocalStore.path};
        case actionNames.UPDATE_CONFIG:                       
            LocalStore.set(action.payload.key, action.payload.value);
            return {...state, settings: LocalStore.store}
        default:           
            return state;
    }
}