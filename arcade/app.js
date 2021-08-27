// 0 grabbing the nodes that are interactive

// TEXT FOR PLAYER STATUS
let playerTurn = document.getElementById("players-turn");   // grab the player status text
let playerSymbol = document.getElementById("current-symbol");   // grab the player symbol
let youWonMessage = document.getElementById("win-lose-message");  // grab message that declared winner or loser

// EACH CELL WHICH WILL UPDATE TO X or O AND RESPOND TO CLICK
let cell1= document.getElementById("1");  
cell1.addEventListener("click", placeLetter);
let cell2= document.getElementById("2");
cell2.addEventListener("click", placeLetter);
let cell3= document.getElementById("3"); 
cell3.addEventListener("click", placeLetter);
let cell4= document.getElementById("4"); 
cell4.addEventListener("click", placeLetter);
let cell5= document.getElementById("5"); 
cell5.addEventListener("click", placeLetter);
let cell6= document.getElementById("6"); 
cell6.addEventListener("click", placeLetter);
let cell7= document.getElementById("7"); 
cell7.addEventListener("click", placeLetter);
let cell8= document.getElementById("8"); 
cell8.addEventListener("click", placeLetter);
let cell9= document.getElementById("9"); 


// PLAYER NAMES INPUT VALUES
let player1= document.getElementById("player-input1");      // grab users name
let player2= document.getElementById("player-input2");     // grab users name

// BUTTONS  
let inputButton = document.getElementById("input-name-button");       // grab the input button
let resetButton = document.getElementById("reset-button");   // grab the reset button

// GAME OBJECT
const gameData = {    
  playerInfo: {
    player1: null,
    player2: null,
    playerSymbol: ["X", "O"],
    currentPlayer: null
  },

  board: [null, null, null, null, null, null, null, null, null],
}

// GAME STORYLINE ------- GAME EXPERIENCE

// PART 1 ENTER PLAYER NAMES AND CLICK ENTER
inputButton.addEventListener("click", function(){     // function inputs names and stores them in object
  console.log("consoletest"+ player1.value + "," + player2.value);   // test the input button
  gameData.playerInfo.player1= player1.value;    // store player1 name value in object
  gameData.playerInfo.player2= player2.value;    // store player2 name value in object

})

// PART 2 START NEW GAME BUTTON GENERATES A RANDOM NUM 0 or 1 AND RANDOM PLAYER STARTS WITH RANDOM LETTER
resetButton.addEventListener("click", function(){    // generate a new game
  let randomNum = Math.round(Math.random());     // generate random num 0 or 1
  console.log("whats the random num? " +randomNum);
  if(randomNum === 0){
    gameData.playerInfo.currentPlayer=1;      // current player gets player1
    //gameData.playerInfo.playerSymbol=gameData.playerInfo.playerSymbol[0];  // current player gets X
    playerTurn.innerText = gameData.playerInfo.player1 + "'s turn!";  // text player1 your turn
    playerSymbol.innerText= "Your symbol is X";  // text symbol x
                    // add an O where they click
  }
  else{
    gameData.playerInfo.currentPlayer=2;
    playerTurn.innerText = gameData.playerInfo.player2 + "'s turn!";
    playerSymbol.innerText= "Your symbol is O";
  }
})


// PART 3 WHEN YOU CLICK BOX IT STARTS PUTTING A LETTER IN!!!!

function placeLetter (event){
  console.log(event);
}

// PART 4 SWITCH TO THE OTHER PLAYER AND THEY PUT IN THEIR LETTER






// resetButton.addEventListener("click", function(){    // generate a new games
//   let randomNum = Math.round(Math.random());     // generate random num 0 or 1
//   if(randomNum === 0){
//     gameData.playerInfo.currentPlayer=;      // store player 1 into current player
//                     // text player1 your turn
//                     // add an x where they click
//   }
 
// })




// function to check that everything is running ok
  // gameState.gameBoard.addEventListener("click", function(event){
  //   console.log(event.target);   // target is the element on the website that is clicked
  //   console.log("helo");
  // })