// function play(){
//     //Step-1 : hide the home screen. to hide the screen add the class hidden to the home section.

//     const homeSection = document.getElementById('home-screen');
//     homeSection.classList.add('hidden');
//     // console.log(homeSection.classList);

//     //show the playground
//     const playGroundSection = document.getElementById('play-ground');
//     playGroundSection.classList.remove('hidden');
//     // console.log(playGroundSection.classList);
// }



// This is the audio setup
const audio = new Audio();
let isGamePlayOn = false;
const artBoard = document.getElementById('art-board');
const modalBox = document.getElementById('modal-box');




function handleKeyBoardKeyUpEvent(event){
    if(isGamePlayOn == false) return;
    const playerPressed = event.key;
    console.log( 'player pressed', playerPressed);

    //stop the game if pressed 'ESC'
    if(playerPressed === 'Escape'){
        gameOver();
    }

    // key player is expected to press
    const currentAlphabetElement = document.getElementById('current-alphabet');
    const currentAlphabet = currentAlphabetElement.innerText;
    const expectedAlphabet = currentAlphabet.toLowerCase();

    //check right or wrong key press
    if(playerPressed === expectedAlphabet){
        console.log('You got a point !');

        audio.src = "../audio/success.mp3";
        audio.play();

        const currentScore = getTextElementValueById('current-score');
        const updatedScore = currentScore + 1;
        setTextElementValueById('current-score', updatedScore);
        //-----------------------------------------------------
        // update score:
        // 1.get the current score
        // const currentScoreElement = document.getElementById('current-score');
        // const currentScoreText = currentScoreElement.innerText;
        // const currentScore = parseInt(currentScoreText);
        // console.log(currentScoreText);
       

        // // 2. increase the score by 1
        const newScore = currentScore + 1;

        // // 3. show the updated score
        // currentScoreElement.innerText = newScore;

        //start a new round 

        // console.log('you have a pressed correctly', expectedAlphabet);
        removeBackgroundColorById(expectedAlphabet);
        continueGame();
    }else{
        console.log('Dhur mia vaiya ba apu sothik ta chapen');

        audio.src = "../audio/wrong.mp3";
        audio.play();

        

        const currentLife = getTextElementValueById('current-life');
        const updatedLife = currentLife - 1

        const updatedLifePercentage = (updatedLife / 5) * 100;
        artBoard.style.background = `linear-gradient(#FFFFFFB3 ${updatedLifePercentage}%,red)`;

        setTextElementValueById('current-life', updatedLife);

        if(updatedLife === 0){
            gameOver();
        }







        // -------------------------------------------
        // step-1: get the current life number
        // const currentLifeElement = document.getElementById('current-life');
        // const currentLifeText = currentLifeElement.innerText;
        // const currentLife = parseInt(currentLifeText);

        // //step-2: reduce the life count
        // const newLife = currentLife - 1; 

        // //step-3: display the updated life count
        // currentLifeElement.innerText = newLife;
    }
}

document.addEventListener('keyup', handleKeyBoardKeyUpEvent);

function continueGame(){
    //step-1:Generate a random alphabet
    const alphabet = getARandomAlphabet();
    // console.log('Your random alphabet', alphabet);

    //set randomly generated alphabet to the screen(show it)
    const currentAlphabetElement = document.getElementById('current-alphabet');
    currentAlphabetElement.innerText = alphabet;

    //set background color
    setBackgroundColorById(alphabet);
}

function play(){

    //hide everything show only the playground
    console.log('play button clicked');
    hideElementById('home-screen');
    hideElementById('final-score');
    showElementById('play-ground');
    isGamePlayOn = true;

    //reset score and life

    setTextElementValueById('current-life', 5);
    setTextElementValueById('current-score', 0);




    continueGame();
}

function gameOver(){
    hideElementById('play-ground');
    showElementById('final-score');

    isGamePlayOn = false

    //update final score
    // 1.get the final score
    const lastScore = getTextElementValueById('current-score');
    console.log(lastScore);
    setTextElementValueById('last-score', lastScore);


    //clear the last selected alphabet highlight
    const currentAlphabet = getElementTextById('current-alphabet');
    // console.log(currentAlphabet);

    removeBackgroundColorById(currentAlphabet);
    artBoard.style.background = "linear-gradient(#FFFFFFb3 100%,red)"
}


function modalOpen(event){
    if(event.clientY < 20){
        modalBox.style.display = 'flex';
    }
}

function modalClose(){
    modalBox.style.display = "none";
}


document.body.onmousemove = modalOpen;