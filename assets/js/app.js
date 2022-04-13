/*
Random word is generated/picked and is displayed on the screen as dashes as the letters
User gets guesses equivelant to  the correct word legnth 
Each guess is displayed on the screen and the guess count is also displayed
Guesses dont go down if the correct letter is chosen 




User guesses a letter
computer checks to see if letter is in the word
If letter is in the word it will display on screen where the letter is in the word
If letter is not in the word the computer lets user know and they get a strike against them/guesses counter goes down

*/ 
// variable declaration 
// collection of words to be used in the game
var wordBank = ["reefshark","dolphin","tuna","starfish","blowfish","crab","shrimp"]
// current word being played
var gameWord = ""
// the game words legnth
var totalGuesses = 0
// the list of letters the user has guessed
var lettersGuessed = []
// word as dashes
var gameWordDashes = ""
// creating divs to display words on screen
var messageDiv = document.getElementById("message")
var wordDiv = document.getElementById("game-word")
var totalGuessesDiv = document.getElementById("total-guesses")
var userGuessesDiv = document.getElementById("user-guesses")




// function to generate random word from wordbank and the amount of guesses/dashes
function playGame() { 
    gameWord = wordBank[Math.floor(Math.random() * wordBank.length)];// randomly selecting number between 0 and the legnth of the array to click a random index from the word bank array
    totalGuesses = gameWord.length
    createDashes() 
    // anyitme a variable is updated it has to be redisplayed in html
    wordDiv.textContent = gameWordDashes
    totalGuessesDiv.textContent = totalGuesses
    userGuessesDiv.textContent = lettersGuessed.join("") // putting list in to a string 
}


// function to create dashes in place of each letter
// for loop to replace letters with dashes example dog _ _ _
function createDashes() {
    for (let i = 0; i < totalGuesses; i++) {
        gameWordDashes = gameWordDashes + "_"        
    }
}

// how the user is able to make their guess using doc on keyup
document.onkeyup = function (event){
    var userKey = event.key.toLowerCase(); // capturing the key the user used and normalizing it to lowercase 
    messageDiv.textContent = ""
    // if statment to see if there is guesses and dashes left in the word
    if (totalGuesses > 0 && gameWordDashes.search("_") !== -1) {
        
    
    // check if user guessed the letter already
    if (lettersGuessed.indexOf(userKey) !== -1) {
        messageDiv.textContent = "Already picked choose another key. " + userKey

    }else{
        // checking how many times the users key is found in the word and seeing if multple letters are in the word 
        // example would be good o is found twice
        var indices = [];
        for(var i=0; i<gameWord.length;i++) {
            if (gameWord[i] === userKey) indices.push(i);
        }
        // checking if users guess is actually in the word
        if  (indices.length > 0){
    
            /*
            

            */
        // running a for loop to run through the dashes in the letter and replacing the underscores with the letter guessed
            for (let j = 0; j < indices.length; j++) {
                var currentIndex = indices[j]
                gameWordDashes = gameWordDashes.split("")// split converts a string to an array
                gameWordDashes[currentIndex] = userKey
                gameWordDashes =  gameWordDashes.join("")// join converts an array to a string 
            }
            //adding the users guess to the list to stop from guessing again
            lettersGuessed.push(userKey)

            // redisplay all variables that have been updated in the html 
            wordDiv.textContent = gameWordDashes
            totalGuessesDiv.textContent = totalGuesses
            userGuessesDiv.textContent = lettersGuessed.join("")
           
            // checking if user has won the game
            if (gameWordDashes.search("_")=== -1) {
               
                gameOver(true)
           } 
        // checking if the user guessed the incorrect letter and the total guess coutn goes down 
        }else{
            totalGuesses-- 
            lettersGuessed.push(userKey)

            totalGuessesDiv.textContent = totalGuesses
            messageDiv.textContent =  userKey + " Wrong, choose another key. "  
        }
    }
}
// else statment checking for dashes to end the game if no dashes or guesses are left 
else {
    if (gameWordDashes.search("_") === -1) {
     gameOver(true)// game won
 }
    else {
        gameOver(false)// game lost 
    }
}
    // check if it is part of the word 
}
// creating a function that ends game and displays messages if user wins or user loses also asking to play again
function gameOver(score) {
   // score is either true or false depending if the game was won or lost 
    if (score) {
        messageDiv.textContent = "Win! Want to play again?"

    }
    // else statement for if the user loses and propmting to play again
    else{
        messageDiv.textContent = "Sorry, you lost the word was " + gameWord + ". Want to play again?"
    }
    document.getElementById("play-again").classList.remove("hide") // displaying a hideen button after the game loss or win
    document.getElementById("game").classList.add("hide")// hiding the game element after loss or win
}
// creating a button to reset game and allow user to play again
document.onclick = function (event) {
    event.preventDefault() // stops the page from refreshing 
    resetGame()
    playGame()
}
// creating a function to reset the game and all the variables
function resetGame() {
    gameWord = ""
    totalGuesses = 0
    lettersGuessed = []
    gameWordDashes = ""
    messageDiv.textContent = ""
    wordDiv.textContent = ""
    totalGuessesDiv.textContent = ""
    userGuessesDiv.textContent = ""
    document.getElementById("play-again").classList.add("hide")
    document.getElementById("game").classList.remove("hide")
}
// calling on play game after the page is refreshed or loaded 
playGame()

console.log(gameWord)
console.log(totalGuesses)
