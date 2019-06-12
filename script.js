// Variables
var typeMatch;
var player1;
var player2;
var playerService;
var tieBreak = false;

// Functions

function setTypeMatch(type) {
    typeMatch = type;

    document.getElementById('first-step').toggleAttribute('hidden');
    document.getElementById('second-step').toggleAttribute('hidden');
}

function setPlayers() {
    player1 = document.getElementById('name-player1').value.toUpperCase();
    player2 = document.getElementById('name-player2').value.toUpperCase();

    playerService = coinFlip();
    document.getElementById('player-who-start').innerHTML = playerService;
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

    document.getElementById('btn-win-point-player1').innerHTML = player1;
    document.getElementById('btn-win-point-player2').innerHTML = player2;

    if (playerService == player1) {
        document.getElementsByClassName('serving')[1].style.visibility = 'hidden';
    } else {
        document.getElementsByClassName('serving')[0].style.visibility = 'hidden';
    }

    document.getElementById('third-step').toggleAttribute('hidden');
    document.getElementById('score-bar').toggleAttribute('hidden');
}

function changeServer(tieBreak) {
    if (!tieBreak) {
        if (playerService == player1) {
            playerService = player2;
            document.getElementsByClassName('serving')[1].style.visibility = 'visible';
            document.getElementsByClassName('serving')[0].style.visibility = 'hidden';
        } else {
            playerService = player1;
            document.getElementsByClassName('serving')[0].style.visibility = 'visible';
            document.getElementsByClassName('serving')[1].style.visibility = 'hidden';
        }
    } else {
        if (document.getElementsByClassName('serving')[0].style.visibility == 'hidden') {
            document.getElementsByClassName('serving')[0].style.visibility = 'visible';
            document.getElementsByClassName('serving')[1].style.visibility = 'hidden';
        } else {
            document.getElementsByClassName('serving')[1].style.visibility = 'visible';
            document.getElementsByClassName('serving')[0].style.visibility = 'hidden';
        }
    }
}

function winPoint(player) {
    var pointsNumber = document.getElementById('points-number-'+player);

    if (!tieBreak) {
        switch (pointsNumber.innerHTML) {
            case '0':
                pointsNumber.innerHTML = 15;
                break;
            case '15':
                pointsNumber.innerHTML = 30;
                break;
            case '30':
                pointsNumber.innerHTML = 40;
                break;
            case '40':
                if (document.getElementById('points-number-player1').innerHTML == document.getElementById('points-number-player2').innerHTML) {
                    pointsNumber.innerHTML = 'AV';
                    pointsNumber.classList.add('advantage');
                } else {
                    if (player == 'player1') {
                        if (document.getElementById('points-number-player2').innerHTML == 'AV') {
                            document.getElementById('points-number-player2').innerHTML = 40
                            document.getElementById('points-number-player2').classList.remove('advantage');
                        } else {
                            winJeu(player);
                        }
                    } else {
                        if (document.getElementById('points-number-player1').innerHTML == 'AV') {
                            document.getElementById('points-number-player1').innerHTML = 40
                            document.getElementById('points-number-player1').classList.remove('advantage');
                        } else {
                            winJeu(player);
                        }
                    }
                }
                break;
            case 'AV':
                pointsNumber.classList.remove('advantage');
                winJeu(player);
                break;
        }
    } else {
        if (Number(pointsNumber.innerHTML) < 6) {
            pointsNumber.innerHTML = Number(pointsNumber.innerHTML) + 1;
        } else {
            pointsNumber.innerHTML = Number(pointsNumber.innerHTML) + 1;
            console.log(moreThan2PointsGap(player));
            if (moreThan2PointsGap(player)) {
                winJeu(player);
                return;
            }
        }
        if (calculTotalPointsTieBreak(player) %2 == 1) {
            changeServer(true);
        }
    }
}

function winJeu(player) {
    var gamesNumber = document.getElementById('games-number-'+player);

    changeServer(false);

    document.getElementById('points-number-player1').innerHTML = 0;
    document.getElementById('points-number-player2').innerHTML = 0;

    if (Number(gamesNumber.innerHTML) < 5) {
        gamesNumber.innerHTML = Number(gamesNumber.innerHTML) + 1;
    } else if (gamesNumber.innerHTML == '5') {
        gamesNumber.innerHTML = Number(gamesNumber.innerHTML) + 1;

        if (moreThan2GamesGap(player)) {
            winSet(player);
        } else if (checkTieBreak(player)) {
            tieBreak = true;
            changeServer(false);
        }
    } else {
        gamesNumber.innerHTML = Number(gamesNumber.innerHTML) + 1;
        if (gamesNumber.innerHTML == 7) {
            winSet(player);
        }
    }
}

function winSet(player) {
    tieBreak = false;
    console.log('WIN SET', player);
}

// Helpers

function moreThan2GamesGap(player) {
    var gamesNumber = document.getElementById('games-number-'+player);

    if (player == 'player1') {
        return Number(gamesNumber.innerHTML) - Number(document.getElementById('games-number-player2').innerHTML) >= 2;
    } else {
        return Number(gamesNumber.innerHTML) - Number(document.getElementById('games-number-player1').innerHTML) >= 2;
    }
}

function moreThan2PointsGap(player) {
    var pointsNumber = document.getElementById('points-number-'+player);

    if (player == 'player1') {
        return Number(pointsNumber.innerHTML) - Number(document.getElementById('points-number-player2').innerHTML) >= 2;
    } else {
        return Number(pointsNumber.innerHTML) - Number(document.getElementById('points-number-player1').innerHTML) >= 2;
    }
}

function checkTieBreak(player) {
    var gamesNumber = document.getElementById('games-number-'+player);

    if (player == 'player1') {
        return Number(gamesNumber.innerHTML) + Number(document.getElementById('games-number-player2').innerHTML) == 12;
    } else {
        return Number(gamesNumber.innerHTML) + Number(document.getElementById('games-number-player1').innerHTML) == 12;
    }
}

function calculTotalPointsTieBreak(player) {
    var pointsNumber = document.getElementById('points-number-'+player);

    if (player == 'player1') {
        return Number(pointsNumber.innerHTML) + Number(document.getElementById('points-number-player2').innerHTML);
    } else {
        return Number(pointsNumber.innerHTML) + Number(document.getElementById('points-number-player1').innerHTML);
    }
}



