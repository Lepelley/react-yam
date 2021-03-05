import { ROLL_DICES } from '../constants/actions'

import { addStats } from '../actions/actions-type'

const statsMiddleware = store => next => action => {
  const returnAction = next(action)

  const { dices } = store.getState().yam

  if (action.type === ROLL_DICES) {
    store.dispatch(addStats({
      dices
    }))
  }

  return returnAction
}

export default statsMiddleware
