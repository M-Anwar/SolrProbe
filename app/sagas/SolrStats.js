//@flux
import { takeEvery, all } from 'redux-saga/effects'
import { actionNames as testActionNames } from '../reducers/test'

function* fetchFriends(action){
    console.log(action);   
}

export function* solrStatsAll(){    
    yield all ([
        takeEvery(testActionNames.TEST_TYPE, fetchFriends)
    ])
}