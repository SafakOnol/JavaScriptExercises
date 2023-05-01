// get the span values from html
const computerChoiceDisplay = document.getElementById('computer-choice');
const playerChoiceDisplay   = document.getElementById('player-choice');
const resultDisplay         = document.getElementById('result');

let playerChoice; 
let computerChoice;
let result;

// get all the buttons with query selector
const possibleChoices = document.querySelectorAll('button')

possibleChoices.forEach(choice => choice.addEventListener('click', (e) => 
{
    playerChoice = e.target.id;
    playerChoiceDisplay.innerHTML = playerChoice;
    generateComputerChoice();
    evaluate();
}))

function generateComputerChoice()
{
    const randomNum = Math.floor(Math.random() * possibleChoices.length) + 1;
    console.log(randomNum);

    if (randomNum === 1)
    {
        computerChoice = 'rock'
    }

    if (randomNum === 2)
    {
        computerChoice = 'paper'
    }

    if (randomNum === 3)
    {
        computerChoice = 'scissors'
    }

    computerChoiceDisplay.innerHTML = computerChoice;
}

function evaluate()
{
    if (playerChoice === computerChoice)
    {
        result = 'Tie!'
    }

    if (playerChoice === 'rock' && computerChoice === 'paper')
    {
        result = 'You Lost!' // computer wins
    }

    if (playerChoice === 'rock' && computerChoice === 'scissors')
    {
        result = 'You Win!' // player wins
    }

    if (playerChoice === 'paper' && computerChoice === 'rock')
    {
        result = 'You Win!' // player wins
    }

    if (playerChoice === 'paper'&& computerChoice === 'scissors')
    {
        result = 'You Lost!' // computer wins
    }

    if (playerChoice === 'scissors' && computerChoice === 'rock')
    {
        result = 'You Lost!' // computer wins
    }

    if (playerChoice === 'scissors' && computerChoice === 'paper')
    {
        result = 'You Win!' // player wins
    }

    resultDisplay.innerHTML = result;

}




