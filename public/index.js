"use strict";
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Winning Pattern Array
let winningPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
//Player 'X' plays first
let xTurn = true;
let count = 0;
//Disable All Buttons 
const popupMsg = () => {
    //enable popup
    popupRef.classList.remove("hide");
};
//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
    for (let i = 0; i < btnRef.length; i++) {
        btnRef[i].textContent = "";
    }
    //disable popup
    popupRef.classList.add("hide");
};
//new game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
//This function is executed when a player wins
const winFunction = (symbol) => {
    popupMsg();
    if (symbol == "X") {
        onWin("x-score");
        msgRef.innerHTML = "&#x1F389; <br> Player X is won!";
    }
    else {
        onWin("o-score");
        msgRef.innerHTML = "&#x1F389; <br> Player O is won!";
    }
};
//Function for draw
const drawFunction = () => {
    popupMsg();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw!";
};
//Win logic
const winChecker = () => {
    //Loop through all win patterns
    for (let i of winningPattern) {
        //Check if elements are filled
        //If 3 empty elements are same and would give win as would
        if ((btnRef[i[0]].textContent != "") && (btnRef[i[1]].textContent != "") && (btnRef[i[2]].textContent != "")) {
            if (btnRef[i[0]].textContent == btnRef[i[1]].textContent && btnRef[i[1]].textContent == btnRef[i[2]].textContent) {
                //If all 3 buttons have same values then pass the value to winFunction
                winFunction(btnRef[i[0]].textContent);
            }
        }
    }
};
//Display X/O on click
for (let i = 0; i < btnRef.length; i++) {
    btnRef[i].addEventListener("click", () => {
        let element = btnRef[i];
        //If the cell is not empty, you cannot change the symbol
        if (element.textContent != "") {
            return;
        }
        if (xTurn) {
            xTurn = false;
            //Display X
            element.textContent = "X";
        }
        else {
            xTurn = true;
            //Display O
            element.textContent = "O";
        }
        //Increment count on each click
        count += 1;
        if (count == 9) {
            //It's a draw since there are a total of 9 boxes
            drawFunction();
        }
        //Check for win on every click
        winChecker();
    });
}
//Count the score
function onWin(tag) {
    let score = document.querySelector("#" + tag);
    let value = parseInt(score.textContent) + 1;
    score.textContent = value + "";
}
