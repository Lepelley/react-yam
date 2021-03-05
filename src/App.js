import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

import Game from './components/Game'
import Stats from './components/Stats'

const App = () => {
  return (
    <BrowserRouter>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link to='/' className='navbar-brand'>Yam !</Link>

        <button className='navbar-toggler' type='button'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Link to='/game' className='nav-link'>Game</Link>
            <Link to='/stats' className='nav-link'>Stats</Link>
          </div>
        </div>
      </nav>

      <main className='container mt-2'>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/game' />
          </Route>
          <Route path='/game'>
            <Game />
          </Route>
          <Route path='/stats'>
            <Stats />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
