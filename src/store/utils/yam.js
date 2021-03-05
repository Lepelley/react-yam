const rollDice = () => {
  return 1 + Math.random() * 6 | 0
}

const isYam = (dices) => {
  return filterEqualsTo(dices, 5)
}

const isBrelan = (dices) => {
  return filterEqualsTo(dices, 3)
}

const isSquare = (dices) => {
  return filterEqualsTo(dices, 4)
}

const filterEqualsTo = (dices, value) => {
  return dices.filter(number => value === number).length === 1
}

const isDoublePaire = (dices) => {
  return dices.filter(value => value === 2).length === 2
}

const countElements = (dices, number) => {
  return dices.filter(value => value === number).length
}

export const rollDices = (numberOfDices) => {
  return [...Array(numberOfDices)].map(e => rollDice())
}

export const findYamCombinaisons = (dices) => {
  let brelan = 0
  let carre = 0
  let doublePaire = 0
  let yam = 0
  let noCombinaisons = 0

  dices.forEach(turn => {
    const numbers = {
      numberOf1: countElements(turn, 1),
      numberOf2: countElements(turn, 2),
      numberOf3: countElements(turn, 3),
      numberOf4: countElements(turn, 4),
      numberOf5: countElements(turn, 5),
      numberOf6: countElements(turn, 6)
    }

    const numbersArray = Object.values(numbers)

    yam += isYam(numbersArray) ? 1 : 0
    carre += isSquare(numbersArray) ? 1 : 0
    brelan += isBrelan(numbersArray) ? 1 : 0
    doublePaire += isDoublePaire(numbersArray) ? 1 : 0
    noCombinaisons += (
      isYam(numbersArray) ||
      isSquare(numbersArray) ||
      isBrelan(numbersArray) ||
      isDoublePaire(numbersArray)
    ) === false
      ? 1
      : 0
  })

  return { brelan, carre, doublePaire, yam, noCombinaisons }
}
