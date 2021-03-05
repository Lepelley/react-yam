import { applyMiddleware, createStore } from 'redux'

import rootReducer from './reducers'

import thunkMiddleware from 'redux-thunk'
import statsMiddleware from './middlewares/stats'

const configureStore = (preloadedState = {}) => {
  const middlewares = [thunkMiddleware, statsMiddleware]

  const middlewareEnhancer = applyMiddleware(...middlewares)

  return createStore(rootReducer, preloadedState, middlewareEnhancer)
}

export default configureStore
