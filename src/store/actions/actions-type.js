import { ROLL_DICES, SET_NUMBER, ADD_STATS } from '../constants/actions'

export const rollDices = () => {
  return { type: ROLL_DICES }
}

export const setNumber = (payload) => {
  return { type: SET_NUMBER, payload }
}

export const addStats = (payload) => {
  return { type: ADD_STATS, payload }
}
