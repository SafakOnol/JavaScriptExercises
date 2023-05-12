const timeLeftDisplay   = document.querySelector('#time-left')
const resultDisplay     = document.querySelector('#result')
const startPauseButton  = document.querySelector('#start-pause-button')
const squares           = document.querySelectorAll('.grid div')
const logsL             = document.querySelectorAll('.log-left')
const logsR             = document.querySelectorAll('.log-right')
const carsL             = document.querySelectorAll('.car-left')
const carsR             = document.querySelectorAll('.car-right')

console.log(squares)

const totalIndex    = 81
let currentIndex    = 76
const rowLength     = 9
const rowMax        = Math.floor(totalIndex / rowLength)
const rowMin        = 1
let currentRow
let timerId
let countdownTimerId
let currentTime     = 10

function updateRow()
{
    currentRow = Math.floor(currentIndex / rowLength) + 1
}

function moveFroggy(e)
{
    squares[currentIndex].classList.remove('froggy')
    switch(e.key)
    {
        case 'ArrowLeft':
            if (currentIndex % rowLength !== 0)
            {
                currentIndex -= 1
                console.log('move left')
            }

            break
        case 'ArrowRight':
            if (currentIndex % rowLength < rowLength - 1)
            {
                currentIndex += 1
                console.log('move right')
            }

            break
        case 'ArrowUp':
            if (currentRow !== rowMin)
            {
                currentIndex -= rowLength
                updateRow()
                console.log('move up')
            }
            break
        case 'ArrowDown':
            if (currentRow !== rowMax)
            {
                currentIndex += rowLength
                updateRow()
                console.log('move down')
            }
            break
    }
    squares[currentIndex].classList.add('froggy')
    console.log('current index: ' + currentIndex)
    console.log('current row: ' + currentRow)
    updateRow()
}

function autoMoveElements()
{
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsL.forEach(logL => moveLogsLeft(logL))
    logsR.forEach(logR => moveLogsRight(logR))
    carsL.forEach(carsL => moveCarsLeft(carsL))
    carsR.forEach(carsR => moveCarsRight(carsR))
}

function checkGameState()
{
    loseCondition()
    winCondition()
}

function moveLogsLeft(logL)
{
    switch(true)
    {
        case    logL.classList.contains('l1') :
                logL.classList.remove('l1')
                logL.classList.add('l2')
                break
        case    logL.classList.contains('l2') :
                logL.classList.remove('l2')
                logL.classList.add('l3')
                break
        case    logL.classList.contains('l3') :
                logL.classList.remove('l3')
                logL.classList.add('l4')
                break
        case    logL.classList.contains('l4') :
                logL.classList.remove('l4')
                logL.classList.add('l5')
                break
        case    logL.classList.contains('l5') :
                logL.classList.remove('l5')
                logL.classList.add('l1')
                break
    }
}

function moveLogsRight(logR)
{
    switch(true)
    {
        case    logR.classList.contains('l1') :
                logR.classList.remove('l1')
                logR.classList.add('l5')
                break
        case    logR.classList.contains('l2') :
                logR.classList.remove('l2')
                logR.classList.add('l1')
                break
        case    logR.classList.contains('l3') :
                logR.classList.remove('l3')
                logR.classList.add('l2')
                break
        case    logR.classList.contains('l4') :
                logR.classList.remove('l4')
                logR.classList.add('l3')
                break
        case    logR.classList.contains('l5') :
                logR.classList.remove('l5')
                logR.classList.add('l4')
                break
    }
}

function moveCarsLeft(carsL)
{
    switch(true)
    {
        case    carsL.classList.contains('c1') :
                carsL.classList.remove('c1')
                carsL.classList.add('c2')
                break
        case    carsL.classList.contains('c2') :
                carsL.classList.remove('c2')
                carsL.classList.add('c3')
                break
        case    carsL.classList.contains('c3') :
                carsL.classList.remove('c3')
                carsL.classList.add('c1')
                break
    }
}

function moveCarsRight(carsR)
{
    switch(true)
    {
        case    carsR.classList.contains('c1') :
                carsR.classList.remove('c1')
                carsR.classList.add('c3')
                break
        case    carsR.classList.contains('c2') :
                carsR.classList.remove('c2')
                carsR.classList.add('c1')
                break
        case    carsR.classList.contains('c3') :
                carsR.classList.remove('c3')
                carsR.classList.add('c2')
                break
    }
}

function loseCondition()
{
    if (squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0)
    {
        resultDisplay.textContent = "You Lost!"
        clearInterval(timerId)
        clearInterval(countdownTimerId)
        squares[currentIndex].classList.remove('froggy')
        document.removeEventListener('keyup', moveFroggy)
    }
}

function winCondition()
{
    if (squares[currentIndex].classList.contains('ending-block'))
    {
        resultDisplay.textContent = 'You Won!'
        clearInterval(timerId)
        clearInterval(countdownTimerId)
        document.removeEventListener('keyup', moveFroggy)
    }
}

startPauseButton.addEventListener('click', () =>
{
    if (timerId)
    {
        clearInterval(timerId)
        clearInterval(countdownTimerId)
        timerId = null
        countdownTimerId = null
        document.removeEventListener('keyup', moveFroggy)
    }
    else
    {
        timerId = setInterval(autoMoveElements, 1000)
        countdownTimerId = setInterval(checkGameState, 1000)
        document.addEventListener('keyup', moveFroggy)
    }
})
