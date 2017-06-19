// **** GLOBAALSED MUUTUJAD ****

// kalkulaatori maatriksi mõõdu muutujad
var m1x, m1y, m2x, m2y;
// maatriksite sisendite muutujad
var mistakeA = false;
var mistakeB = false;
// ||||| ----- ----- ----- ----- MAATRIKSITE KALKULAATORI OSA ----- ----- ----- ----- |||||

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****

//123
function generateMatrix() {
    mistakeA = false;
    mistakeB = false;

    document.getElementById("mistakeNotification").style.display = "none";

    m1x = parseInt(document.getElementById("m1x").value);
    m1y = parseInt(document.getElementById("m1y").value);
    m2x = parseInt(document.getElementById("m2x").value);
    m2y = parseInt(document.getElementById("m2y").value);

    var m1 = document.getElementById("matrix1");
    var m2 = document.getElementById("matrix2");
    var mA = document.getElementById("matrixAnswer");
    var mFA = document.getElementById("matrixFinalAnswer");

    if (m1y === m2x) {
        if (m1 && m2 && mA && mFA) {
            m1.innerHTML = "";
            m2.innerHTML = "";
            mA.innerHTML = "";
            mFA.innerHTML = "";

            createMatrix();
            //createMatrix2();
            //calculateMatrixSum();
           // calculateMatrixFinalSum();
        } else {
            createMatrix();
            //createMatrix2();
           // calculateMatrixSum();
            //calculateMatrixFinalSum();
        }
    } else {
        //console.log("Ei saa arvutada");
        alert("Ei saa genereerida, muuda maatriksite suuruseid!");
    }
}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE MAATRIKSI ****
function createMatrix() {

    var matrix1Container = document.getElementById("matrix1Container");
    var matrix1 = document.getElementById("matrix1");
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < m1x; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < m1y; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var cell = document.createElement("input");
            cell.setAttribute("id", "a" + rowId + colId);
            cell.setAttribute("type", "text");
            cell.setAttribute("onkeypress", "validate(event)");
            cell.setAttribute("onblur", "checkInputSequence()");
            cell.setAttribute("maxlength", "10");
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    matrix1.appendChild(tableBody);

    var matrix2Container = document.getElementById("matrix2Container");
    var matrix2 = document.getElementById("matrix2");
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < m2x; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < m2y; j++) {
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
    matrix2.appendChild(tableBody);
}

function generateMatrix12() {

	generateMatrix();
	matrix1Values();
	matrix2Values();
	calculateMatrixSum();
	calculateMatrixFinalSum();
	//console.log('siin');
	createValues();
}

function generateValues() {
	matrix1Values();
	matrix2Values();
	calculateMatrixSum();
	calculateMatrixFinalSum();
	//console.log('siin');
	createValues();
	
}
// **** FUNKTSIOON, MIS GENEREERIB TEISE MAATRIKSI ****
/*function createMatrix2() {

	var matrix2Container = document.getElementById("matrix2Container");

	var matrix2 = document.getElementById("matrix2");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < m2x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < m2y; j++) {
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
	matrix2.appendChild(tableBody);

}*/

function createValues() {
	var mathDiv = document.getElementById('math');
	var displayDiv = document.getElementById('display');

	MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
	MathJax.Hub.Queue(function () {
		var math = MathJax.Hub.getAllJax("MathDiv")[0];
		var i = matrix1Values();
		var j = matrix2Values();
		var k = calculateMatrixSum();
		var l = calculateMatrixFinalSum();
		////console.log(l);

		MathJax.Hub.Queue(["Text", math, "\\begin{bmatrix}" + i + "\\end{bmatrix} \\times \\begin{bmatrix}" + j + "\\end{bmatrix} = \\begin{bmatrix}" + k + "\\end{bmatrix} = \\begin{bmatrix}" + l + "\\end{bmatrix}"]);
		MathJax.Hub.Queue(function () {
			displayDiv.innerHTML = mathDiv.innerHTML;
			//highlighter();
		});
	});
};

/*
function createMatrix3() {
    var mathDiv = document.getElementById('math');
    var displayDiv = document.getElementById('display');

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
    MathJax.Hub.Queue(function() {
        var math = MathJax.Hub.getAllJax("MathDiv")[0];
        var i = matrix1Values();
        var j = matrix2Values();
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
function matrix1Values() {
    var answerString = "";
    var table = document.getElementById('matrix1');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        if (r >= 1) {

            var strLength = answerString.length;
            answerString = (answerString.slice(0, strLength - 1));
            answerString += "\\\\";
        }


        for (var c = 0; c < m1y; c++) {
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
    //console.log(answerString);
    return answerString;


}

//Viib teises maatriksis olevad arvud MatJax kujule

function matrix2Values() {
    var answerString = "";
    var table = document.getElementById('matrix2');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        if (r >= 1) {
            var strLength = answerString.length;
            answerString = (answerString.slice(0, strLength - 1));
            answerString += "\\\\";
        };

        for (var c = 0; c < m2y; c++) {
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
                //console.log("Cell");
                //console.log(Cell);
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
/*
function calculateMatrix() {
    if (mistakeA === false || mistakeB === false) {
        document.getElementById("mistakeNotification").style.display = "inline";
        //document.getElementById("mistakeNotification").innerHTML = "Kõik lahtrid ei ole korralikult täidetud";
        //console.log("calculateMatrix IF mistakeA: " + mistakeA);
        //console.log("calculateMatrix IF mistakeB: " + mistakeB);
    } else {
        calculateMatrixSum();
        calculateMatrixFinalSum();
        createMatrix3();

        document.getElementById("matrixAnswerContainer").style.display = "none"
        document.getElementById("matrixFinalAnswerContainer").style.display = "none";
        //document.getElementById("checkAnswer").style.display = "none";

    }
}
*/
//sama mis eelmine, aga peidab eelmise lahenduse ja  nupud
function calculateNextMatrix() {
    calculateMatrixSum();
    calculateMatrixFinalSum();
    createMatrix3();

    document.getElementById("matrixAnswerContainer").style.display = "none"
    document.getElementById("matrixFinalAnswerContainer").style.display = "none";
    document.getElementById("matrix1Container").style.display = "none";
    document.getElementById("matrix2Container").style.display = "none";
    document.getElementById("checkAnswer").style.display = "none";
    document.getElementById("calculateNext").style.display = "none";
}

// **** GENEREERIB VAHETULEMUSE ****
function calculateMatrixSum() {

    var c = 1;
    var finalString = "";

    for (var x = 1; x <= m1x; x++) {
        if (x >= 2) {
            var strLength = finalString.length;
            finalString = (finalString.slice(0, strLength - 3));
            finalString += "\\\\";
        };

        for (var y = 1; y <= m2y; y++) {

            if (y >= 2) {
                var strLength = finalString.length;
                finalString = finalString.slice(0, strLength - 3);
                finalString += "&";
            };
            var matrixAnswerString = "";

            for (var i = 0; i < m1y; i++) {


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

    for (var x = 1; x <= m1x; x++) {
        if (x >= 2) {
            var strLength = finalString.length;

            finalString += "\\\\";
        };

        for (var y = 1; y <= m2y; y++) {

            if (y >= 2) {
                var strLength = finalString.length;

                finalString += "&";
            };

            var matrixAnswerString = "";

            for (var i = 0; i < m1y; i++) {

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


var timer;

$(document).ready(function () {
	$(".input").on("input", function () {

		window.clearTimeout(timer);
		timer = window.setTimeout(function () {
			generateValues();
		}, 500);
		//console.log("midagi toimub");
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
    checkA: for (var i = 0; i < m1x; i++) {
        for (var j = 0; j < m1y; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var numberA = document.getElementById("a" + rowId + colId).value;
            //console.log(numberA);
            if (numberA == "") {
                //console.log("Kast A on tühi");
                var inputColorA = document.getElementById("a" + rowId + colId);
                inputColorA.style.backgroundColor = "";
                mistakeA = false;
                break checkA;
            } else {
                var regexA = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var foundA = regexA.test(numberA);
                //console.log("Kast A: " + foundA);
                if (foundA === false) {
                    var inputColorA = document.getElementById("a" + rowId + colId);
                    inputColorA.style.backgroundColor = "red";
                    mistakeA = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                    //document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
					break checkA;
                } else {
                    var inputColorA = document.getElementById("a" + rowId + colId);
                    inputColorA.style.backgroundColor = "";
                    mistakeA = true;
                    document.getElementById("mistakeNotification").style.display = "none";
                }
            }
        }
    }

        checkB: for (var i = 0; i < m2x; i++) {
        for (var j = 0; j < m2y; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var numberB = document.getElementById("b" + rowId + colId).value;
            //console.log(numberB);
            if (numberB == "") {
                //console.log("Kast B on tühi");
                mistakeB = false;
                //console.log("checkInputSequenceB Tühi kast: " + mistakeB);
                var inputColorB = document.getElementById("b" + rowId + colId);
                inputColorB.style.backgroundColor = "";
                break checkB;
            } else {
                var regexB = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var foundB = regexB.test(numberB);
                //console.log("Kast B: " + foundB);
                if (foundB === false) {
                    var inputColorB = document.getElementById("b" + rowId + colId);
                    inputColorB.style.backgroundColor = "red";
                    mistakeB = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                    //document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
					break checkB;
                } else {
                    var inputColorB = document.getElementById("b" + rowId + colId);
                    inputColorB.style.backgroundColor = "";
                    mistakeB = true;
                    document.getElementById("mistakeNotification").style.display = "none";
                }
            }

        }
    }

    //console.log("Lõpus mistakeB: " + mistakeB);
    //console.log("Lõpus mistakeA: " + mistakeA);
    if (mistakeB === true && mistakeA === true) {
        document.getElementById("mistakeNotification").style.display = "none";
		//generateValues();
    }
}


/*function checkInputSequenceB() {
    for (var i = 0; i < m2x; i++) {
        for (var j = 0; j < m2y; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var numberB = document.getElementById("b" + rowId + colId).value;
            //console.log(numberB);
            if (numberB == "") {
                //console.log("Kast B on tühi");
                var inputColorB = document.getElementById("b" + rowId + colId);
                inputColorB.style.backgroundColor = "";
                mistakeB = false;
            } else {
                var regexB = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var foundB = regexB.test(numberB);
                //console.log("Kast B: " + foundB);
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
        ////console.log("Vigu ei ole");
        document.getElementById("mistakeNotification").style.display = "none";
    } else {
        ////console.log("Vigu on")
    }
}

*/


// **** LASEB SISESTADA AINULT NUMBREID JA ÜHE KALDKRIIPSU, ET SAAKS SISESTADA MURDE ****
function validate(evt) {
    key = evt.key;
    var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"];
    if (allowed.indexOf(evt.key) == -1) {
        evt.preventDefault();
        //console.log("EI LUBA");
    }
    // PRAEGUNE
    if (evt.key === "/" && evt.target.value.indexOf('/') != -1) {
        evt.preventDefault();
    }
    /*
    if(evt.key==="-") {
    	////console.log("EVENT TARGET VALUE: "+ evt.target.value.length);
    	if(evt.target.value.length > 3){
    		evt.preventDefault();
    	}
    }
    */
}


var matrix1Array;
var matrix2Array;
var matrixPreAnswerArray;

function highlighter() {
	
	matrix1Array = [[null]];
	matrix2Array = [[null]];
	matrixPreAnswerArray = [[null]];

    var tableCells = document.getElementsByClassName("mjx-mtd");
    var startpoint = tableCells.length / 2;
    var answerStartpoint = startpoint + m1x * m1y + m2x * m2y;
    var matrixPreAnswerSize = m1x * m2y;
    var matrix1Column = m1x;
    var matrix2Column = m2x;

    var rowStartpoint = startpoint;
    var matrixRow = [null];

    // esimene maatriks
    for (var i = 0; i < matrix1Column; i++) {
        for (var j = 0; j < m1y; j++) {
            matrixRow.push(rowStartpoint);
            rowStartpoint++;
        }
        matrix1Array.push(matrixRow);
        matrixRow = [null];
    }

    // teine maatriks
    for (var i = 0; i < matrix2Column; i++) {
        for (var j = 0; j < m2y; j++) {
            matrixRow.push(rowStartpoint);
            rowStartpoint++;
        }
        matrix2Array.push(matrixRow);
        matrixRow = [null];
    }

    // vahevastuste maatriks
    for (var i = 0; i < matrix1Column; i++) {
        for (var j = 0; j < m2y; j++) {
            matrixRow.push(rowStartpoint);
            rowStartpoint++;
        }
        matrixPreAnswerArray.push(matrixRow);
        matrixRow = [null];
    }

    /* //console.log("startpoint: " + startpoint);
    //console.log("rowStartpoint: " + rowStartpoint);
    //console.log("answerStartpoint: " + answerStartpoint);
    //console.log(matrix1Array);
    //console.log(matrix2Array);
    //console.log(matrixPreAnswerArray);
     */


    var c = 1;

    for (var x = 1; x <= m1x; x++) {
        for (var y = 1; y <= m2y; y++) {
            for (var i = 0; i < m1y; i++) {

                (function() {

                        ////console.log("1 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
                        ////console.log("c: " + c + " , x: " + x + " , y: " + y);
                        var aID = matrix1Array[x][c];
                        ////console.log("2 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
                        ////console.log("c: " + c + " , x: " + x + " , y: " + y);
                        var bID = matrix2Array[c][y];
                        ////console.log("3 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
                        ////console.log("c: " + c + " , x: " + x + " , y: " + y);
                        var cID = matrixPreAnswerArray[x][y];
						//console.log("cID: "+cID);

                        highlight(aID, bID, cID);

                        ////console.log("4 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);

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




//täidab testimiseks väljad
document.addEventListener("keypress", function(e) {
    if (e.key === "f") { fill() }

})

function fill() {


    mistakeA = true;
    mistakeB = true;
    document.querySelectorAll("tr > *").forEach(function(element) { element.value = Math.floor(Math.random() * 300) })
}