//Copyright 2017 Ryhm13

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

// **** GLOBAALSED MUUTUJAD ****

// kalkulaatori maatriksi mõõdu muutujad
var mFirstX, mFirstY, mSecondX, mSecondY;
// maatriksite sisendite muutujad
var mistakeA = false;
var mistakeB = false;
// sisestuse muutujad
var timer;
// ||||| ----- ----- ----- ----- MAATRIKSITE KALKULAATORI OSA ----- ----- ----- ----- |||||

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****

//123
function generateMatrix() {
    mistakeA = false;
    mistakeB = false;

    document.getElementById("mistakeNotification").style.display = "none";

    mFirstX = parseInt(document.getElementById("mFirstX").value);
    mFirstY = parseInt(document.getElementById("mFirstY").value);
    mSecondX = parseInt(document.getElementById("mSecondX").value);
    mSecondY = parseInt(document.getElementById("mSecondY").value);

    var mFirst = document.getElementById("matrixFirst");
    var mSecond = document.getElementById("matrixSecond");
    var mA = document.getElementById("matrixAnswer");
    var mFA = document.getElementById("matrixFinalAnswer");

    if (mFirstY === mSecondX) {
        if (mFirst && mSecond && mA && mFA) {
            mFirst.innerHTML = "";
            mSecond.innerHTML = "";
            mA.innerHTML = "";
            mFA.innerHTML = "";

            createMatrix();
        } else {
            createMatrix();
        }
    } else {
        alert("Ei saa genereerida, muuda maatriksite suuruseid!");
    }
}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE MAATRIKSI ****
function createMatrix() {
    //VIIDE: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
    var matrixFirstContainer = document.getElementById("matrixFirstContainer");
    var matrixFirst = document.getElementById("matrixFirst");
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < mFirstX; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < mFirstY; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var cell = document.createElement("input");
            cell.setAttribute("id", "a" + rowId + colId);
            cell.setAttribute("type", "text");
            cell.setAttribute("onkeypress", "validate(event)");
            cell.setAttribute("oninput", "checkInputSequence()");
            cell.setAttribute("maxlength", "10");
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    matrixFirst.appendChild(tableBody);

    var matrixSecondContainer = document.getElementById("matrixSecondContainer");
    var matrixSecond = document.getElementById("matrixSecond");
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < mSecondX; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < mSecondY; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var cell = document.createElement("input");
            cell.setAttribute("id", "b" + rowId + colId);
            cell.setAttribute("type", "text");
            cell.setAttribute("onkeypress", "validate(event)");
            cell.setAttribute("oninput", "checkInputSequence()");
            cell.setAttribute("maxlength", "10");
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    matrixSecond.appendChild(tableBody);
}

function generateMatrixFirstSecond() {
    document.getElementById("highlight").style.display = "inline";
    document.getElementById("math").style.display = "none";
    document.getElementById("highlighterText").style.display = "none";

    document.getElementById("highlight").style.display = "inline";
    generateMatrix();
    matrixFirstValues();
    matrixSecondValues();
    calculateMatrixSum();
    calculateMatrixFinalSum();
    createValues();
}

function generateValues() {
    matrixFirstValues();
    matrixSecondValues();
    calculateMatrixSum();
    calculateMatrixFinalSum();
    createValues();

}

// **** FUNKTSIOON, MIS GENEREERIB TEISE MAATRIKSI ****


function createValues() {
    var mathDiv = document.getElementById('math');
    var displayDiv = document.getElementById('display');

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
    MathJax.Hub.Queue(function() {
        var math = MathJax.Hub.getAllJax("MathDiv")[0];
        var i = matrixFirstValues();
        var j = matrixSecondValues();
        var k = calculateMatrixSum();
        var l = calculateMatrixFinalSum();

        MathJax.Hub.Queue(["Text", math, "\\begin{bmatrix}" + i + "\\end{bmatrix} \\times \\begin{bmatrix}" + j + "\\end{bmatrix} = \\begin{bmatrix}" + k + "\\end{bmatrix} = \\begin{bmatrix}" + l + "\\end{bmatrix}"]);
        MathJax.Hub.Queue(function() {
            displayDiv.innerHTML = mathDiv.innerHTML;
        });
    });
};



//Loendab esimeses maatriksis olevad arvud kokku, ning viib mathJax kujule
function matrixFirstValues() {
    var answerString = "";
    var table = document.getElementById('matrixFirst');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        if (r >= 1) {

            var strLength = answerString.length;
            answerString = (answerString.slice(0, strLength - 1));
            answerString += "\\\\";
        }
        for (var c = 0; c < mFirstY; c++) {
            var rowId = r + 1;
            var colId = c + 1;
            var Cell = document.getElementById("a" + rowId + colId).value;
            var str = Cell;
            var pos = str.indexOf("/");
            var minuspos = Cell.indexOf("-");
            if (Cell.charAt(minuspos) === "-" && Cell.charAt(pos) === "/") {
                var str2 = str.replace("-", "");
                var start = str2.slice(0, pos - 1);
                start = "\\frac {" + start + "}";
                var end = Cell;
                var afterSlash = str.substr(str.indexOf("/") + 1);
                end = "{" + afterSlash + "}";
                var fractionbracketstart = "(-";
                var fractionbracketend = ")" + "&";
                var fractionbracket = fractionbracketstart + start + end + fractionbracketend;
                answerString += fractionbracket;
            } else if (Cell.charAt(pos) === "/") {
                var stringLength = Cell.length;
                var String1 = Cell;
                var start = str.slice(0, pos);
                start = "\\frac {" + start + "}";
                var end = Cell;
                var afterSlash = str.substr(str.indexOf("/") + 1);
                end = "{" + afterSlash + "}&";
                Cell = start + end;
                answerString += Cell;
            } else if (Cell.charAt(0) === "-") {
                Cell = "(" + Cell + ")" + "&";
                answerString += Cell;
            } else {
                var Cell = document.getElementById("a" + rowId + colId).value + "&";
                answerString += Cell;
            }




        }
    }
    var strLength = answerString.length;
    answerString = (answerString.slice(0, strLength - 1));
    return answerString;
}

//Viib teises maatriksis olevad arvud MatJax kujule
function matrixSecondValues() {
    var answerString = "";
    var table = document.getElementById('matrixSecond');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        if (r >= 1) {
            var strLength = answerString.length;
            answerString = (answerString.slice(0, strLength - 1));
            answerString += "\\\\";
        };

        for (var c = 0; c < mSecondY; c++) {
            var rowId = r + 1;
            var colId = c + 1;
            var Cell = document.getElementById("b" + rowId + colId).value;
            var str = Cell;
            var pos = str.indexOf("/");
            var minuspos = str.indexOf("-");
            if (Cell.charAt(minuspos) === "-" && Cell.charAt(pos) === "/") {
                var str2 = str.replace("-", "");
                var start = str2.slice(0, pos - 1);
                start = "\\frac {" + start + "}";
                var end = Cell;
                var afterSlash = str.substr(str.indexOf("/") + 1);
                end = "{" + afterSlash + "}";
                var fractionbracketstart = "(-";
                var fractionbracketend = ")" + "&";
                var fractionbracket = fractionbracketstart + start + end + fractionbracketend;
                answerString += fractionbracket;
            } else if (Cell.charAt(pos) === "/") {
                var stringLength = Cell.length;
                var String1 = Cell;
                var start = str.slice(0, pos);
                start = "\\frac {" + start + "}";
                var end = Cell;
                var afterSlash = str.substr(str.indexOf("/") + 1);
                end = "{" + afterSlash + "}&";
                Cell = start + end;
                minuspos = Cell.indexOf("-");
                answerString += Cell;
            } else if (Cell.charAt(0) === "-") {
                Cell = "(" + Cell + ")" + "&";
                answerString += Cell;
            } else {
                var Cell = document.getElementById("b" + rowId + colId).value + "&";
                answerString += Cell;
            }




        }
    }
    var strLength = answerString.length;
    answerString = (answerString.slice(0, strLength - 1));
    return answerString;
}

// **** KÄIVITAB ARVUTAMISE ****

//sama mis eelmine, aga peidab eelmise lahenduse ja  nupud
function calculateNextMatrix() {
    calculateMatrixSum();
    calculateMatrixFinalSum();
    createMatrixThird();

    document.getElementById("matrixAnswerContainer").style.display = "none"
    document.getElementById("matrixFinalAnswerContainer").style.display = "none";
    document.getElementById("matrixFirstContainer").style.display = "none";
    document.getElementById("matrixSecondContainer").style.display = "none";
    document.getElementById("checkAnswer").style.display = "none";
    document.getElementById("calculateNext").style.display = "none";
}

// **** GENEREERIB VAHETULEMUSE ****
function calculateMatrixSum() {

    var c = 1;
    var finalString = "";

    for (var x = 1; x <= mFirstX; x++) {
        if (x >= 2) {
            var strLength = finalString.length;
            finalString = (finalString.slice(0, strLength - 3));
            finalString += "\\\\";
        };

        for (var y = 1; y <= mSecondY; y++) {

            if (y >= 2) {
                var strLength = finalString.length;
                finalString = finalString.slice(0, strLength - 3);
                finalString += "&~~~~";
            };
            var matrixAnswerString = "";

            for (var i = 0; i < mFirstY; i++) {


                var a = document.getElementById("a" + x + c).value;
                var str = a;
                var pos = str.indexOf("/");
                var minuspos = str.indexOf("-");
                if (a.charAt(minuspos) === "-" && a.charAt(pos) === "/") {
                    var str2 = str.replace("-", "");
                    var a = str2.slice(0, pos - 1);
                    start = "\\frac {" + a + "}";
                    var end;
                    var afterSlash = str.substr(str.indexOf("/") + 1);
                    end = "{" + afterSlash + "}";
                    var fractionbracketstart = "(-";
                    var fractionbracketend = ")";
                    var fractionbracket = fractionbracketstart + start + end + fractionbracketend;
                    a = a.replace("/", "");
                    a = fractionbracket;

                }
                if (a.charAt(pos) === "/") {
                    start = str.slice(0, pos);
                    start = "\\frac {" + start + "}";
                    var end;
                    var afterSlash = str.substr(str.indexOf("/") + 1);
                    end = "{" + afterSlash + "}";
                    a = start + end;
                    a = a.replace("/", "");
                }

                if (a.charAt(0) === "-") {
                    a = "(" + a + ")";
                    a = a;
                }
                var b = document.getElementById("b" + c + y).value;
                var str = b;
                var pos1 = str.indexOf("/");
                var minuspos = str.indexOf("-");
                if (b.charAt(minuspos) === "-" && b.charAt(pos1) === "/") {
                    var str2 = str.replace("-", "");
                    typeof str2;
                    var sliceString = str2.slice(0, pos1 - 1);
                    b = sliceString;
                    start = "\\frac {" + b + "}";
                    var end;
                    var afterSlash = str.substr(str.indexOf("/") + 1);
                    end = "{" + afterSlash + "}";
                    var fractionbracketstart = "(-";
                    var fractionbracketend = ")";
                    var fractionbracket = fractionbracketstart + start + end + fractionbracketend;
                    fractionbracket = fractionbracket.replace("/", "");
                    b = fractionbracket;
                }
                if (b.charAt(pos1) === "/") {
                    var start = str.slice(0, pos1);
                    start = "\\frac {" + start + "}";
                    var end;
                    var afterSlash = str.substr(str.indexOf("/") + 1);
                    end = "{" + afterSlash + "}";
                    b = start + end;
                    b = b.replace("/", "");
                }
                if (b.charAt(0) === "-") {
                    b = "(" + b + ")";
                    b = b;
                }
                matrixAnswerString += a + "*" + b + " + ";


                c++;
            }
            finalString += matrixAnswerString;


            c = 1;


        }
    }
    var strLength = finalString.length;
    finalString = finalString.slice(0, strLength - 3);

    return finalString;
}


// **** ARVUTAB MAATRIKSI VÄÄRTUSE ****
function calculateMatrixFinalSum() {

    var c = 1;
    var finalString = "";

    for (var x = 1; x <= mFirstX; x++) {
        if (x >= 2) {
            var strLength = finalString.length;

            finalString += "\\\\";
        };

        for (var y = 1; y <= mSecondY; y++) {

            if (y >= 2) {
                var strLength = finalString.length;

                finalString += "&";
            };

            var matrixAnswerString = "";

            for (var i = 0; i < mFirstY; i++) {

                var a = document.getElementById("a" + x + c).value;

                var b = document.getElementById("b" + c + y).value;
                (b);
                matrixAnswerString += a + "*" + b + " + ";
                c++;
            }

            var strLength = matrixAnswerString.length;
            matrixAnswer.value = math.eval(matrixAnswerString.slice(0, strLength - 3));
            var a = matrixAnswer.value;
            var abc = math.fraction(a);
            abc = math.fraction({
                n: abc.n,
                d: abc.d
            });
            var num = a;
            var n = num.toString();
            var pos = n.indexOf("-");

            if (abc.d === 1 && n.charAt(pos) !== "-") {
                finalString += abc.n;
            }
            if (abc.d === 1 && n.charAt(pos) === "-") {
                abc.n = "-" + abc.n;
                finalString += abc.n;
            }
            if (n.charAt(pos) === "-" && abc.d !== 1) {
                reduction = reduce(abc.n, abc.d);
                start = "\\frac {" + abc.n + "}";
                var end = "{" + abc.d + "}"
                var fractionbracketstart = "(-";
                var fractionbracketend = ")";
                var fractionbracket = fractionbracketstart + start + end + fractionbracketend;
                finalString += fractionbracket;
            } else if (abc.d !== 1) {
                reduction = reduce(abc.n, abc.d);
                var numerator = "\\frac {" + abc.n + "}";
                var denominator = "{" + abc.d + "}";
                answerString = numerator + denominator;
                finalString += answerString;
            }

            c = 1;
        }

    }

    var strLength = finalString.length;


    return finalString;
}

//Timer
$(document).ready(function() {
    $(".input").on("input", function() {

        window.clearTimeout(timer);
        timer = window.setTimeout(function() {
            generateValues();
        }, 500);
    });
});

function reduce(numerator, denominator) {
    var gcd = function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
}

function checkInputSequence() {
    checkA: for (var i = 0; i < mFirstX; i++) {
        for (var j = 0; j < mFirstY; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var numberA = document.getElementById("a" + rowId + colId).value;
            if (numberA == "") {
                var inputColorA = document.getElementById("a" + rowId + colId);
                inputColorA.style.backgroundColor = "";
                mistakeA = false;
                break checkA;
            } else {
                var regexA = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var foundA = regexA.test(numberA);
                if (foundA === false) {
                    var inputColorA = document.getElementById("a" + rowId + colId);
                    inputColorA.style.backgroundColor = "red";
                    mistakeA = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                } else {
                    var inputColorA = document.getElementById("a" + rowId + colId);
                    inputColorA.style.backgroundColor = "";
                    mistakeA = true;
                    document.getElementById("mistakeNotification").style.display = "none";
                }
            }
        }
    }

        checkB: for (var i = 0; i < mSecondX; i++) {
        for (var j = 0; j < mSecondY; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var numberB = document.getElementById("b" + rowId + colId).value;
            if (numberB == "") {
                mistakeB = false;
                var inputColorB = document.getElementById("b" + rowId + colId);
                inputColorB.style.backgroundColor = "";
                break checkB;
            } else {
                var regexB = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var foundB = regexB.test(numberB);
                if (foundB === false) {
                    var inputColorB = document.getElementById("b" + rowId + colId);
                    inputColorB.style.backgroundColor = "red";
                    mistakeB = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                } else {
                    var inputColorB = document.getElementById("b" + rowId + colId);
                    inputColorB.style.backgroundColor = "";
                    mistakeB = true;
                    document.getElementById("mistakeNotification").style.display = "none";
                }
            }
        }
    }

        if (mistakeB === true && mistakeA === true) {
        document.getElementById("mistakeNotification").style.display = "none";
        document.getElementById("math").style.display = "block";
    }
}


// **** LASEB SISESTADA AINULT NUMBREID JA ÜHE KALDKRIIPSU, ET SAAKS SISESTADA MURDE ****
function validate(evt) {
    key = evt.key;
    var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"];
    if (allowed.indexOf(evt.key) == -1) {
        evt.preventDefault();
    }
    // PRAEGUNE
    if (evt.key === "/" && evt.target.value.indexOf('/') != -1) {
        evt.preventDefault();
    }
}


var matrixFirstArray = [
    [null]
];
var matrixSecondArray = [
    [null]
];
var matrixPreAnswerArray = [
    [null]
];

function highlighter() {
    document.getElementById("highlighterText").style.display = "inline";
    matrixFirstArray = [
        [null]
    ];
    matrixSecondArray = [
        [null]
    ];
    matrixPreAnswerArray = [
        [null]
    ];

    var tableCells = document.getElementsByClassName("mjx-mtd");
    var answerStartpoint = mFirstX * mFirstY + mSecondX * mSecondY;
    var matrixPreAnswerSize = mFirstX * mSecondY;
    var matrixFirstColumn = mFirstX;
    var matrixSecondColumn = mSecondX;

    var rowStartpoint = 0;
    var matrixRow = [null];

    // esimene maatriks
    for (var i = 0; i < matrixFirstColumn; i++) {
        for (var j = 0; j < mFirstY; j++) {
            matrixRow.push(rowStartpoint);
            rowStartpoint++;
        }
        matrixFirstArray.push(matrixRow);
        matrixRow = [null];
    }

    // teine maatriks
    for (var i = 0; i < matrixSecondColumn; i++) {
        for (var j = 0; j < mSecondY; j++) {
            matrixRow.push(rowStartpoint);
            rowStartpoint++;
        }
        matrixSecondArray.push(matrixRow);
        matrixRow = [null];
    }

    // vahevastuste maatriks
    for (var i = 0; i < matrixFirstColumn; i++) {
        for (var j = 0; j < mSecondY; j++) {
            matrixRow.push(rowStartpoint);
            rowStartpoint++;
        }
        matrixPreAnswerArray.push(matrixRow);
        matrixRow = [null];
    }

    var c = 1;
    for (var x = 1; x <= mFirstX; x++) {
        for (var y = 1; y <= mSecondY; y++) {
            for (var i = 0; i < mFirstY; i++) {
                (function() {
                        var aID = matrixFirstArray[x][c];
                        var bID = matrixSecondArray[c][y];
                        var cID = matrixPreAnswerArray[x][y];

                        highlight(aID, bID, cID);
                        c++;
                    }
                    ());
            }
            c = 1;
        }
    }
}

function highlight(aID, bID, cID) {

    var tableCells = document.getElementsByClassName("mjx-mtd");

    tableCells[cID].addEventListener("mouseover", function() {
        tableCells[aID].style.color = "#f2cc10";
        tableCells[bID].style.color = "#f2cc10";
    });

    tableCells[cID].addEventListener("mouseleave", function() {
        tableCells[aID].style.color = "#666666";
        tableCells[bID].style.color = "#666666";
    });

}

//PÄRAST KINDLASTI VÄLJA KOMENTEERIDA
//täidab testimiseks väljad
document.addEventListener("keypress", function(e) {
    if (e.key === "f") {
        fill()
    }
})

function fill() {
    mistakeA = true;
    mistakeB = true;
    document.querySelectorAll("tr > *").forEach(function(element) {
        element.value = Math.floor(Math.random() * 300)
    })
}
