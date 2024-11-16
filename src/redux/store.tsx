import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';


const sagaMiddleware = createSagaMiddleware();
const loadPersistedState = () => {
  const persistedStateString = window.localStorage.getItem('reduxState');
  if (persistedStateString) {
    try {
      return JSON.parse(persistedStateString);
    } catch (error) {
    }
  }
  return {};
};

const persistedState = loadPersistedState();
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);
store.subscribe(() => {
  window.localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

sagaMiddleware.run(rootSaga);

export default store;