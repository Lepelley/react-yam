import { ROLL_DICES, SET_NUMBER } from '../constants/actions'
import { rollDices } from '../utils/yam'

const stateInit = {
  number: 1,
  dices: []
}

const reducer = (state = stateInit, action = {}) => {
  const dices = []

  switch (action.type) {
    case ROLL_DICES:
      for (let index = 0; index < state.number; index++) {
        dices.push(rollDices(5))
      }

      return {
        ...state,
        dices
      }
    case SET_NUMBER:
      return {
        ...state,
        number: action.payload.number
      }
    default:
      return state
  }
}

export default reducer
