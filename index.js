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
  return card
}

const dealPlayerCard = (playerHandValue) => {
  
}

const dealDealerCard = (dealerHandValue) => {

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

  // "deal" the cards
  let playerCard1 = dealCard()
  playerCards.push(playerCard1.name)
  let playerCard1Value = setCardValue(playerCard1)
  playerHandValues.push(playerCard1Value)

  let dealerCard1 = deck[0]
  dealerCards.push(dealerCard1.name)
  let dealerCard1Value = setCardValue(dealerCard1)
  dealerHandValues.push(dealerCard1Value)

  let playerCard2 = dealCard()
  playerCards.push(playerCard2.name)
  let playerCard2Value = setCardValue(playerCard2)
  playerHandValues.push(playerCard2Value)

  let dealerCard2 = deck[0]
  dealerCards.push(dealerCard2.name)
  let dealerCard2Value = setCardValue(dealerCard2)
  dealerHandValues.push(dealerCard2Value)

  // values to hold hand values as they're accumulated
  let playerHandValue = playerHandValues.reduce((a, b) => a + b, 0)
  let dealerHandValue = dealerHandValues.reduce((a, b) => a + b, 0)

  // logger to see the original cards dealt
  console.log('**************************************************')
  console.log(
    `Player has ${playerCard1.name}-${playerCard2.name}, total: ${playerHandValue}.`
  )
  console.log(
    `Dealer has ${dealerCard1.name}-${dealerCard2.name}, total: ${dealerHandValue}.`
  )
  console.log('--------------------------------------------------')

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
      // set dealerHandValue to 12 (first Ace = 11 + second Ace = 1)
      dealerHandValue = [12]                  
      
      do {        
        let tempCard = dealCard()
        playerCards.push(tempCard.name)
        let nextCard = 11
        console.log("NEXTCARD: ", nextCard)  
        if (nextCard === 11 && playerHandValue <= 10) {
          console.log("YUUUUUP")
          // check if playerHandValue = 10 and set A as 11 (player blackjack)
          // check if playerHandValue < 10 and set A as 11 (player stands on 18+)
          // check if playerHandValue > 11 and set A as 1 (player draws-to/stands on 18+)
        }     
        console.log('--------------------------------------------------')
        playerHandValues.push(nextCard)
        playerHandValue = playerHandValue + nextCard        
      } while (playerHandValue <= 17) 

      if (playerHandValue === 21) {
        console.log('Player Cards: ', playerCards)
        console.log('Player Hand Value: ', playerHandValue)
        console.log('--------------------------------------------------')
        console.log('Dealer Cards: ', dealerCards)
        console.log('Dealer Hand Value: ', dealerHandValue)
        console.log("BLACKJACK!")
        playerCardString = playerCards.join('-')
        console.log('**************************************************') 
        console.log(
          `MCB_ChatBot's upcard shows ${dealerCard2.name} but doesn't not have Blackjack. Player has ${playerCard1.name}-${playerCard2.name} & draws ${playerCardString.substring(4)} for ${playerHandValue}: Blackjack! Dealer flips over an ${dealerCard1.name} for ${dealerHandValue} points. `
        )
      }

      if (playerHandValue > 21) {
        console.log('Player Cards: ', playerCards)
        console.log('Player Hand Value: ', playerHandValue)
        console.log('--------------------------------------------------')
        console.log('Dealer Cards: ', dealerCards)
        console.log('Dealer Hand Value: ', dealerHandValue)
        playerCardString = playerCards.join('-')  
        console.log('**************************************************')      
        console.log(
          `MCB_ChatBot's upcard shows ${dealerCard2.name} but doesn't not have Blackjack. Player has ${playerCard1.name}-${playerCard2.name} & draws ${playerCardString.substring(4)} for ${playerHandValue}. Player BUSTS! Dealer flips over an ${dealerCard1.name} for ${dealerHandValue} points. `
        )
      } else if (playerHandValue < 21) {
        console.log('Player Cards: ', playerCards)
        console.log('Player Hand Value: ', playerHandValue)
        console.log('--------------------------------------------------')
        console.log('Dealer Cards: ', dealerCards)
        console.log('Dealer Hand Value: ', dealerHandValue)
        playerCardString = playerCards.join('-') 
        console.log('**************************************************')
        console.log("TRUE")
        // draw cards for dealer hand
      }
    }
  }
}

playGame()

// add seperate blackjack-stats command to show how many times player wins & dealer wins
// add global vars and increment as counts after "hand" is complete

// dealer stands on soft 17
//
// player hits to 18 on dealer A w/o blackjack
//
// player hits/stands according to "basic strategy" based on dealer upcard
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
