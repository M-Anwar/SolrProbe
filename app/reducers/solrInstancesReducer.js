// @flow
import { LocalStore } from '../localStore'; 

// Types
export const actionNames = {
    LOAD_INSTANCES : 'LOAD_INSTANCES',
    WRITE_INSTANCES: 'WRITE_INSTANCES',
    DELETE_INSTANCE: 'DELETE_INSTANCE'
}

type LoadInstancesAction = {type: typeof actionNames.LOAD_INSTANCES}
type WriteInstancesAction = {type: typeof actionNames.WRITE_INSTANCES, payload:Object}
type DeleteInstanceAction = {type: typeof actionNames.DELETE_INSTANCE, payload:{name:string}}
type ConfigActions = LoadInstancesAction | WriteInstancesAction | DeleteInstanceAction | {type: "default"}

// Action Creators
export const actions = {
    loadInstances: ():LoadInstancesAction => ({type: actionNames.LOAD_INSTANCES}),
    writeInstances: (allInstances:Object): WriteInstancesAction => ({
        type: actionNames.WRITE_INSTANCES,
        payload: allInstances
    }),
    deleteInstance: (instanceName:string): DeleteInstanceAction => ({
        type: actionNames.DELETE_INSTANCE,
        payload: {name:instanceName}
    })
};

//State
type State = {instances: Object}
const initialState: State = {
    instances: {}
}

// Config Key Location
export const solrPaths:string = "solrPaths"

//Reducer
export default function(state:State = initialState, action:ConfigActions): State {
    switch(action.type){
        case actionNames.LOAD_INSTANCES:                              
            return {instances: LocalStore.get(solrPaths, {})};
        case actionNames.WRITE_INSTANCES:                       
            LocalStore.set(solrPaths, action.payload);
            return {instances: LocalStore.get(solrPaths, {})}
        case actionNames.DELETE_INSTANCE:                       
            LocalStore.delete(`${solrPaths}.${action.payload.name}`);
            return {instances: LocalStore.get(solrPaths, {})}
        default:           
            return state;
    }
}