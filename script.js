window.onload = function() {
    // Variables
    var typeMatch;
    var player1;
    var player2;
    var playerStartToServe;
}

// Functions

function setTypeMatch(type) {
    typeMatch = type;

    document.getElementById('first-step').toggleAttribute('hidden');
    document.getElementById('second-step').toggleAttribute('hidden');
}

function setPlayers() {
    player1 = document.getElementById('name-player1').value.toUpperCase();
    player2 = document.getElementById('name-player2').value.toUpperCase();

    playerStartToServe = coinFlip();
    document.getElementById('player-who-start').innerHTML = playerStartToServe;
    document.getElementById('player-who-start').style.color = 'black';

    document.getElementById('second-step').toggleAttribute('hidden');
    document.getElementById('third-step').toggleAttribute('hidden');
}

function coinFlip() {
    return Math.floor(Math.random() * 2) === 0 ? player1 : player2;
}

function startGame() {
    document.getElementById('score-bar-name-player1').innerHTML = player1;
    document.getElementById('score-bar-name-player2').innerHTML = player2;

    if (playerStartToServe == player1) {
        document.getElementsByClassName('serving')[1].style.visibility = 'hidden';
    } else {
        document.getElementsByClassName('serving')[0].style.visibility = 'hidden';
    }

    document.getElementById('third-step').toggleAttribute('hidden');
    document.getElementById('score-bar').toggleAttribute('hidden');
}

