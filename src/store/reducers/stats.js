import { ADD_STATS } from '../constants/actions'

import { findYamCombinaisons } from '../utils/yam'
import { useSelector } from 'react-redux'

const stateInit = {
  brelan: 0,
  carre: 0,
  doublePaire: 0,
  yam: 0
}

const reducer = (state = stateInit, action = {}) => {
  switch (action.type) {
    case ADD_STATS:
      return {
        stateInit,
        ...findYamCombinaisons(action.payload.dices)
      }
    default:
      return state
  }
}

export default reducer
