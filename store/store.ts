// store.ts

import {createStore, applyMiddleware, combineReducers, AnyAction, Middleware} from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk'
import count from './count/reducer'
import tick from './tick/reducer'



const bindMiddleware = (middleware:  [Middleware]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
  count,
  tick,
})

// create your reducer
const reducer :typeof combinedReducer = (state, action: AnyAction) => {
    switch (action.type) {  
        case HYDRATE:
          const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
          }
          // if (state.count) nextState.count = state.count // preserve count value on client side navigation
          return nextState
        default:
            return combinedReducer(state, action)
  }
};

// create a makeStore function
const makeStore: MakeStore<typeof combinedReducer> = (context: Context) => createStore(reducer, bindMiddleware([thunkMiddleware]));

// export an assembled wrapper
export const wrapper = createWrapper<typeof combinedReducer>(makeStore, {debug: true});
