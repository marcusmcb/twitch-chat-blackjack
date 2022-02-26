let deck = [
  { name: "A", highValue: 11, lowValue: 1, count: 4 },
  { name: "2", value: 2, count: 4 },
  { name: "3", value: 3, count: 4 },
  { name: "4", value: 4, count: 4 },
  { name: "5", value: 5, count: 4 },
  { name: "6", value: 6, count: 4 },
  { name: "7", value: 7, count: 4 },
  { name: "8", value: 8, count: 4 },
  { name: "9", value: 9, count: 4 },
  { name: "10", value: 10, count: 4 },
  { name: "J", value: 10, count: 4 },
  { name: "Q", value: 10, count: 4 },
  { name: "K", value: 10, count: 4 }
]

let playerHandValue = []
let dealerHandValue = []

const dealCard = () => {
  const randomIndex = Math.floor(Math.random() * deck.length)
  const card = deck[randomIndex]   
  card.count--  
  console.log("CARD: ", card)
  return card
}

const setCardValue = (cardValue) => {
  if (cardValue.hasOwnProperty('highValue')) {
    return 11
  } else {
    return cardValue.value
  }
}

const playGame = () => { 
  
  // "deal" the cards
  // let playerCard1 = dealCard()
  let playerCard1 = deck[0]
  let playerCard1Value = setCardValue(playerCard1)
  playerHandValue.push(playerCard1Value)  

  let dealerCard1 = deck[10]
  // let dealerCard1 = dealCard()
  let dealerCard1Value = setCardValue(dealerCard1)
  dealerHandValue.push(dealerCard1Value)

  // let playerCard2 = dealCard()
  let playerCard2 = deck[11]
  let playerCard2Value = setCardValue(playerCard2)
  playerHandValue.push(playerCard2Value) 

  let dealerCard2 = deck[0]
  // let dealerCard2 = dealCard()
  let dealerCard2Value = setCardValue(dealerCard2)
  dealerHandValue.push(dealerCard2Value)
  
  console.log(`Player has ${playerCard1.name}-${playerCard2.name}.`)
  console.log(`Dealer has ${dealerCard1.name}-${dealerCard2.name}.`)  
  console.log("PLAYER HAND VALUE: ", playerHandValue)
  console.log("DEALER HAND VALUE: ", dealerHandValue)

  if (dealerCard2.name === 'A') {    
    if (dealerCard1.name === 'A') {
      //
    } else if (dealerHandValue[0] + dealerHandValue[1] === 21) {
      console.log("Dealer has 21!") 
      if (playerHandValue[0] + playerHandValue[1] === 21)
      console.log("Player has 21! DRAW!")
    }
  }
}

playGame()

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