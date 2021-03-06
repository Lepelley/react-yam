import { useSelector } from 'react-redux'

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database'

const Stats = () => {
  const { brelan, carre, doublePaire, yam, noCombinaisons } = useSelector(state => state.stats)

  const path = 'yam/'

  const percentToString = (value, total) => {
    return Math.round((value / total) * 10000) / 100
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
                  await runMutation({ brelan, carre, doublePaire, yam, noCombinaisons })
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

            <li>Pas de combinaisons : {noCombinaisons}</li>
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

              const stats = {
                brelan: 0,
                yam: 0,
                carre: 0,
                doublePaire: 0,
                noCombinaisons: 0,
                total: 0
              }

              Object.values(value).forEach((value) => {
                stats.brelan += value.brelan
                stats.yam += value.yam
                stats.carre += value.carre
                stats.doublePaire += value.doublePaire
                stats.noCombinaisons += value.noCombinaisons
                stats.total += value.brelan + value.yam + value.carre + value.doublePaire + value.noCombinaisons
              })

              return (
                <ul>
                  <li>Yam : {stats.yam} ({percentToString(stats.yam, stats.total)}%)</li>
                  <li>Carré : {stats.carre} ({percentToString(stats.carre, stats.total)}%)</li>
                  <li>Brelan : {stats.brelan} ({percentToString(stats.brelan, stats.total)}%)</li>
                  <li>Double paire : {stats.doublePaire} ({percentToString(stats.doublePaire, stats.total)}%)</li>
                  <li>Pas de combinaisons : {stats.noCombinaisons} ({percentToString(stats.noCombinaisons, stats.total)}%)</li>
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
              <ul className='col-md-3' key={index}>
                <li>Yam : {value.yam}</li>
                <li>Carré : {value.carre}</li>
                <li>Brelan : {value.brelan}</li>
                <li>Double paire : {value.doublePaire}</li>
                <li>Pas de combi. : {value.noCombinaisons}</li>
              </ul>
              ))
            : ''}
        </FirebaseDatabaseNode>
      </div>
    </>
  )
}

export default Stats
