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
            //creatematrixSecond();
            //calculateMatrixSum();
           // calculateMatrixFinalSum();
        } else {
            createMatrix();
            //creatematrixSecond();
           // calculateMatrixSum();
            //calculateMatrixFinalSum();
        }
    } else {
        console.log("Ei saa arvutada");
        alert("Ei saa genereerida, muuda maatriksite suuruseid!");
    }
}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE MAATRIKSI ****
function createMatrix() {

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

	generateMatrix();
	matrixFirstValues();
	matrixSecondValues();
	calculateMatrixSum();
	calculateMatrixFinalSum();
	console.log('siin');
	createValues();
}

function generateValues() {
	matrixFirstValues();
	matrixSecondValues();
	calculateMatrixSum();
	calculateMatrixFinalSum();
	console.log('siin');
	createValues();
	
}

// **** FUNKTSIOON, MIS GENEREERIB TEISE MAATRIKSI ****
/*function creatematrixSecond() {

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
			cell.setAttribute("onblur", "checkInputSequenceB()");
			//cell.setAttribute("onkeypress", "return validate(this, event)");//<--TÖÖTAB
			cell.setAttribute("maxlength", "10");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	matrixSecond.appendChild(tableBody);

}*/

function createValues() {
	var mathDiv = document.getElementById('math');
	var displayDiv = document.getElementById('display');

	MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
	MathJax.Hub.Queue(function () {
		var math = MathJax.Hub.getAllJax("MathDiv")[0];
		var i = matrixFirstValues();
		var j = matrixSecondValues();
		var k = calculateMatrixSum();
		var l = calculateMatrixFinalSum();
		console.log(l);

		MathJax.Hub.Queue(["Text", math, "\\begin{bmatrix}" + i + "\\end{bmatrix} \\times \\begin{bmatrix}" + j + "\\end{bmatrix} = \\begin{bmatrix}" + k + "\\end{bmatrix} = \\begin{bmatrix}" + l + "\\end{bmatrix}"]);
		MathJax.Hub.Queue(function () {
			displayDiv.innerHTML = mathDiv.innerHTML;
		});
	});
};

/*
function createMatrixThird() {
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
        //\\begin{bmatrix} {"+i+"}&{"+j+"}&0\\\\0&{"+i+"}&{"+j+"}\\\\{"+j+"}&0&{"+i+"}\\\end{bmatrix}
        MathJax.Hub.Queue(function() {
            displayDiv.innerHTML = mathDiv.innerHTML;
        });
    });
}
*/

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
            if (Cell.charAt(pos) === "/") {
                var stringLength = Cell.length;
                var String1 = Cell;
                var start = str.slice(0, pos);
                start = "\\frac {" + start + "}";
                var end = Cell;
                var afterSlash = str.substr(str.indexOf("/") + 1);
                end = "{" + afterSlash + "}&";
                Cell = start + end;
                answerString += Cell;
            } else {
                var Cell = document.getElementById("a" + rowId + colId).value + "&";
                answerString += Cell;
            }
        }
    }
    var strLength = answerString.length;
    answerString = (answerString.slice(0, strLength - 1));
    console.log(answerString);
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
            if (Cell.charAt(pos) === "/") {
                var stringLength = Cell.length;
                var String1 = Cell;
                var start = str.slice(0, pos);
                start = "\\frac {" + start + "}";
                var end = Cell;
                var afterSlash = str.substr(str.indexOf("/") + 1);
                end = "{" + afterSlash + "}&";
                Cell = start + end;
                console.log("Cell");
                console.log(Cell);
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
function calculateMatrix() {
    if (mistakeA === false || mistakeB === false) {
        document.getElementById("mistakeNotification").style.display = "inline";
        //document.getElementById("mistakeNotification").innerHTML = "Kõik lahtrid ei ole korralikult täidetud";
        console.log("calculateMatrix IF mistakeA: " + mistakeA);
        console.log("calculateMatrix IF mistakeB: " + mistakeB);
    } else {
        calculateMatrixSum();
        calculateMatrixFinalSum();
        createMatrixThird();

        document.getElementById("matrixAnswerContainer").style.display = "none"
        document.getElementById("matrixFinalAnswerContainer").style.display = "none";
        //document.getElementById("checkAnswer").style.display = "none";
    }
}
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
                finalString += "&";
            };
            var matrixAnswerString = "";

            for (var i = 0; i < mFirstY; i++) {

                var a = document.getElementById("a" + x + c).value;
                var str = a;
                var pos = str.indexOf("/");
                if (a.charAt(pos) === "/") {
                    var stringLength = a.length;
                    var String1 = a;
                    var start = str.slice(0, pos);
                    start = "\\frac {" + start + "}";
                    var end = a;
                    var afterSlash = str.substr(str.indexOf("/") + 1);
                    end = "{" + afterSlash + "}";
                    a = start + end;
                }
                var b = document.getElementById("b" + c + y).value;
                var str = b;
                var pos1 = str.indexOf("/");
                if (b.charAt(pos1) === "/") {
                    var stringLength = b.length;
                    var String1 = b;
                    var start = str.slice(0, pos1);
                    start = "\\frac {" + start + "}";
                    var end = b;
                    var afterSlash = str.substr(str.indexOf("/") + 1);
                    end = "{" + afterSlash + "}";
                    b = start + end;
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
                if (!a) {
					a = 0;
				}
				if (!b) {
					b = 0;
				}
                matrixAnswerString += a + "*" + b + " + ";
                c++;
            }

            var strLength = matrixAnswerString.length;
            matrixAnswer.value = math.eval(matrixAnswerString.slice(0, strLength - 3));
            var a = matrixAnswer.value;
            var abc = math.fraction(a);
            abc = math.fraction({ n: abc.n, d: abc.d });
            if (abc.d === 1) {
                finalString += abc.n;
            } else {
                var reduction = reduce(abc.n, abc.d);
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
$(document).ready(function () {
	$(".input").on("input", function () {

		window.clearTimeout(timer);
		timer = window.setTimeout(function () {
			generateValues();
		}, 500);
		console.log("midagi toimub");
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
            //console.log(numberA);
            if (numberA == "") {
                console.log("Kast A on tühi");
                var inputColorA = document.getElementById("a" + rowId + colId);
                inputColorA.style.backgroundColor = "";
                mistakeA = false;
                break checkA;
            } else {
                var regexA = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var foundA = regexA.test(numberA);
                console.log("Kast A: " + foundA);
                if (foundA === false) {
                    var inputColorA = document.getElementById("a" + rowId + colId);
                    inputColorA.style.backgroundColor = "red";
                    mistakeA = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                    //document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
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
			console.log(numberB);
			if (numberB == "") {
				console.log("Kast B on tühi");
				mistakeB = false;
				console.log("checkInputSequenceB Tühi kast: " + mistakeB);
				var inputColorB = document.getElementById("b" + rowId + colId);
				inputColorB.style.backgroundColor = "";
				break checkB;
			} else {
				var regexB = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
				var foundB = regexB.test(numberB);
				console.log("Kast B: " + foundB);
				if (foundB === false) {
					var inputColorB = document.getElementById("b" + rowId + colId);
					inputColorB.style.backgroundColor = "red";
					mistakeB = false;
					document.getElementById("mistakeNotification").style.display = "inline";
					//document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
				} else {
					var inputColorB = document.getElementById("b" + rowId + colId);
					inputColorB.style.backgroundColor = "";
					mistakeB = true;
					document.getElementById("mistakeNotification").style.display = "none";
				}
			}
		}
	}

	console.log("Lõpus mistakeB: " + mistakeB);
    console.log("Lõpus mistakeA: " + mistakeA);
    if (mistakeB === true && mistakeA === true) {
        document.getElementById("mistakeNotification").style.display = "none";
    }
}

/*function checkInputSequenceB() {
    for (var i = 0; i < mSecondX; i++) {
        for (var j = 0; j < mSecondY; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var numberB = document.getElementById("b" + rowId + colId).value;
            console.log(numberB);
            if (numberB == "") {
                console.log("Kast B on tühi");
                var inputColorB = document.getElementById("b" + rowId + colId);
                inputColorB.style.backgroundColor = "";
                mistakeB = false;
            } else {
                var regexB = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var foundB = regexB.test(numberB);
                console.log("Kast B: " + foundB);
                if (foundB === false) {
                    var inputColorB = document.getElementById("b" + rowId + colId);
                    inputColorB.style.backgroundColor = "red";
                    mistakeB = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                    document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
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
        //console.log("Vigu ei ole");
        document.getElementById("mistakeNotification").style.display = "none";
    } else {
        //console.log("Vigu on")
    }
}

*/


// **** LASEB SISESTADA AINULT NUMBREID JA ÜHE KALDKRIIPSU, ET SAAKS SISESTADA MURDE ****
function validate(evt) {
    key = evt.key;
    var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"];
    if (allowed.indexOf(evt.key) == -1) {
        evt.preventDefault();
        console.log("EI LUBA");
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

    var tableCells = document.getElementsByClassName("mjx-mtd");
    var startpoint = tableCells.length / 2;
    var answerStartpoint = startpoint + mFirstX * mFirstY + mSecondX * mSecondY;
    var matrixPreAnswerSize = mFirstX * mSecondY;
    var matrixFirstColumn = mFirstX;
    var matrixSecondColumn = mSecondX;

    var rowStartpoint = startpoint;
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

    /*
	console.log("startpoint: " + startpoint);
    console.log("rowStartpoint: " + rowStartpoint);
    console.log("answerStartpoint: " + answerStartpoint);
    console.log(matrixFirstArray);
    console.log(matrixSecondArray);
    console.log(matrixPreAnswerArray);
     */

    var c = 1;
    for (var x = 1; x <= mFirstX; x++) {
        for (var y = 1; y <= mSecondY; y++) {
            for (var i = 0; i < mFirstY; i++) {
                (function() {
                        //console.log("1 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
                        //console.log("c: " + c + " , x: " + x + " , y: " + y);
                        var aID = matrixFirstArray[x][c];
                        //console.log("2 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
                        //console.log("c: " + c + " , x: " + x + " , y: " + y);
                        var bID = matrixSecondArray[c][y];
                        //console.log("3 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
                        //console.log("c: " + c + " , x: " + x + " , y: " + y);
                        var cID = matrixPreAnswerArray[x][y];

                        highlight(aID, bID, cID);
                        //console.log("4 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
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
        tableCells[aID].style.color = "black";
        tableCells[bID].style.color = "black";
    });

}

//PÄRAST KINDLASTI VÄLJA KOMENTEERIDA
//täidab testimiseks väljad
document.addEventListener("keypress", function(e) {
    if (e.key === "f") { fill() }
})

function fill() {
    mistakeA = true;
    mistakeB = true;
    document.querySelectorAll("tr > *").forEach(function(element) { element.value = Math.floor(Math.random() * 300) })
}