addRollButtonEvents();
addBetFocusEvents();

function addRollButtonEvents(){
    const balance = document.getElementById("balance");
    const bet = document.getElementById("bet");
    const rollButton = document.getElementById("rollButton");
    rollButton.addEventListener("click", () => {
        if(isNaN(Number(bet.value)) || Number(bet.value) == 0) {
            alert("bet must be a number greater than 0");
        } else if (Number(bet.value) > Number(balance.value)) {
            alert("insufficient funds for the bet");
        } else {
            calculate_score();
        }
    });
}

function addBetFocusEvents(){
    let betKeeper = document.getElementById("betKeeper");
    let bet = document.getElementById("bet");
    bet.addEventListener("focus", () => {
        document.getElementById("box").style.backgroundColor = "#8609f6";
        document.getElementById("craps").src = "img/Craps.png";
        document.getElementById("dieLeft").src = "img/diceQuestion_transparent.png";
        document.getElementById("dieRight").src = "img/diceQuestion_transparent.png";
        bet.value = "10.00";
        betKeeper.value = bet.value;
    })
}

function calculate_score(){
    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;
    let pointKeeper = document.getElementById("pointKeeper");
    let betKeeper = document.getElementById("betKeeper");
    const dieLeft = document.getElementById("dieLeft");
    const dieRight = document.getElementById("dieRight");
    dieLeft.src = "img/Die" + die1 + ".png";
    dieRight.src = "img/Die" + die2 + ".png";

    let sum = die1 + die2;

    // 2, 3 or 12 on first roll loses
    if (sum == 2 || sum == 3 || sum == 12)
    if (pointKeeper.value == 0)
        youLose();
    // These rolls will set point if first roll and must check if point was made on
    // subsequent rolls.
    else if ((sum > 3 && sum < 7) || (sum > 7 && sum < 11))
        if (sum == Number(pointKeeper.value))
            youWin();
        else if (pointKeeper.value == 0) {
            pointKeeper.value = sum;
            bet.value = "Point is " + point.value + " . Roll again.";
        }
        else
            bet.value = "Roll again."
    // 7 wins if it's the first roll, loses otherwise
    else if (sum == 7)
        if (pointKeeper.value > 0)
            // Rolled 7 after first roll - lose.
            youLose();
        else
            // Rolled 7 on first roll (i.e., point = 0) - win.
            youWin();
    // 11 wins if it's the first roll, roll again on subsequent rolls - no need to check the
    // point because thenpoint will never be set to 11.
    else
        if (pointKeeper.value == 0)
            youWin();
        else
            bet.value = "Roll again.";
    } // end calculate_score

function youLose() {
        balance.value = Number(balance.value) - Number(bet.value);
        document.getElementById("box").style.backgroundColor = "#f60f09";
        document.getElementById("craps").src = "img/Loser.png";
        bet.value = "You lose! Bet again.";
}

function youWin() {
    balance.value = Number(balance.value) + Number(bet.value);
    document.getElementById("box").style.backgroundColor = "#79f609";
    document.getElementById("craps").src = "img/Money.png";
    bet.value = "You Win! Bet again.";
}
