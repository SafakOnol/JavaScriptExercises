// block variables and grid

const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const gridWidth = 560
const gridHeight = 300

const blockWidth = 100
const blockHeight = 20

let playerWidth = 100
let playerHeight = 20

const ballDiameter = 20

let timerId
let score = 0


// player variables
const playerStart = [230, 10]
let playerCurrentPosition = playerStart

// ball variables
const ballStart = [270, 40]
let ballCurrentPosition = ballStart
let ballVelX = (Math.random() + 0.5) * 0.5; // min 0.25 - max 0.75 --> Safak the math genius!
let ballVelY = 0.6;
let ballPosX = ballCurrentPosition[0]
let ballPosY = ballCurrentPosition[1]

// player-ball collision
let playerLeft;
let playerRight;
let playerTopY;
let playerLimitY;

// block collision
let blockLeft
let blockRight
let blockTopY
let blockBottomY
let blockTopLimitY
let blockBottomLimitY

// create Block class
class Block
{
    constructor(x, y)
    {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

// add all blocks
const blocks =
[
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

// draw block
function addBlocks()
{
    for (let i = 0; i < blocks.length; i++)
    {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px' // x value in the constructor this.bottomLeft
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'  // y value in the constructor this.bottomLeft
        grid.appendChild(block)
    }
}

addBlocks()

// define block collision borders
// for (let i = 0; i < blocks.length; i++)
// {
//     blockLeft       = blocks[i].bottomLeft[0] - ballDiameter/2
//     blockRight      = blocks[i].bottomLeft[0] + blockWidth - ballDiameter/2
//     blockTopY       = blocks[i].topLeft[1] + blockHeight
//     blockTopLimitY  = blockTopY - ballDiameter/4
//     blockBottomY    = blocks[i].bottomLeft[1]
//     blockBottomLimitY = blockBottomY + ballDiameter/4
// }

// add player
const player = document.createElement('div')
player.classList.add('player')
drawPlayer()
grid.appendChild(player)

// draw player
function drawPlayer()
{
    player.style.left = playerCurrentPosition[0] + 'px'
    player.style.bottom = playerCurrentPosition[1] + 'px'
}


// move player
function movePlayer(e)
{
    switch(e.key)
    {
        case 'ArrowLeft':
            if(playerCurrentPosition[0] > 0)
            {
                playerCurrentPosition[0] -= 10
                drawPlayer()
            }
            break
        case 'ArrowRight':
            if(playerCurrentPosition[0] < gridWidth - blockWidth)
            {
                playerCurrentPosition[0] += 10
                drawPlayer()
            }
            break
    }

    playerLeft  = playerCurrentPosition[0] -ballDiameter/2
    playerRight = playerCurrentPosition[0] + blockWidth - ballDiameter/2
    playerTopY  = playerCurrentPosition[1] + blockHeight
    playerLimitY = playerTopY - ballDiameter/3
    // console.log(playerLeft)
    // console.log(playerRight)
    // console.log(playerCurrentPosition[0])
}

document.addEventListener('keydown', movePlayer)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


// draw ball
function drawBall()
{
    ball.style.left = ballPosX + 'px'
    ball.style.bottom = ballPosY +'px'
}

// move ball
function moveBall()
{
    ballPosX += ballVelX;
    ballPosY += ballVelY;
    drawBall()
    handleCollision()
}

timerId = setInterval(moveBall, 1)

// collision borders
const borderLeftX = 0
const borderRightX = gridWidth - ballDiameter
const borderTopY = gridHeight - ballDiameter
const borderBottomY = 0


// check collisions and react
function handleCollision()
{
   // right edge
    if (ballPosX > borderRightX)
    {
        ballPosX = borderRightX
        ballVelX *= -1.0
        console.log('Right!')
    }
   // top edge
    if (ballPosY > borderTopY)
    {
        ballPosY = borderTopY
        ballVelY *= -1.0
        console.log('Top!')
    }
   // left edge
   if (ballPosX < borderLeftX)
   {
        ballPosX = borderLeftX
        ballVelX *= -1.0
        console.log('Left!')
   }
   //bottom edge
   if (ballPosY < borderBottomY)
   {
        ballPosY = borderBottomY
        ballVelY *= -1.0

        clearInterval(timerId)
        scoreDisplay.innerHTML = 'GAME OVER!'
        document.removeEventListener('keydown', movePlayer)
   }

   // hit player
   if (ballPosY < playerTopY && ballPosY > playerLimitY && ballPosX > playerLeft && ballPosX < playerRight)
   {
        ballVelY *= -1.0
        ballPosY = playerTopY
        //console.log('Hit!')
   }

   for (let i = 0; i < blocks.length; i++)
    {
        blockLeft       = blocks[i].bottomLeft[0] - ballDiameter/2
        blockRight      = blocks[i].bottomRight[0] - ballDiameter/2
        blockTopY       = blocks[i].topLeft[1] + blockHeight - ballDiameter
        blockTopLimitY  = blockTopY - ballDiameter/4
        blockBottomY    = blocks[i].bottomLeft[1] - ballDiameter
        blockBottomLimitY = blockBottomY + ballDiameter/4

        const allBlocks = Array.from(document.querySelectorAll('.block'))


        // top edge
        if (ballPosX < blockRight && ballPosX > blockLeft &&
            blockTopLimitY < ballPosY && ballPosY < blockTopY && ballVelY < 0)
            {
                ballPosY = blockTopY
                ballVelY *= -1.0
                console.log(i);
                allBlocks[i].classList.remove('block') // remove from allBlocks array
                blocks.splice(i, 1) // remove the block in the index i from block class
                score++
                scoreDisplay.innerHTML = score
            }

        // bottom edge
        if (ballPosX < blockRight && ballPosX > blockLeft &&
            blockBottomY < ballPosY && ballPosY < blockBottomLimitY && ballVelY > 0)
            {
                ballPosY = blockBottomY
                ballVelY *= -1.0
                console.log(i);
                allBlocks[i].classList.remove('block') // remove from allBlocks array
                blocks.splice(i, 1) // remove the block in the index i from block class
                score++
                scoreDisplay.innerHTML = score
            }

        // left edge
        if (ballPosX < blockRight && ballPosX > blockLeft &&
                 blockBottomY < ballPosY && ballPosY < blockTopY && ballVelX > 0)
            {
                ballPosX = blockLeft
                ballVelX *= -1.0
                console.log(i);
                allBlocks[i].classList.remove('block') // remove from allBlocks array
                blocks.splice(i, 1) // remove the block in the index i from block class
                score++
                scoreDisplay.innerHTML = score
            }
        // right edge
        if (ballPosX < blockRight && ballPosX > blockLeft &&
                 blockBottomY < ballPosY && ballPosY < blockTopY && ballVelX < 0)
            {
                ballPosX = blockRight
                ballVelX *= -1.0
                console.log(i);
                allBlocks[i].classList.remove('block') // remove from allBlocks array
                blocks.splice(i, 1) // remove the block in the index i from block class
                score++
                scoreDisplay.innerHTML = score
             }
        if (blocks.length === 0)
        {
            scoreDisplay.innerHTML = 'YOU WIN!'
            clearInterval(timerId)
            document.removeEventListener('keydown', movePlayer)
        }
    }
}