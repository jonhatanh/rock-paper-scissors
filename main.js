
const options = ['rock', 'paper', 'scissors'];
const startButton = document.getElementById('start');

startButton.addEventListener('click', game);

function getComputerChoice() {
    return options[Math.floor(Math.random() * 3)]
}


function playRound(playerSelection = '', computerSelection) {
    //playerSelection = playerSelection.toLowerCase()
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

function game(e) {
    e.target.parentNode.style.display = 'none';
    const nextRoundButton = document.getElementById('nextRound');
    // nextRoundButton.removeEventListener('click')
    const gameInfo = {
        round: 1,
        points: {
            player: 0,
            computer: 0,
        },
        message: '- Choose an option -',
    };
    showGameInfo(gameInfo, false);
    let animationsRunning = false;
    // let round = 1;
    // const points = {player: 0, computer: 0};

    const rockButton = document.getElementById('rock-player')
    const paperButton = document.getElementById('paper-player')
    const scissorsButton = document.getElementById('scissors-player')

    rockButton.addEventListener('click', prepareRound);
    paperButton.addEventListener('click', prepareRound);
    scissorsButton.addEventListener('click', prepareRound);


    async function prepareRound(e) {
        if (animationsRunning) return;
        animationsRunning = true;
        const playerTarget = e.currentTarget;


        await showMatchLabel('Rock');
        const playerSelection = playerTarget.dataset.id;
        const computerSelection = getComputerChoice();

        const computerTarget = document.getElementById(`${computerSelection}-computer`)

        const unselectedComputerOptions = getUnselectedOptions(computerSelection);
        stopComputerAnimations(unselectedComputerOptions);
        console.log(computerTarget);

        playerTarget.classList.add('choosed');
        computerTarget.classList.add('choosed');

        
        const result = playRound(playerSelection, computerSelection)
        if (result.winnerMessage === 'Unknown option') return;
        gameInfo.message = result.winnerMessage;
        if(result.playerWon) {
            gameInfo.points.player++;
        } else if (result.playerWon === false) {
            gameInfo.points.computer++;
        } 
        gameInfo.round++;
        setTimeout(showGameInfo, 1300, gameInfo);

        if(gameInfo.round === 6) return;
        let nextRound = () => {
            nextRoundButton.parentNode.style.display = 'none'
            gameInfo.message = '- Choose an option -';
            playComputerAnimations(getComputerOptions())
            playerTarget.classList.remove('choosed');
            computerTarget.classList.remove('choosed');
            animationsRunning = false;
            showGameInfo(gameInfo, false)
        }

        nextRoundButton.addEventListener('click', nextRound, {once: true});
    }

}

function resetPlayerSelection() {
    const nodes = document.querySelectorAll('.player-side .option');
    nodes.forEach(option => {
        option.classList.remove('choosed');
        option.classList.remove('choosed');
        option.classList.remove('choosed');
    })
}
function resetComputerSelection() {
    const nodes = getComputerOptions();
    nodes.forEach(option => {
        option.classList.remove('choosed');
        option.classList.remove('choosed');
        option.classList.remove('choosed');
    })
}

function showMatchLabel(string) {
    return new Promise((resolve, reject) => {
        const label = document.querySelector('.label')
        label.textContent = `${string}!`
        label.classList.add('match')

        label.addEventListener('animationiteration', (e) => {
            if (e.elapsedTime === 0.5) {
                label.textContent = 'Paper!'
            }
            if (e.elapsedTime === 1) {
                label.textContent = 'Scissors!'
            }
        });
        label.addEventListener('animationend', (e) => {
            label.textContent = '';
            label.classList.remove('match')
            resolve(true);
        });
    })
}

function showGameInfo(info, showNextRoundButton = true) {
    if( info.round === 6) {
        debugger;
        let winner = ''
        if(info.points.player === info.points.computer) {
            winner = 'It\'s a draw!';
        } else if (info.points.player > info.points.computer) {
            winner = 'You Win!';
        } else {
            winner = 'You Lose!';
        }
        document.querySelector('.modal p').textContent = `Game Over: ${winner}`;
        document.querySelector('.modal p').style.display = 'block';
        document.querySelector('.modal').style.display = 'flex';
        document.getElementById('playerPoints').textContent = info.points.player;
        document.getElementById('computerPoints').textContent = info.points.computer;
        playComputerAnimations(getComputerOptions());
        resetComputerSelection();
        resetPlayerSelection();

    } else {
        document.getElementById('playerPoints').textContent = info.points.player;
        document.getElementById('computerPoints').textContent = info.points.computer;
        document.getElementById('roundLabel').textContent = `Round ${info.round}`
        document.getElementById('resultLabel').textContent = `${info.message}`
        if (showNextRoundButton) {
            document.querySelector('.next-round').style.display = 'flex';
        }
    }
}

function getComputerOptions() {
    return document.querySelectorAll('.computer-side .option');
}
function getUnselectedOptions(selection) {
    const result = [];
    const nodeOptions = getComputerOptions();
    nodeOptions.forEach(option => {
        if (!option.id.includes(selection)) result.push(option);
    })
    return result;
}
function stopComputerAnimations(options) {
    options.forEach(option => {
        option.classList.remove('rock');
        option.classList.remove('paper');
        option.classList.remove('scissors');
    })
}

function playComputerAnimations(options) {
    options.forEach(option => {
        if (option.id.includes('rock')) {
            option.classList.add('rock');
        } else if (option.id.includes('paper')) {
            option.classList.add('paper');
        } else {
            option.classList.add('scissors');
        }
    })
}
