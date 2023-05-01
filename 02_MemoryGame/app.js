const cardArray =
[
    // 1
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    // 2 we need two of each card
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
];

cardArray.sort(() => 0.5 - Math.random()); // sort array randomly

const gridDisplay = document.querySelector('#grid'); // searches for the id grid

const resultDisplay = document.querySelector('#result');

let cardsChosen = [];

let cardsChosenIds = [];

const cardsWon = [];

function createBoard()
{
    for (let i = 0; i < cardArray.length; i++)
    {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard); // flipCard is callback, we're not doing flipCard()***
        gridDisplay.appendChild(card);
    }
}
createBoard();

function checkMatch()
{
    const cards = document.querySelectorAll('#grid img');
    const selectedCardOneId = cardsChosenIds[0];
    const selectedCardTwoId = cardsChosenIds[1];
    console.log(cards);
    console.log('Check for match!');
    if (selectedCardOneId == selectedCardTwoId)
    {
        cards[selectedCardOneId].setAttribute('src', 'images/blank.png');
        cards[selectedCardTwoId].setAttribute('src', 'images/blank.png');
        alert('You have clicked the same image!');
    }

    else if (cardsChosen[0] == cardsChosen[1])
    {
        alert(`It's a match!`);
        cards[selectedCardOneId].setAttribute('src', 'images/white.png');
        cards[selectedCardTwoId].setAttribute('src', 'images/white.png');
        cards[selectedCardOneId].removeEventListener('click', flipCard);
        cards[selectedCardTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen); // fix this
    }
    else
    {
        cards[selectedCardOneId].setAttribute('src', 'images/blank.png');
        cards[selectedCardTwoId].setAttribute('src', 'images/blank.png');
        alert('Sorry, try again!');
    }
    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length/2)
    {
        resultDisplay.textContent = 'Congratulations! You found all the pairs!!!';

    }
}

function flipCard()
{
    let cardId = this.getAttribute('data-id'); //this = whatever element is clicked!
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    //console.log('clicked', cardId);
    //console.log(cardsChosen);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2)
    {
        setTimeout(checkMatch, 500);

    }

    // add reset function for last two cards
}