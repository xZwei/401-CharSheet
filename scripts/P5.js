// Event listener for start game button - Initializes a new game
$('#start').on('click', function(){
    // Shows game area and creates a new deck
    $('#start').attr('hidden', true)
    $('#game').removeAttr('hidden')
    deck = newDeck()

    // Draw 2 cards each for player and dealer
    playerHand.push(getCardFromDeck())
    playerHand.push(getCardFromDeck())
    dealerHand.push(getCardFromDeck())
    dealerHand.push(getCardFromDeck())

    checkGameOver(playerHand, dealerHand)
    // Show player hand total
    $('#playerHandTotal').text(addHandValue(playerHand))

    // Check dealer cards for blackjack at start
})

// Event listener for hit button - Player draws a card
$('#hit').on('click', function(){
    playerHand.push(getCardFromDeck())
    $('#playerHandTotal').text(addHandValue(playerHand))
    console.log(`Player hits.`)
    console.log(`Player draw: ${translateCard(playerHand[playerHand.length-1])}`)
    console.log(`Player total: ${addHandValue(playerHand)}`)
    
    // display player's hand value
    // check for bust
    // do the same for the dealer
})

// Event listener for stay button - Player is done drawing, check for winner
$('#stay').on('click', function () {
    console.log("I'll stay!")
    console.log("Player stays. Result: .")

    // don't want to let the player keep playing after game is ended
    $('#hit').attr('disabled', true)
    $('#stay').attr('disabled', true)
    $('#split').attr('disabled', true)

    // show user the result
    $('#handresult1').removeAttr('hidden')
    $('#handresult2').removeAttr('hidden')

    // Decide winner based on who is closer to 21, but still under it
})

// Event listener for split button - Splits the player's hand (only available when player has two-of-a-kind)
$('#split').on('click', function () {
    console.log("Split!")
})

// Event listener for fnish button - For when player is done playing
$('#fin').on('click', function () {
    console.log("Fin!")
    $('#game').attr('hidden', true)
    $('#start').removeAttr('hidden')
})

// Event listener for next hand button - Will start a new hand, keeping the current state of the deck
$('#restart').on('click', function () {
    console.log("Next Hand!")
})

const min = 1
var deck = []
var playerHand = []
var dealerHand = []

// Constructor for cards
function Card(value, suit, inDeck) {
    // Properties
    this.value = value      // value of the card represented by 1-13
    this.suit = suit        // suit of the card represented by 1-4 (Clubs, Spades, Hearts, Diamonds)
    this.inDeck = inDeck    // true or false, whether or not the card is in the deck still

    // Basic gets and sets
    this.getValue = function() { return this.value }
    this.getSuit = function() { return this.suit }
    this.getInDeck = function() { return this.inDeck }
    
    this.setInDeck = function (val) { this.inDeck = val }
    this.setValue = function (val) { this.value = val }

    // This will return the value of the card in terms of BJ
    this.getCardWorth = function(){
        let val = this.value
        if(val > 9){        // Face card or 10, its "worth" is 10
            return 10
        }else{              // Its a normal card, its "worth" = its value
            return val
        }
    }

    // Return the suit of the card as a string
    this.getSuitAsString = function(){
        switch (this.suit) {
            case 0:
                return "clubs"
            case 1:
                return "spades"
            case 2:
                return  "hearts"
            case 3:
                return  "diamonds"
            default:
                console.log('Error getting card suit')
                break;
        }
    }
}

// Returns a fresh deck of 52 cards
function newDeck() {
    let cards = []
    for (let i = 0; i < 4; i++)          //loop goes through each suit
    {
        for (let j = 1; j < 14; j++)    //loop goes through each card
        {
            cards[cards.length] = new Card(j, i, true) //add a new card to the end of the array            
        }
    }
    return cards
}

// Returns a card object from the deck
function getCardFromDeck() {
    let index = getRandomNumber(min, deck.length)
    let count = 0
    let deckEmpty = false

    // Get values for card in deck
    block: {
        while (deck[index].getInDeck() === false) {
            index = getRandomNumber(min, deck.length)
            count++
            if (count === 52) {
                $('#hit').attr('disabled', true)
                deckEmpty = true
                break block
            }
        }
    }

    // Remove the card from the deck 
    deck[index].setInDeck(false)

    // If the deck is empty return null and do stuff
    if (deckEmpty) {
        console.log('Error: deck is empty')
        return null
    } else {
        return new Card(deck[index].getValue(), deck[index].getSuit(), false)
    }
}

function addHandValue(hand){
    let value = 0
    for(let i = 0; i < hand.length; i++){
        value += hand[i].getCardWorth()
    }
    return value
}

// Returns the card translated to what it would be IRL
function translateCard(card){
    let suit = card.getSuitAsString()
    let val = card.getValue()
    if(val === 1){
        return `ace of ${suit}`
    } else if (val === 11) {
        return `jack of ${suit}`
    } else if (val === 12) {
        return `queen of ${suit}`
    } else if (val === 13) {
        return `king of ${suit}`
    }else{
        return `${val} of ${suit}`
    }
}

function checkGameOver(player, dealer){
    let pval = addHandValue(hand)
    let dval = addHandValue(hand)

    // A player gets blackjack or busts
    if (pval === 21 || pval > 21 || dval === 21 || dval > 21){
        return true
    }
    // Game Continues
    else{
        return false
    }
}

// Returns a random number between the specified range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (+max - +min) + +min)
}