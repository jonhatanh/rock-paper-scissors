
const options = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return options[Math.floor(Math.random() * 3)]
}


function playRound(playerSelection = '', computerSelection) {
    playerSelection = playerSelection.toLowerCase()
    let winnerMessage = '';
    if (playerSelection === computerSelection) return `It's a draw! Both chose ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)}`

    if (playerSelection === 'rock') {
        winnerMessage = computerSelection === 'paper' ? 'You Lose! Rock loses to Paper.' : 'You Win! Rock beats Scissors.';

    } else if (playerSelection === 'paper') {
        winnerMessage = computerSelection === 'scissors' ? 'You Lose! Paper loses to Scissors.' : 'You Win! Paper beats Rock.';
        
    } else if (playerSelection === 'scissors') {
        winnerMessage = computerSelection === 'rock' ? 'You Lose! Scissors lose to Rock.' : 'You Win! Scissors beats Paper.';
    } else {
        winnerMessage = 'Unknown option'
    }

    return winnerMessage;
}
