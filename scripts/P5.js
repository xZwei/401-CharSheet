// Event listener for start game button - Initializes a new game
$('#start').on('click', function(){
    // Shows game area and creates a new deck
    $('#start').hide()
    $('#game').show()
    deck = newDeck()

    // Draw 2 cards each for player and dealer
    playerHand.push(getCardFromDeck())
    $('#playerHand').append(`${translateCard(playerHand[playerHand.length - 1])}, `)
    playerHand.push(getCardFromDeck())
    $('#playerHand').append(`${translateCard(playerHand[playerHand.length - 1])}, `)
    dealerHand.push(getCardFromDeck())
    $('#dealerHand').append(`${translateCard(dealerHand[dealerHand.length - 1])}, `)
    dealerHand.push(getCardFromDeck())
    $('#dealerHand').append(`${translateCard(dealerHand[dealerHand.length - 1])}, `)
    
    //split logic will go here
    //enable the button if playerHand[0].val === playerHand[1].val
    //will have to make playerHand2 and all elements on html page will need to be duplicated
    //and only revealed if player splits

    // Make sure no one has blackjack
    if(checkGameOver(playerHand, dealerHand)){
        $('#stay').click()
    }

    // Show hand totals
    $('#playerHandTotal').text(addHandValue(playerHand))
    $('#dealerHandTotal').text(addHandValue(dealerHand))

    // Check dealer cards for blackjack at start
})

// Event listener for hit button - Player draws a card, dealer follows dealer rules for drawing
$('#hit').on('click', function(){
    //update actions
    $('#actions').append(`<br/> Player draws.`)

    //draw player card
    playerHand.push(getCardFromDeck())

    //update player hand total
    $('#playerHandTotal').text(addHandValue(playerHand))

    //display players draw
    $('#playerHand').append(`${translateCard(playerHand[playerHand.length - 1])}, `)
    
    //dealer actions && show dealer's hand total
    dealerAction()
    $('#dealerHandTotal').text(addHandValue(dealerHand))

    //check for game over
    if(checkGameOver(playerHand, dealerHand)){
        $('#stay').click()
    }
})

// Event listener for stay button - Player is done drawing, check for winner
$('#stay').on('click', function () {
    // Do dealer actions (if applicable)
    while(addHandValue(dealerHand) < 17){
        dealerAction()
    }

    // Don't want to let the player keep playing after game is ended
    $('#hit').attr('disabled', true)
    $('#stay').attr('disabled', true)
    $('#split').attr('disabled', true)

    // Show dealer's hand and total

    $('#dealerHandTotal').text(addHandValue(dealerHand))

    // show user the result of who won
    $('#handresult1').show()

    //if(dealer won)
    alert(`${checkWhoWon(playerHand, dealerHand)} has won!`) // need to set this to either dealer or player depending on who won
    $('#actions').append(`<br/> <p style="color:red;">GAME OVER!</p>`)

    // Decide winner based on who is closer to 21, but still under it
})

// Event listener for split button - Splits the player's hand (only available when player has two-of-a-kind)
$('#split').on('click', function () {
    $('#actions').append("<br /> Player splits the hand.")
})

// Event listener for fnish button - For when player is done playing... simply reloads the page
$('#fin').on('click', function () {
    location.reload()
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
        }else if(val === 1){// Ace
            return 11
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
    if(checkForAce(hand) && value > 21){
        return value-10
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

// Checks each players hands for game over
function checkGameOver(player, dealer){
    let pval = addHandValue(player)
    let dval = addHandValue(dealer)

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

// Will return either "Player" or "Dealer" depending on who has higher total and who did or didn't bust, or "No one" if they tied
function checkWhoWon(player, dealer){
    let p = addHandValue(player)
    let d = addHandValue(dealer) 

    if(p > d && p < 22 || p < 22 && d > 21){
        //if player had higher than dealer and didn't bust
        //or if player didn't bust and dealer did
        return "Player"
    } else if (d > p && d < 22 || d < 22 && p > 21){
        //if dealer had higher than player and didn't bust
        //or if dealer didn't bust and player did
        return "Dealer"
    } else {
        return "No one"
    }    
}

// Dealer Action will draw if dealer is below 17 and stay if 17 or more
function dealerAction(){
    let p = addHandValue(playerHand)
    let d = addHandValue(dealerHand)

    if (d > 16) {
        //dealer stays
        $('#actions').append("<br /> Dealer stays.")
    } else if (d <= p && p < 22){
        //dealer hits
        $('#actions').append("<br /> Dealer draws.")
        dealerHand.push(getCardFromDeck())
        $('#dealerHand').append(`${translateCard(dealerHand[dealerHand.length - 1])}, `)
    }
    else {
        //dealer hits
        $('#actions').append("<br /> Dealer draws.")
        dealerHand.push(getCardFromDeck())
        $('#dealerHand').append(`${translateCard(dealerHand[dealerHand.length - 1])}, `)
    }
}

function checkForAce(hand){
    hand.forEach(function(item){
        if(item.getValue() === 1){
            return true
        }
    });
    return false
}

function split(){
    return null
}