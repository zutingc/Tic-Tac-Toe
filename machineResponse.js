var difficulty; // 0, 1, 2
var playerMove; // O, X

function pickMachine() {
    if (difficulty != 0) {
        machine1Turn(); // currently no implementation for 2
    }
}

function emptyValues() {
    var valHolder = [];
    var valCount = 0;
    for (const [key, value] of Object.entries(dict)) {
        // console.log(key, value);
        if (value == "") {
            valHolder[valCount] = key;
            valCount++;
        }
    }
    return valHolder;
}

function machine1Turn() {
    var emptyVal = emptyValues(); // get array of empty array of values
    var emptyLength = emptyVal.length;
    // generate random number from 0-array.length-1 -- this will pick the row & col
    var randomKey = Math.floor(Math.random() * (emptyLength));
    // machine will set clicked var randomly
    clicked = emptyVal[randomKey];
    console.log(randomKey);
    console.log("clicked?: " + clicked);
    console.log(emptyVal);
    document.getElementById(clicked).classList.add('active');
    document.getElementById(clicked).style.opacity = "1";
    addPiece();
}