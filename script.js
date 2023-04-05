
let foodX, foodY
let score= 0
// lastPaintTime= 0, 
// inputDir= {x: 0, y: 0}, 
// food= true
let gameOver = false
let snakeArr = [];
let velocityX = 0, velocityY = 0;
let snakeX = 5, snakeY = 10;


let setIntervalId

const playBoard = document.querySelector('.play-board')
const scoreValue = document.querySelector('.score')
const highScoreValue = document.querySelector('.high-score')
const controls = document.querySelectorAll(".controls i");

//getting high score from local storage
const highScore = localStorage.getItem('high-score') || 0;
highScoreValue.innerText = `High Score: ${highScore}`

//change food position randomly
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}
//change directino using arrow keys

const changeDirection = (e) => {
    console.log(e.key);
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

}

//change direction using buttons
controls.forEach((key) => {
    key.addEventListener("click", () => {
        changeDirection({ key: key.dataset.key });
        // console.log(key);
    });
})

//game over and reload page
const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to restart...");
    location.reload();
}


//game loop
const initGame = () => {
    if (gameOver) return handleGameOver()
    

    let htmlMarkup = `<div class = "food" style="grid-area: ${foodY}/${foodX} "></div>`
    //if snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        //  snakeArr.push([snakeX, snakeY])
        changeFoodPosition()
        snakeArr.push([foodX, foodY])//pushing food position to snake body 
        score ++;//increasing score
        
        //setting high score
        if (score > highScore) {
            localStorage.setItem('high-score', score);
            // highScoreValue.innerText = `High Score: ${score}`
        }
        scoreValue.innerText = `Score: ${score}`

        
        
        //
        //
        console.log(snakeArr);
    }
    //moving snake
    snakeX += velocityX;
    snakeY += velocityY;
    //if snake hits the wall

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }
    //if snake hits itself

    snakeArr = [[snakeX, snakeY], ...snakeArr.slice(0, -1)]
    
    // console.log(snakeArr);
    for (let i = 0; i < snakeArr.length; i++) {
        //addign food body to snake body

        htmlMarkup += `<div class = "snake" style="grid-area: ${snakeArr[i][1]}/${snakeArr[i][0]} "></div>`
        
        //if snake hits itself
        if (i !== 0 && snakeArr[i][0] === snakeArr[0][0] && snakeArr[i][1] === snakeArr[0][1]) {
            return gameOver = true;
        }

    }
    playBoard.innerHTML = htmlMarkup
}

//calling functions
changeFoodPosition()
initGame()
setIntervalId = setInterval(initGame, 100);
document.addEventListener('keydown', changeDirection);

