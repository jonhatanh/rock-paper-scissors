
const options = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return options[Math.floor(Math.random() * 3)]
}


function playRound(playerSelection = '', computerSelection) {
    playerSelection = playerSelection.toLowerCase()
    const result = {winnerMessage: '', playerWon: undefined}
    if (playerSelection === computerSelection) {
        result.winnerMessage = `It's a draw! Both chose ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)}`;
        return result;
    }

    if (playerSelection === 'rock') {
        result.winnerMessage = computerSelection === 'paper' 
        ? (result.playerWon = false, 'You Lose! Rock loses to Paper.') 
        : (result.playerWon = true, 'You Win! Rock beats Scissors.');

    } else if (playerSelection === 'paper') {
        result.winnerMessage = computerSelection === 'scissors' 
        ? (result.playerWon = false, 'You Lose! Paper loses to Scissors.' )
        : (result.playerWon = true, 'You Win! Paper beats Rock.');
        
    } else if (playerSelection === 'scissors') {
        result.winnerMessage = computerSelection === 'rock' 
        ? (result.playerWon = false, 'You Lose! Scissors lose to Rock.') 
        : (result.playerWon = true, 'You Win! Scissors beats Paper.');
    } else {
        result.winnerMessage = 'Unknown option'
    }

    return result;
}
const gameInfo = {
    round: 1,
    points: {
        player: 0,
        computer: 0,
    },
};
function game() {
    let round = 1;
    const points = {player: 0, computer: 0};

    while(round <= 5) {
        let playerSelection = prompt('Select your option:')
        let computerSelection = getComputerChoice();
        console.log(`${playerSelection} vs ${computerSelection}`)
        
        const result = playRound(playerSelection, computerSelection)
        console.log(result.winnerMessage)
        if(result.playerWon) {
            points.player++;
        } else if (result.playerWon === false) {
            points.computer++;
        } 
        round++;
    }
    console.log('Game Results: ',points);
}