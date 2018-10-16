// @flow
import { createStore, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas'

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, router);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

sagaMiddleware.run(sagas);

export default { configureStore, history };
