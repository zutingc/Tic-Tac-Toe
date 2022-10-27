$("input:checkbox").on('click', function () {
    var $box = $(this);
    if ($box.is(":checked")) {
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", true);
    }
});

function newGame() {
    document.getElementById("toggleOptions").style.display = "inline";
    document.getElementById("toggleBoard").style.display = "none";
}
newGame();

function generateGame() {
    document.getElementById("toggleOptions").style.display = "none";
    document.getElementById("toggleBoard").style.display = "";

    // difficulty = document.querySelectorAll('input[name=difficulty]:checked');
    // playerMove = document.querySelectorAll('input[name=move]:checked');
    var difficulties = document.getElementsByName('difficulty');
    for (var i = 0; i < difficulties.length; i++) {
        if (difficulties[i].checked) {
            difficulty = difficulties[i].value;
        }
    }
    var move = document.getElementsByName('move');
    for (var i = 0; i < move.length; i++) {
        if (move[i].checked) {
            playerMove = move[i].value;
        }
    }

    if (turn == 0 && difficulty != 0 && playerMove != currentClass[3]) {
        setTimeout(function () {
            console.log("hello!! I should be working");
            pickMachine();
        }, 200);
    }
    
}