const filler = '<svg class="filler" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>';
const XSymbol = '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>';
const OSymbol = '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>';
var current;
var currentClass;
var clicked;
var won = false;
var turn = 0;
var dict = {
    a1: "",
    a2: "",
    a3: "",
    b1: "",
    b2: "",
    b3: "",
    c1: "",
    c2: "",
    c3: "",
};
var letters = ["a", "b", "c"];

let elementsArray = document.querySelectorAll(".ticTacToeBox");

function setCurrent() {
    if (turn % 2 == 0) {
        current = OSymbol;
        currentClass = "BtnO";
    } else {
        current = XSymbol;
        currentClass = "BtnX";
    }
    // change display of unclicked buttons to current
    elementsArray.forEach(function (elem) {
        if (!elem.classList.contains('active')) {
            elem.innerHTML = current;
        }
    });
}
setCurrent(); // start

function checkWin() {
    var hori = 0;
    var vert = 0;
    var diag1 = 0;
    var diag2 = 0;
    var letter = clicked[0];
    var num = clicked[1];
    // check horizontal + vertical
    for (let i = 0; i < 3; i++) {
        // horizontal
        var horiCheck = letter + (i + 1);
        if (dict[horiCheck] == currentClass) {
            hori += 1;
        }
        // vertical
        var vertCheck = letters[i] + num;
        if (dict[vertCheck] == currentClass) {
            vert += 1;
        }
        // diagonal 1
        if (clicked != a2 && clicked != b1 && clicked != b3 && clicked != c1) {
            var diagCheck1 = letters[i] + (i + 1);
            if (dict[diagCheck1] == currentClass) {
                diag1 += 1;
            }
            // diagonal 2
            var diagCheck2 = letters[i] + (3 - i);
            if (dict[diagCheck2] == currentClass) {
                diag2 += 1;
            }
            // console.log(diagCheck1 + " --- " + diagCheck2);
        }
    }
    // console.log("-------")
    if (hori == 3 || vert == 3 || diag1 == 3 || diag2 == 3) {
        won = true;
        setTimeout(function () {
            console.log("We have a winner!");
            won = true;
            turn++;
            setCurrent();
            alert("Congrats to " + currentClass[3] + " for winning this match!");
            // update win count
            var numWins = parseInt(document.getElementById(currentClass[3] + "Wins").innerHTML);
            document.getElementById(currentClass[3] + "Wins").innerHTML = numWins + 1;
            resetBoard();
        }, 200);
    }
}

function addPiece() {
    dict[clicked] = currentClass; // change class in dictionary
    checkWin();
    document.getElementById(clicked).innerHTML = current;
    document.getElementById(clicked).classList.add(currentClass);
    turn++;
    if (emptyValues()[0] == undefined && won == false) {
        alert("The game tied.");
        resetBoard();
    }
    setCurrent();
    if (difficulty != 0 && playerMove != currentClass[3] && emptyValues()[0] != undefined && won == false) {
        pickMachine();
    }
}

function resetBoard() {
    console.log(turn);
    setTimeout(function () {
        dict = {
            a1: "",
            a2: "",
            a3: "",
            b1: "",
            b2: "",
            b3: "",
            c1: "",
            c2: "",
            c3: "",
        };
        turn = 0;
        won = false;
        elementsArray.forEach(function (elem) {
            elem.style.opacity = "0";
            elem.classList.remove("active");
            elem.classList.remove("BtnX");
            elem.classList.remove("BtnO");
        });
        setCurrent();
        // start new game
        newGame();
    }, 200);

}

// add event listener for TicTacToeBox
elementsArray.forEach(function (elem) {
    elem.style.opacity = "0";
    elem.addEventListener('click', function (event) {
        if (!elem.classList.contains('active')) {
            if (playerMove == currentClass[3] || difficulty == 0) {
                elem.classList.add('active');
                clicked = elem.id;
                addPiece();
            }
        }
    });
    elem.addEventListener('mouseover', function (event) {
        if (!elem.classList.contains('active')) {
            elem.style.opacity = "1";
        }
    });
    elem.addEventListener('mouseout', function (event) {
        if (!elem.classList.contains('active')) {
            elem.style.opacity = "0";
        }
    });
});