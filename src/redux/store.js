import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import initialState from './initialState';
import statusReducer from './statusRedux';
import tablesReducer from './tablesRedux';
import thunk from 'redux-thunk';

const subreducers = {
  tables: tablesReducer,
  status: statusReducer,
}

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
  );

export default store;