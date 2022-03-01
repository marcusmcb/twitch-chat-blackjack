let deck = [
  { name: 'A', highValue: 11, lowValue: 1, count: 4 },
  { name: '2', value: 2, count: 4 },
  { name: '3', value: 3, count: 4 },
  { name: '4', value: 4, count: 4 },
  { name: '5', value: 5, count: 4 },
  { name: '6', value: 6, count: 4 },
  { name: '7', value: 7, count: 4 },
  { name: '8', value: 8, count: 4 },
  { name: '9', value: 9, count: 4 },
  { name: '10', value: 10, count: 4 },
  { name: 'J', value: 10, count: 4 },
  { name: 'Q', value: 10, count: 4 },
  { name: 'K', value: 10, count: 4 },
]

// arrays to hold hand data
let playerCards = []
let dealerCards = []
// arrays to hold hand values
let playerHandValues = []
let dealerHandValues = []
// values to hold card strings to be returned in response
let playerCardString = ''
let dealerCardString = ''

const dealCard = () => {
  const randomIndex = Math.floor(Math.random() * deck.length)
  const card = deck[randomIndex]
  card.count--
  console.log('CARD: ', card)
  return card
}

const setCardValue = (cardValue) => {
  // need to check player/dealer hand value relative to where each "stands" before setting ace value
  if (cardValue.hasOwnProperty('highValue')) {
    return 11
  } else {
    return cardValue.value
  }
}

const playGame = () => {
  let playerCard1 = ''
  let playerCard2 = ''
  let dealerCard1 = ''
  let dealerCard2 = ''
  // "deal" the cards
  playerCard1 = dealCard()
  playerCards.push(playerCard1.name)
  let playerCard1Value = setCardValue(playerCard1)
  playerHandValues.push(playerCard1Value)

  dealerCard1 = deck[0]
  dealerCards.push(dealerCard1.name)
  let dealerCard1Value = setCardValue(dealerCard1)
  dealerHandValues.push(dealerCard1Value)

  playerCard2 = dealCard()
  playerCards.push(playerCard2.name)
  let playerCard2Value = setCardValue(playerCard2)
  playerHandValues.push(playerCard2Value)

  dealerCard2 = deck[0]
  dealerCards.push(dealerCard2.name)
  let dealerCard2Value = setCardValue(dealerCard2)
  dealerHandValues.push(dealerCard2Value)

  // values to hold hand values as they're accumulated
  let playerHandValue = playerHandValues.reduce((a, b) => a + b, 0)
  let dealerHandValue = dealerHandValues.reduce((a, b) => a + b, 0)

  console.log('**************************************************')

  console.log(
    `Player has ${playerCard1.name}-${playerCard2.name}, total: ${playerHandValue}.`
  )
  console.log(
    `Dealer has ${dealerCard1.name}-${dealerCard2.name}, total: ${dealerHandValue}.`
  )

  // check if dealer's upcard is an ace
  if (dealerCard2.name === 'A') {
    // check if dealer has blackjack
    if (dealerHandValues[0] + dealerHandValues[1] === 21) {
      // check if player also has blackjack for a draw
      if (playerHandValues[0] + playerHandValues[1] === 21) {
        console.log(
          `MCB_ChatBot's upcard shows ${dealerCard2.name} & flips over a ${dealerCard1.name} for ${dealerHandValue} (Blackjack!). Player has ${playerCard1.name}-${playerCard2.name} for ${playerHandValue} points (also Blackjack!!). IT'S A DRAW!`
        )
      } else {
        console.log(
          `MCB_ChatBot's upcard shows ${dealerCard2.name} & flips over a ${dealerCard1.name} for ${dealerHandValue} points (BLACKJACK!). Player has ${playerCard1.name}-${playerCard2.name} for ${playerHandValue} points. MCB_ChatBot wins!`
        )
      }
    }
    if (dealerCard1.name === 'A') {      
      //
      dealerHandValue = [12]
      console.log('DEALER HAND VALUE: ', dealerHandValue)
      // set as helper method (one for player, one for dealer)
      while (playerHandValue <= 17) {
        let tempCard = dealCard()
        playerCards.push(tempCard.name)
        let nextCard = setCardValue(tempCard)
        playerHandValues.push(nextCard)
        playerHandValue = playerHandValue + nextCard
        console.log('PHV: ', playerHandValue)
      }
      if (playerHandValue > 21) {
        console.log('Player Cards: ', playerCards)
        console.log('Dealer Cards: ', dealerCards)
        playerCardString = playerCards.join('-')
        console.log('PLAYER CARD STRING: ', playerCardString)
        console.log(
          `MCB_ChatBot's upcard shows ${dealerCard2.name} but doesn't not have Blackjack. Player has ${playerCard1.name}-${playerCard2.name} & draws ${playerCardString} for ${playerHandValue}.  Player BUSTS! Dealer flips over an ${dealerCard1.name} for ${dealerHandValue} points. `
        )
      } else {
        console.log('Player Cards: ', playerCards)
        console.log('Dealer Cards: ', dealerCards)
      }
    }
  }
}

playGame()

// app is not clearing playerCard1/2 & dealerCard 1/2 values on return
// return in logic check is showing original drawn card values from previous call

// dealer stands on soft 17
//
// dealer upcard is A:
// * check if dealer has blackjack (if true, compare w/player for possible push)
// * if false, player hits until 18+
//
// dealer upcard is 7-K:
// * player stands 17+
// * player hits on 16-
//
// dealer upcard is 2-6
// * player stands 12+
// * player doubles on 11 (single card dealt)
// * player hits 10-
//
// player is dealt A-A
// * player splits (single card dealt each)
//
// player is dealt 8-8
// * player hits relative to dealer's upcard (see above) for each hand
//
// maintain proper count as cards as dealt beyond the dealer start
