// PART 0 GRAB ALL INTERACTIVE NODES ---------- VARIABLES 
// ------------------------------------------------------------------------
// NODES DESCRIBING PLAYER STATUS
let playerTurn = document.getElementById("players-turn");   // grab player status
let playerSymbol = document.getElementById("current-symbol");   // grab player symbol X or O
let youWonMessage = document.getElementById("win-lose-message");  // grab you-won message

// NODES FOR CELLS WHICH RESPOND TO CLICK AND PLACE AN X or O
let cell0= document.getElementById("0");  
   
let cell1= document.getElementById("1");

let cell2= document.getElementById("2"); 

let cell3= document.getElementById("3"); 

let cell4= document.getElementById("4"); 

let cell5= document.getElementById("5"); 

let cell6= document.getElementById("6"); 

let cell7= document.getElementById("7"); 

let cell8= document.getElementById("8"); 


// NODES FOR INPUT BOXES WHICH TAKE PLAYER NAMES
let player1= document.getElementById("player-input1");      // grab users name from input
let player2= document.getElementById("player-input2");     // grab users name from input

// NODES FOR BUTTONS  
let inputButton = document.getElementById("input-name-button");       // grab the input button
let resetButton = document.getElementById("reset-button");   // grab the reset button

// GAME OBJECT WITH USER BOARD IN ARRAY
const gameData = {           // this object array stores player info and a board with array
  playerInfo: {
    player1: null,     // access player name
    player2: null,     // access player name
    playerSymbol: ["X", "O"],   // access symbol w innertext
    currentPlayer: null     // store currentplayer 1 or 2 to easy switch from 1 to 2
  },

  board: [null, null, null, null, null, null, null, null, null],   // store the user answer in array
}

// WINNING CONDITIONS IF ANY ARE MET THAT PLAYER WINS
let winningConditions = [     // compare to winning conditions
  "XXX",
  "OOO"
]

// GAME STORYLINE ------- GAME EXPERIENCE ------------- FUNCTIONS START HERE
// -------------------------------------------------------------------------
// PART 1 ENTER PLAYER NAMES AND CLICK ENTER
inputButton.addEventListener("click", function(){     // function inputs names and stores them in object
  console.log("consoletest"+ player1.value + "," + player2.value);   // test the input button
  gameData.playerInfo.player1= player1.value;    // store player1 name value in object
  gameData.playerInfo.player2= player2.value;    // store player2 name value in object

})

// PART 2 START-NEW-GAME BUTTON GENERATES A RANDOM NUM, SETS THE EVENTLISTENERS, THEN RANDOM PLAYER GETS ASSIGNED X OR O
resetButton.addEventListener("click", function(){    // generate new game
  let randomNum = Math.round(Math.random());     // generate random num 0 or 1
  gameData.board = [null, null, null, null, null, null, null, null, null];
  youWonMessage.innerText = "";
  
  cell0.addEventListener("click", placeLetter); 
  cell0.innerText="__";
  cell1.addEventListener("click", placeLetter);
  cell1.innerText="__"; 
  cell2.addEventListener("click", placeLetter); 
  cell2.innerText="__";
  cell3.addEventListener("click", placeLetter); 
  cell3.innerText="__";
  cell4.addEventListener("click", placeLetter); 
  cell4.innerText="__";
  cell5.addEventListener("click", placeLetter); 
  cell5.innerText="__";
  cell6.addEventListener("click", placeLetter); 
  cell6.innerText="__";
  cell7.addEventListener("click", placeLetter); 
  cell7.innerText="__";
  cell8.addEventListener("click", placeLetter); 
  cell8.innerText="__";

  if(randomNum === 0){
    gameData.playerInfo.currentPlayer=1;      // assign current player to 1
    playerTurn.innerText = gameData.playerInfo.player1 + "'s turn!";  // update innerText to name s turn
    playerSymbol.innerText= "Your symbol is X";  // text symbol x
                    // add an X where they click
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

// PART 3 WHEN YOU CLICK BOX IT PLACING LETTER! OTHERWISE SWITCH TO OTHER PLAYER

function placeLetter (event){   // click on box
  console.log(gameData);
  // look up curernt player to figure out whos turn
  // if current player is 2 the node of the clicked cell gets an O inner text
    let currentPlayer = gameData.playerInfo.currentPlayer;   // store number into current player
    if (currentPlayer === 2){                       // if player 2 aka O
      playerTurn.innerText = gameData.playerInfo.player1 + "'s turn!";
      playerSymbol.innerText = "Your symbol is X";
      if(event.target.innerText ==="O" || event.target.innerText=== "X"){   // event target is element clicked on
      return;     // if there is something placed, exit the function dont change it
      }
      else{
      event.target.innerText = "O";   // event target is the exact html element where the event "click" took place
      gameData.playerInfo.currentPlayer = 1;   // switch to other player
      }
    }  // end of first if statement if current player is 2 add O

    else{     // otherwise if the current player is 1 add X
      playerTurn.innerText = gameData.playerInfo.player2 + "'s turn!";
      playerSymbol.innerText = "Your symbol is O";
      if(event.target.innerText ==="O" || event.target.innerText=== "X"){  
        return;
        }
        else{
        event.target.innerText= "X";     // place X on target 
        gameData.playerInfo.currentPlayer = 2;    // switch to player 2
        }
    }
    updateBoardData(event);

    checkArray(gameData.board);
}

// PART 6 WHEN YOU CLICK, SAVE THE X AND O INTO A BLANK ARRAY


// function to determine where user has clicked

function updateBoardData(event){    // tells you info of cell the user clicks on 
  console.log(event);  // show cell info
  let clickedCell = event.target;    // target gives info about the element
  let clickedCellNum = clickedCell.id;  // string of id of cell clicked on
  let clickedCellNumber = Number(clickedCellNum);    // convert to number
  if (gameData.playerInfo.currentPlayer === 1){    // if the player is 1 X
    gameData.board[clickedCellNumber] = "O";    // add O to the board array
    }
  else if(gameData.playerInfo.currentPlayer === 2) gameData.board[clickedCellNumber] = "X";  // if p2 add X
  console.log("here is the array " +gameData.board);  
  let finalAnswerArray = gameData.board;
  return finalAnswerArray;
}

console.log("array from object is " + gameData.board);

// PART 7 LOOK TO SEE IF YOU HAVE 3 X OR O IN A ROW

function checkArray(array){           // check who won
  let miniArrayRow1 = "";          // this function is called in the placeLetter function and checks each time a letter is entered
  for (let i = 0; i<3; i++){
    let letter = array[i];
    miniArrayRow1 += letter;
  }
  if (miniArrayRow1 == winningConditions[0]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayRow1 == winningConditions[1]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player2;
    playerTurn.innerText = "";
    stopGame();
  }

  console.log("the miniArrayRow1 is " + miniArrayRow1);
  console.log("the winningConditions is " + winningConditions[0]);

  let miniArrayRow2 = "";
  for (let i=3; i<6; i++){
    let letter = array[i];
    miniArrayRow2 += letter; 
  }
  if (miniArrayRow2 === winningConditions[0]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayRow2 === winningConditions[1]){
    youWonMessage.innerText = "You Won " +gameData.playerInfo.player2;
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayRow3 = "";
  for (let i=6; i<9; i++){
    let letter = array[i];
    miniArrayRow3 += letter; 
  }
  if (miniArrayRow3 === winningConditions[0]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayRow3 === winningConditions[1]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player2;
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCol1 = "";
  for (let i=0; i<7; i+=3){
    let letter = array[i];
    miniArrayCol1 += letter; 
  }
  if (miniArrayCol1 === winningConditions[0]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCol1 === winningConditions[1]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player2;
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCol2 = "";
  for (let i=1; i<9; i+=3){
    let letter = array[i];
    miniArrayCol2 += letter; 
  }
  if (miniArrayCol2 === winningConditions[0]){
    youWonMessage.innerText = "You Won " + gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCol2 === winningConditions[1]){
    youWonMessage.innerText = "You Won " +gameData.playerInfo.player2;
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCol3 = "";
  for (let i=2; i<9; i+=3){
    let letter = array[i];
    miniArrayCol3 += letter; 
  }
  if (miniArrayCol3 === winningConditions[0]){
    youWonMessage.innerText = "You Won " +gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCol3 === winningConditions[1]){
    youWonMessage.innerText = "You Won " +gameData.playerInfo.player2;
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCross1 = "";
  for (let i=2; i<7; i+=2){
    let letter = array[i];
    miniArrayCross1 += letter; 
  }
  if (miniArrayCross1 === winningConditions[0]){
    youWonMessage.innerText = "You Won " +gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCross1 === winningConditions[1]){
    youWonMessage.innerText = "You Won " +gameData.playerInfo.player2;
    playerTurn.innerText = "";
    stopGame();
  }

  let miniArrayCross2 = "";
  for (let i=0; i<9; i+=4){
    let letter = array[i];
    miniArrayCross2 += letter; 
  }
  if (miniArrayCross2 === winningConditions[0]){
    youWonMessage.innerText = "You Won "+ gameData.playerInfo.player1;
    playerTurn.innerText = "";
    stopGame();
  }
  if (miniArrayCross2 === winningConditions[1]){
    youWonMessage.innerText = "You Won " +gameData.playerInfo.player2;        // if any of these conditions are met then they won woo
    playerTurn.innerText = "";
    stopGame();
  }
}

// PART 8 WHEN THE PLAYER WINS DISABLE CLICKING

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
  
}



// PART 7 PLAY WITH CPU
