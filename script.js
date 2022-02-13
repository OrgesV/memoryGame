const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);


    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

  }
  const new_game_button = document.getElementById("new-game");
  new_game_button.addEventListener("click", newGame);

}
let clickable = true;
let new_game = false;
// -----------------------------------------My Code--------------------------------------------
// TODO: make it so only two cards are clickable at any given moment. If two cards are clicked no more can be clicked
function newGame(event)
{

  var childDivs = document.getElementById("game").getElementsByTagName('div');
  while(childDivs.length > 0)
  {
    for(let div of childDivs)
    {
      div.remove();
    }
  }

  createDivsForColors(shuffledColors);
  score = 0;
  score_board.textContent = score;
  new_game = true;

}
let score_board = document.getElementById("score-board");
let score = 0;
//holds an array of all the cards clicked. should hold a maximum of 2
  let selectedList = [];
  //handles click event for clicking on the cards
function handleCardClick(event) 
{
  if(new_game == true)
  {
      let count = document.getElementsByClassName('selected').length + 1;
      if(count > 2){
        clickable = false
      }
    if(!event.target.classList.contains('complete') && clickable)//stops from clicking the same box twice
    {
      event.target.style.backgroundColor = event.target.getAttribute('class'); //sets the color of the div on click
      event.target.classList.add('selected');//class used for comparing two cards
      event.target.classList.add('complete');//class used for checking if[] card is clickable or not
      selectedList.push(event.target);//add to the array
      //after a delay if there are two cards selected check if the colors are the same or not

      setTimeout(function(){
        if(count == 2){
          
          selectedList[0].classList.remove('selected');
          selectedList[1].classList.remove('selected');
          let classNamesOne = selectedList[0].classList;
          let classNamesTwo = selectedList[1].classList;

          //if colors are not the same reset everything, if they are do nothing
          if(classNamesOne[0] != classNamesTwo[0]){
          
            selectedList[0].style.backgroundColor = 'rgb(255,255,255)';
            selectedList[1].style.backgroundColor = 'rgb(255,255,255)';
            
            selectedList[0].classList.remove('complete');
            selectedList[1].classList.remove('complete');
            
          }else if (classNamesOne[0] == classNamesTwo[0]){
            score = score + 1;
            score_board.textContent = score;
          }
          //empties array to select two more cards
          selectedList.pop();
          selectedList.pop();
        }
          clickable = true;
      },500)

    }

  }
  if(document.getElementsByClassName('complete').length == COLORS.length)
  {
    new_game = false;
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);
