import { useDispatch, useSelector } from 'react-redux'
import { rollDices, setNumber } from '../store/actions/actions-type'

const Game = () => {
  const dispatch = useDispatch()

  const { number } = useSelector(state => state.yam)

  const handleChange = (event) => {
    const { value } = event.target

    if (parseInt(value, 10).toString() === value && value > 0) {
      dispatch(setNumber({ number: value }))
    }
  }

  const handleRun = () => {
    dispatch(rollDices())
  }

  return (
    <>
      <h1>Yam !</h1>

      <p className='form-group'>
        <label htmlFor='number'>Nombre de lancer(s)</label>
        <input type='number' id='number' className='form-control' onChange={handleChange} value={number} />
      </p>

      <p className='form-group'>
        <button onClick={handleRun} className='btn btn-primary'>Lancer</button>
      </p>
    </>
  )
}

export default Game
