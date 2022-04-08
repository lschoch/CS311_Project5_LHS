const balHeader = document.getElementById("balanceHeader");
const balance = document.getElementById("balance");
const bet = document.getElementById("bet");
const result = document.getElementById("result");
const pointKeeper = document.getElementById("pointKeeper");

addRollButtonEvents();
addBetFocusEvents();

// Initialize the balance textbox and heading.
balance.value = 100.00;
balHeader.innerHTML = "Balance: " + numToCurrency(balance.value);

// Initialize pointKeeper.
pointKeeper.value = 0;

function addRollButtonEvents(){
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

// Reset game box when the bet entry box gets the focus
function addBetFocusEvents(){
    bet.addEventListener("focus", () => {
        // Starting over, reset images and background color to baselines.
        document.getElementById("box").style.backgroundColor = "#8609f6";
        document.getElementById("craps").src = "img/Craps.png";
        document.getElementById("dieLeft").src = "img/Question.png";
        document.getElementById("dieRight").src = "img/Question.png";
        // Starting over, reset bet and result to empty strings.
        bet.value = "";
        result.value = "";
        // Starting over, reset pointkeeper to 0.
        document.getElementById("pointKeeper").value = 0;
    })
}

function calculate_score(){
    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;
    const dieLeft = document.getElementById("dieLeft");
    const dieRight = document.getElementById("dieRight");
    dieLeft.src = "img/Die" + die1 + ".png";
    dieRight.src = "img/Die" + die2 + ".png";

    let sum = die1 + die2;

    // 2, 3 or 12 on first roll loses
    if (sum == 2 || sum == 3 || sum == 12) {
        if (pointKeeper.value == 0) // i.e., it's a first roll
            youLose();
        else 
            // Point will never be 2, 3, or 12. No need to check for point.
            result.value = "Point is " + pointKeeper.value + ". Roll again.";
    // If it's a first roll, set point. Otherwise check if point was made.
    } else if ((sum > 3 && sum < 7) || (sum > 7 && sum < 11))
        if (sum == pointKeeper.value) 
            youWin();
        else if (pointKeeper.value == 0) {
            pointKeeper.value = sum;
            result.value = "Point is " + pointKeeper.value + ". Roll again.";
        }
        else
            result.value = "Point is " + pointKeeper.value + ". Roll again.";
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
            // Roll again if not first roll.
            result.value = "Point is " + pointKeeper.value + ". Roll again."; 
    } // end calculate_score

function youLose() {
    // Update balance textbox and heading.
    balance.value = Number(balance.value) - Number(bet.value);
    balHeader.innerHTML = "Balance: " + numToCurrency(balance.value);
    // Convert bottom image and background color to loser status.
    document.getElementById("box").style.backgroundColor = "#f60f09";
    document.getElementById("craps").src = "img/Loser.png";
    // Display "You lose."
    result.value = "You lose " + numToCurrency(bet.value) +  ".  Bet again.";
    // Reset bet value - forces player to enter new bet to play again which
    // results in switching back to original bottom image and color.
    bet.value = "";
}

function youWin() {
    // Update balance textbox and heading.
    balance.value = Number(balance.value) + Number(bet.value);
    balHeader.innerHTML = "Balance: " + numToCurrency(balance.value);
    // Convert bottom image and background color to winner status.
    document.getElementById("box").style.backgroundColor = "#79f609";
    document.getElementById("craps").src = "img/Money.png";
    // Display "You win!."
    result.value = "You win " + numToCurrency(bet.value) +  "!  Bet again.";
    // Reset bet value - forces player to enter new bet to play again which
    // results in switching back to original bottom image and color.
    bet.value = "";
}

function numToCurrency(price) {
    // Format the price to USD currency, using the locale.
    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    return dollarUS.format(price);
}
