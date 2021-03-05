import { useSelector } from 'react-redux'

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database'

const Stats = () => {
  const { brelan, carre, doublePaire, yam } = useSelector(state => state.stats)

  const path = 'yam/'

  const stats = {
    brelan: 0,
    yam: 0,
    carre: 0,
    doublePaire: 0,
    total: 0
  }

  const percentToString = (value, total) => {
    return Math.round((value / total) * 1000) / 10
  }

  return (
    <>
      <h1>Stats</h1>
      <FirebaseDatabaseMutation type='push' path={path}>
        {({ runMutation }) => {
          return (
            <div>
              <button
                data-testid='test-push'
                onClick={async () => {
                  await runMutation({ brelan, carre, doublePaire, yam })
                }}
                className='btn btn-primary'
              >
                Enregistrer stats dernière partie
              </button>
            </div>
          )
        }}
      </FirebaseDatabaseMutation>

      <div className='row'>
        <div className='col-md-6'>
          <h2>Dernière partie</h2>
          <ul>
            <li>Yam : {yam} (5 dés identiques)</li>

            <li>Carré : {carre} (quatre dés identiques)</li>

            <li>Brelan : {brelan} (trois dés identiques)</li>

            <li>Double paire : {doublePaire} (deux dés X 2 identiques)</li>
          </ul>
        </div>

        <div className='col-md-6'>
          <h2>Statistiques enregistrés</h2>
          <FirebaseDatabaseNode path={path}>
            {data => {
              const { value } = data

              if (value === null || typeof value === 'undefined') {
                return null
              }

              Object.values(value).forEach((value) => {
                stats.brelan += value.brelan
                stats.yam += value.yam
                stats.carre += value.carre
                stats.doublePaire += value.doublePaire
                stats.total += value.brelan + value.yam + value.carre + value.doublePaire
              })

              return (
                <ul>
                  <li>Yam : {stats.yam} ({percentToString(stats.yam, stats.total)}%)</li>
                  <li>Carré : {stats.carre} ({percentToString(stats.carre, stats.total)}%)</li>
                  <li>Brelan : {stats.brelan} ({percentToString(stats.brelan, stats.total)}%)</li>
                  <li>Double paire : {stats.doublePaire} ({percentToString(stats.doublePaire, stats.total)}%)</li>
                  <li>Total : {stats.total}</li>
                </ul>
              )
            }}
          </FirebaseDatabaseNode>
        </div>
      </div>

      <h2>Jeux enregistrés</h2>
      <div className='row'>
        <FirebaseDatabaseNode path={path}>
          {data => data.value
            ? Object.values(data.value).map((value, index) => (
              <p className='col-md-2' key={index}>
                Yam : {value.yam}<br />
                Carré : {value.carre}<br />
                Brelan : {value.brelan}<br />
                Double paire : {value.doublePaire}<br />
              </p>
            ))
            : ''}
        </FirebaseDatabaseNode>
      </div>
    </>
  )
}

export default Stats
