addRollButtonEvents();
addBetFocusEvents();

function addRollButtonEvents(){
    const balance = document.getElementById("balance");
    const bet = document.getElementById("bet");
    const rollButton = document.getElementById("rollButton");
    rollButton.addEventListener("click", () => {
        // make sure the bet is valid
        if(isNaN(Number(bet.value)) || Number(bet.value) == 0) {
            alert("bet must be a number greater than 0");
        } else if (Number(bet.value) > Number(balance.value)) {
            alert("insufficient funds for the bet");
        } else {
            calculate_score();
        }
    });
}

// reset when the bet entry box gets the focus
function addBetFocusEvents(){
    const bet = document.getElementById("bet");
    const result = document.getElementById("result");
    bet.addEventListener("focus", () => {
        document.getElementById("box").style.backgroundColor = "#8609f6";
        document.getElementById("craps").src = "img/Craps.png";
        document.getElementById("dieLeft").src = "img/Question.png";
        document.getElementById("dieRight").src = "img/Question.png";
        bet.value = "";
        result.value = "";
        document.getElementById("pointKeeper").value = 0;
    })
}

function calculate_score(){
    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;
    // "point" is stored in hidden text box with id = "pointkeeper"
    const pointKeeper = document.getElementById("pointKeeper");
    const result = document.getElementById("result");
    const bet = document.getElementById("bet");
    const dieLeft = document.getElementById("dieLeft");
    const dieRight = document.getElementById("dieRight");
    dieLeft.src = "img/Die" + die1 + ".png";
    dieRight.src = "img/Die" + die2 + ".png";

    let sum = die1 + die2;

    // 2, 3 or 12 on first roll loses
    if (sum == 2 || sum == 3 || sum == 12) {
        if (pointKeeper.value == 0) // i.e., first roll
            youLose();
        else 
            result.value = "Roll again."; // point will never be 2, 3, or 12
    // If first roll, set point. Otherwise check if point was made.
    } else if ((sum > 3 && sum < 7) || (sum > 7 && sum < 11))
        if (sum == pointKeeper.value) 
            youWin();
        else if (pointKeeper.value == 0) {
            pointKeeper.value = sum;
            result.value = "Point is " + pointKeeper.value + ". Roll again.";
        }
        else
            result.value = "Roll again."
    // 7 wins if it's the first roll, loses otherwise
    else if (sum == 7)
        if (pointKeeper.value > 0) // Rolled 7 after first roll - lose.
            youLose();
        else
            // Rolled 7 on first roll (i.e., point = 0) - win.
            youWin();
    // 11 wins if it's the first roll, roll again on subsequent rolls.
    // No need to check the point because the point will never be set to 11.
    else
        if (pointKeeper.value == 0) // i.e., first roll.
            youWin();
        else
            result.value = "Roll again."; // Roll again if not first roll.
    } // end calculate_score

function youLose() {
    balance.value = Number(balance.value) - Number(bet.value);
    document.getElementById("bet").value = "";
    document.getElementById("pointKeeper").value = 0;
    document.getElementById("box").style.backgroundColor = "#f60f09";
    document.getElementById("craps").src = "img/Loser.png";
    result.value = "You lose! Bet again.";
}

function youWin() {
    balance.value = Number(balance.value) + Number(bet.value);
    document.getElementById("bet").value = "";
    document.getElementById("pointKeeper").value = 0;
    document.getElementById("box").style.backgroundColor = "#79f609";
    document.getElementById("craps").src = "img/Money.png";
    result.value = "You Win! Bet again.";
}
