// PART 1 GRAB ALL INTERACTIVE NODES SAVE AS VARIABLES 
// -------------------------------------------------------------
// NODES FOR PLAYER STATUS
let playerTurn = document.getElementById("players-turn");   // player's turn
let playerSymbol = document.getElementById("current-symbol");   // player symbol X or O
let youWonMessage = document.getElementById("win-lose-message");  // won message

// NODES FOR CELLS CLICKING PLACES X or O
let cell0= document.getElementById("0");  
let cell1= document.getElementById("1");
let cell2= document.getElementById("2"); 
let cell3= document.getElementById("3"); 
let cell4= document.getElementById("4"); 
let cell5= document.getElementById("5"); 
let cell6= document.getElementById("6"); 
let cell7= document.getElementById("7"); 
let cell8= document.getElementById("8"); 

// NODES FOR INPUT BOXES TAKING PLAYER NAMES
let player1= document.getElementById("player-input1"); 
let player2= document.getElementById("player-input2"); 

// NODES FOR BUTTONS  
let inputButton = document.getElementById("input-name-button"); // grab the input button
let resetButton = document.getElementById("reset-button");   // grab the reset button
// possibly add button that allows user to play CPU

// OBJECT HOLDS GAMESTATE AND BOARD IN ARRAY
const gameData = {  // object stores player info and board
  
  playerInfo: {
    player1: null,     // access player name
    player2: null,     // access player name
    playerSymbol: ["X", "O"],   // access symbol w innertext
    currentPlayer: null  // store currentplayer 1 or 2 to easy switch
  },

  board: [null, null, null, null, null, null, null, null, null],   // store user answer in array
}

// WINNING CONDITIONS IF THEY ARE MET THAT PLAYER WINS
let winningConditions = [   // compare user results to winning conditions
  "XXX",
  "OOO"
]

// GAME STORYLINE -- GAME EXPERIENCE -- FUNCTIONS START HERE =]
// PART 2 USER ENTERS NAMES AND CLICKS SUBMIT
// ---------------------------------------------------------------------------------------------
inputButton.addEventListener("click", function(){     // function stores player names in object
  console.log("console test "+ player1.value + "," + player2.value);   // test input button
  gameData.playerInfo.player1= player1.value;    
  gameData.playerInfo.player2= player2.value;    
})

// PART 3 RESET BUTTON GENERATES RANDOM NUM, SETS EVENTLISTENERS, AND RANDOM PLAYER GETS ASSIGNED X OR O
//----------------------------------------------------------------------------------------------
resetButton.addEventListener("click", function(){    // start a new game
  let randomNum = Math.round(Math.random())+1;     // generate random num 0 or 1 to assign player

  console.log("console rand num " + randomNum);
  gameData.board = [null, null, null, null, null, null, null, null, null];
  youWonMessage.innerText = "";  // write winning message
  
  cell0.addEventListener("click", placeLetter);  // when click run fxn placeLetter
  cell0.innerText="";
  cell1.addEventListener("click", placeLetter);
  cell1.innerText=""; 
  cell2.addEventListener("click", placeLetter); 
  cell2.innerText="";
  cell3.addEventListener("click", placeLetter); 
  cell3.innerText="";
  cell4.addEventListener("click", placeLetter); 
  cell4.innerText="";
  cell5.addEventListener("click", placeLetter); 
  cell5.innerText="";
  cell6.addEventListener("click", placeLetter); 
  cell6.innerText="";
  cell7.addEventListener("click", placeLetter); 
  cell7.innerText="";
  cell8.addEventListener("click", placeLetter); 
  cell8.innerText="";

  if(randomNum === 1){
    gameData.playerInfo.currentPlayer=1;      // assign current player to 1
    playerTurn.innerText = gameData.playerInfo.player1 + "'s turn!";  // update innerText to name's turn
    playerSymbol.innerText= "Your symbol is X";  // text symbol X
                    // add an X where they click with fxn placeLetter
  }
  else{
    gameData.playerInfo.currentPlayer=2;     // otherwise if random num is 1 then make the current player 2
    playerTurn.innerText = gameData.playerInfo.player2 + "'s turn!";    // typer player name
    playerSymbol.innerText= "Your symbol is O";      // show the symbol O
  }

  // youWonMessage.innerText="___";
  // playerTurn.innerText = "Player's turn ";
  //playerSymbol.innerText = "Your symbol ";

})

// PART 4 PLACING LETTER, OTHERWISE SWITCH TO OTHER PLAYER

function placeLetter (event){   // click on box
  console.log("console game data" + gameData);
  // look up current player to figure out whos turn
  // if current player is 2 the node of the clicked cell gets an O inner text
    let currentPlayer = gameData.playerInfo.currentPlayer;   // store number into current player
    if (currentPlayer === 2){                       // if player 2 
      playerTurn.innerText = gameData.playerInfo.player1 + "'s turn (player 1)";
      playerSymbol.innerText = "Your symbol is X";
      if(event.target.innerText ==="O" || event.target.innerText=== "X"){  
      return;  // if there is something there, exit the function dont change it
      }
      else{
      event.target.innerText = "O"; // event target is DOM element where click event took place
      gameData.playerInfo.currentPlayer = 1;   // switch to other player
      }
    }  // end of first if statement if current player is 1 add letter X

    else{     // otherwise if the current player is 2 add O
      playerTurn.innerText = gameData.playerInfo.player2 + "'s turn (player 2)";
      playerSymbol.innerText = "Your symbol is O";
      if(event.target.innerText ==="O" || event.target.innerText=== "X"){  
        return;
        }
        else{
        event.target.innerText= "X";     // place X
        gameData.playerInfo.currentPlayer = 2;    // switch to player 2
        }
    }
    updateBoardData(event);

    checkArray(gameData.board);
}

// PART 5 WHEN YOU CLICK, SAVE LETTER (X or O) INTO BLANK ARRAY
// ---------------------------------------------------------------------------------------------

// function to determine where user has clicked

function updateBoardData(event){    // event holds cell data that the user clicks on
  console.log("console of the event" + event);  // cell data
  let clickedCell = event.target;    // info about the element
  let clickedCellNum = clickedCell.id;  // string of id of the cell that was clicked on
  let clickedCellNumber = Number(clickedCellNum);    // convert string to number
    if (gameData.playerInfo.currentPlayer === 1){    // if the player is 1
      gameData.board[clickedCellNumber] = "O";    // add O to the board array
      }
    else if(gameData.playerInfo.currentPlayer === 2) gameData.board[clickedCellNumber] = "X";  // if p2 add X
  console.log("here is the array " +gameData.board);  
  let finalAnswerArray = gameData.board;
  return finalAnswerArray;
}

console.log("array from object is " + gameData.board);

// PART 6 CHECK IF A WINNING CONDITION IS MET
//----------------------------------------------------------------------------------------------

function checkArray(array){           // check who won
  let miniArrayRow1 = "";          // this function is called in the placeLetter function and checks each time a letter is entered
  for (let i = 0; i<3; i++){
    let letter = array[i];
    miniArrayRow1 += letter;
  }
  if (miniArrayRow1 == winningConditions[0]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayRow1 == winningConditions[1]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player2 + "!";
    playerTurn.innerText = "";
    stopGame();
  }

  console.log("the miniArrayRow1 is " + miniArrayRow1);
  console.log("the winningConditions are " + winningConditions[0]);

  let miniArrayRow2 = "";
  for (let i=3; i<6; i++){
    let letter = array[i];
    miniArrayRow2 += letter; 
  }
  if (miniArrayRow2 === winningConditions[0]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayRow2 === winningConditions[1]){
    youWonMessage.innerText = "You won " +gameData.playerInfo.player2 + "!";
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayRow3 = "";
  for (let i=6; i<9; i++){
    let letter = array[i];
    miniArrayRow3 += letter; 
  }
  if (miniArrayRow3 === winningConditions[0]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayRow3 === winningConditions[1]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player2 + "!";
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCol1 = "";
  for (let i=0; i<7; i+=3){
    let letter = array[i];
    miniArrayCol1 += letter; 
  }
  if (miniArrayCol1 === winningConditions[0]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCol1 === winningConditions[1]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player2 + "!";
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCol2 = "";
  for (let i=1; i<9; i+=3){
    let letter = array[i];
    miniArrayCol2 += letter; 
  }
  if (miniArrayCol2 === winningConditions[0]){
    youWonMessage.innerText = "You won " + gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCol2 === winningConditions[1]){
    youWonMessage.innerText = "You won " +gameData.playerInfo.player2 + "!";
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCol3 = "";
  for (let i=2; i<9; i+=3){
    let letter = array[i];
    miniArrayCol3 += letter; 
  }
  if (miniArrayCol3 === winningConditions[0]){
    youWonMessage.innerText = "You won " +gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCol3 === winningConditions[1]){
    youWonMessage.innerText = "You won " +gameData.playerInfo.player2 + "!";
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCross1 = "";
  for (let i=2; i<7; i+=2){
    let letter = array[i];
    miniArrayCross1 += letter; 
  }
  if (miniArrayCross1 === winningConditions[0]){
    youWonMessage.innerText = "You won " +gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCross1 === winningConditions[1]){
    youWonMessage.innerText = "You won " +gameData.playerInfo.player2 + "!";
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCross2 = "";
  for (let i=0; i<9; i+=4){
    let letter = array[i];
    miniArrayCross2 += letter; 
  }
  if (miniArrayCross2 === winningConditions[0]){
    youWonMessage.innerText = "You won "+ gameData.playerInfo.player1 + "!";
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCross2 === winningConditions[1]){
    youWonMessage.innerText = "You won " +gameData.playerInfo.player2 + "!";        // if any of these conditions are met then they won woo
    playerTurn.innerText = "";
    stopGame();
  }
}

// PART 7 WHEN PLAYER WINS DISABLE CLICKING AND REMOVE YOUR TURN MESSAGE
//------------------------------------------------------------------------------------------

function stopGame(){
  cell0.removeEventListener("click", placeLetter);
  cell1.removeEventListener("click", placeLetter); 
  cell2.removeEventListener("click", placeLetter); 
  cell3.removeEventListener("click", placeLetter); 
  cell4.removeEventListener("click", placeLetter); 
  cell5.removeEventListener("click", placeLetter); 
  cell6.removeEventListener("click", placeLetter); 
  cell7.removeEventListener("click", placeLetter); 
  cell8.removeEventListener("click", placeLetter);  
  playerSymbol.innerText = "";
}



// PART 8 PLAY WITH CPU
