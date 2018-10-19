// @flow
import { LocalStore } from '../localStore'; 
import uuid4 from 'uuid';

// Types
export const actionNames = {
    LOAD_INSTANCES : 'LOAD_INSTANCES',
    FLUSH_INSTANCES: 'FLUSH_INSTANCES',
    ADD_INSTANCE: 'ADD_INSTANCE',
    MODIFY_INSTANCE: 'MODIFY_INSTANCE',    
    DELETE_INSTANCE: 'DELETE_INSTANCE'
}

type LoadInstancesAction = {type: typeof actionNames.LOAD_INSTANCES};
type FlushInstancesAction = {type: typeof actionNames.FLUSH_INSTANCES};
type AddInstanceAction = {type: typeof actionNames.ADD_INSTANCE};
type ModifyInstanceAction = {type: typeof actionNames.MODIFY_INSTANCE, payload:{id:string,name:string, url:string}};
type DeleteInstanceAction = {type: typeof actionNames.DELETE_INSTANCE, payload:{id:string}};
type ConfigActions = LoadInstancesAction | FlushInstancesAction| AddInstanceAction | ModifyInstanceAction | DeleteInstanceAction

//Action Creators
export const actions = {
    loadInstances: (): LoadInstancesAction => ({type: actionNames.LOAD_INSTANCES}),
    flushInstances: (): FlushInstancesAction => ({type: actionNames.FLUSH_INSTANCES}),
    addInstance: (): AddInstanceAction => ({type: actionNames.ADD_INSTANCE}),
    modifyInstance: (idI:string, nameI:string, urlI:string): ModifyInstanceAction => ({
        type: actionNames.MODIFY_INSTANCE,
        payload: {id:idI, name:nameI, url:urlI}
    }),
    deleteInstance: (idI:string) => ({
        type: actionNames.DELETE_INSTANCE,
        payload: {id:idI}
    })
};

//State
type State = {+instances: Array<{id:string, name:string, url:string}>}
const initialState: State = {
    instances: []
}

// Config Key Location
export const solrPaths:string = "solrPaths"

//Reducer
export default function(state:State = initialState, action:ConfigActions): State {
    switch(action.type){
        case actionNames.LOAD_INSTANCES:                              
            return { instances: LocalStore.get(solrPaths, []) };
        case actionNames.FLUSH_INSTANCES:                       
            LocalStore.set(solrPaths, state.instances);
            return { instances: LocalStore.get(solrPaths, []) }
        case actionNames.ADD_INSTANCE:                                   
            return { instances: state.instances.concat({id:uuid4(), name:"", url:""}) }
        case actionNames.MODIFY_INSTANCE:       
            const [idI, nameI, urlI] = [action.payload.id, action.payload.name, action.payload.url]
            let modifiedInstances = state.instances.map(instance =>{
                if(instance.id==idI){
                    return {id:idI, name:nameI, url:urlI}
                }
                else{
                    return {...instance}
                }
            });
            return {instances: modifiedInstances}
        case actionNames.DELETE_INSTANCE:       
            const deleteId = action.payload.id                            
            return {instances: state.instances.filter(instance => instance.id !== deleteId)}
        default:                     
            return state;
    }
}
