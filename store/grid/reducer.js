import { tickActionTypes } from './action'

const initialState = {
  gridSize: 20,
  showGrid: true,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case tickActionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light,
      })
    default:
      return state
  }
}
