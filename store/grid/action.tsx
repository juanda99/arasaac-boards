export const TOGGLE_GRID = 'REMOVE_GRID'
export const GRID_SIZE = 'GRID_SIZE'

export const removeGrid = () => (dispatch) => {
  return dispatch({ type: TOGGLE_GRID })
}

export const setGridSize = (size: number) => (dispatch) => {
  return dispatch({ type: TOGGLE_GRID, size })
}
