// @flow
// As a consequence of using flow-runtime and flow-static our reducers have 
// a bit uglier action types. They all define a base type with string, as
// combine reducers sends an initial INIT argument that will cause a run-time
// exception with flow-runtime. 

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import startupConfigLoaderReducer from './startupConfigLoader'

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer, config:startupConfigLoaderReducer })
  );
}
