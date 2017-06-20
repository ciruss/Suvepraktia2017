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

// muutujad maatriksi suuruste jaoks
var matrixSize;

// muutujad determinantide jaoks
var detNumbers = [];
var detValues = "";
var inversionCount = 0;

// muutuja permutatsioonide tabeli jaoks
var matrixPermutationTable = document.getElementById("matrixPermutationTable");

var mistakes = false;

// **** ÜLDINE FUNKTSIOON MAATRIKSI GENEREERIMISEKS ****

function generateMatrixForDeterminant() {

    document.getElementById("mistakeNotification").style.display = "none";
    document.getElementById("math").style.display = "none"
    document.getElementById("determinantTable").style.display = "none"
	document.getElementById("showCalculations").style.display = "none";

    matrixSize = document.getElementById("determinant").value;
    var matrixForDeterminant = document.getElementById("matrixForDeterminant");
    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");

    if (matrixForDeterminant) {
        matrixForDeterminant.innerHTML = "";
        matrixPermutationTable.innerHTML = "";
        createMatrixForDeterminant();
    } else {
        matrixPermutationTable.innerHTML = "";
        createMatrixForDeterminant();
    }
}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE MAATRIKSI ****

function generateMatrix() {
    generateMatrixForDeterminant();
}

function createMatrixForDeterminant() {
    //VIIDE: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
    var matrixDeterminantContainer = document.getElementById("matrixDeterminantContainer");
    var matrixForDeterminant = document.getElementById("matrixForDeterminant");
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < matrixSize; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < matrixSize; j++) {
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
    matrixForDeterminant.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB MATHJAXI RUUTMAATRIKSI ***** 
function createDetMatrix() {
    var answerString = "";
    var output = document.getElementById("DetMatrix");
    var table = document.getElementById("matrixForDeterminant");
    for (var r = 0, n = table.rows.length; r < n; r++) {
        if (r >= 1) {
            var strLength = answerString.length;
            answerString = (answerString.slice(0, strLength - 1));
            answerString += "\\\\";
        }
        for (var c = 0, n = table.rows.length; c < n; c++) {
            var rowId = r + 1;
            var colId = c + 1;
            var Cell = document.getElementById("a" + rowId + colId).value;
            var str = Cell;
            var pos = str.indexOf("/");
            var minuspos = Cell.indexOf("-")
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

function determinantPhase() {
    var p = document.getElementById("determinant").value;
    if (p == 2) {
        return "Teist";
    } else if (p == 3) {
        return "Kolmandat";
    } else if (p == 4) {
        return "Neljandat";
    } else if (p == 5) {
        return "Viiendat"
    }
}

function generateDetMatrix() {
    var mathDiv = document.getElementById("math");
    var displayDiv = document.getElementById("display");

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
    MathJax.Hub.Queue(function() {
        var math = MathJax.Hub.getAllJax("MathDiv")[0];
        var i = document.getElementById("determinant").value;
        var j = fractionAnswer();
        var k = determinantPhase();
        var l = createDetMatrix();

        MathJax.Hub.Queue(["Text", math, k + "\\ järku\\ ruutmaatriksi\\ A_" + i + " = \\begin{pmatrix}" + l + "\\end{pmatrix}" + k + "\\ järku\\ determinandiks\\ nimetatakse\\ reaalarvu \\begin{vmatrix}A_" + i + "\\end{vmatrix} = \\begin{vmatrix}" + l + "\\end{vmatrix} = " + j])
        MathJax.Hub.Queue(function() {
            displayDiv.innerHTML = mathDiv.innerHTML;
            mathDiv.innerHTML;
        })
    })
}

// ||||| ----- ----- ----- ----- DETERMINANTIDE KALKULAATORI OSA ----- ----- ----- ----- |||||
function reduce(numerator, denominator) {
    var gcd = function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
}


function fractionAnswer() {
    var detValue = calculateDeterminant();
    var finalString = ""
    var abc = math.fraction(detValue);
    abc = math.fraction({
        n: abc.n,
        d: abc.d
    });
    var num = detValue;
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
        var fractionbracketstart = "-";
        var fractionbracketend = "";
        var fractionbracket = fractionbracketstart + start + end + fractionbracketend;
        finalString += fractionbracket;
    } else if (abc.d !== 1) {
        reduction = reduce(abc.n, abc.d);
        var numerator = "\\frac {" + abc.n + "}";
        var denominator = "{" + abc.d + "}";
        answerString = numerator + denominator;
        finalString += answerString;
    }
    return finalString;
}
// **** FUNKTSIOON �IGE PERMUTATSIOONIDE FUNKTSIOONI K�IVITAMISEKS ****

function calculateDeterminant() {


    if (mistakes === false) {
        document.getElementById("mistakeNotification").style.display = "inline";
    } else {
        document.getElementById("mistakeNotification").style.display = "none";
        var determinant = document.getElementById("determinant").value;

        if (determinant === "4") {
            determinantForFour();
            generateDetMatrix();
            a = determinantForFour();
        }

        if (determinant === "5") {
            determinantForFive();
            generateDetMatrix();
            a = determinantForFive();
        }

        if (determinant === "3") {
            determinantForThree();
            generateDetMatrix();
            a = determinantForThree();
        }

        if (determinant === "2") {
            determinantForTwo();
            generateDetMatrix();
            a = determinantForTwo();
        }

        mistakes = false;

        document.getElementById("showCalculations").style.display = "inline-block";
    }
    return a;
}

// **** FUNKTSIOONID PERMUTATSIOONIDE GENEREERIMISEKS ****

function determinantForTwo() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 2; i++) {

        var detNumbersTwo = [1, 2];
        var detNumbersTemp = [];
        var detValuesTemp = "";
        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 1; j++) {

            var detNumbersOne = [];
            for (var n1 = 0; n1 < 2; n1++) {
                detNumbersOne[n1] = detNumbersTwo[n1];
            }
            detNumbersOne.splice(i, 1);
            detNumbersTemp = [detNumbersTwo[i], detNumbersOne[j]];
        }

        // siia inversioonid
        for (var i1 = 0; i1 < 2; i1++) {
            if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                inversionCount++;
            }
        }

        var cellValueOne = document.getElementById("a1" + detNumbersTemp[0]).value;
        var cellValueTwo = document.getElementById("a2" + detNumbersTemp[1]).value;

        if (cellValueOne < 0 || cellValueOne.indexOf("/") > -1) {
            cellValueOne = "(" + cellValueOne + ")";
        }
        if (cellValueTwo < 0 || cellValueTwo.indexOf("/") > -1) {
            cellValueTwo = "(" + cellValueTwo + ")";
        }

        if (inversionCount % 2 === 0) {
            detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo;
            detValues += detValuesTemp;
        } else {
            detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo;
            detValues += detValuesTemp;
        }

        var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
        matrixPermutationTableString += permutationTableRow;


        detNumbers.push(detNumbersTemp);
        detNumbersTemp = [];
        detValuesTemp = "";
        inversionCount = 0;
    }
    detValues = detValues.slice(3, detValues.length);

    var matrixDetAnswer = math.eval(detValues);
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function determinantForThree() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 3; i++) {

        var detNumbersThree = [1, 2, 3];
        var detNumbersTemp = [];
        var detValuesTemp = "";

        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 2; j++) {
            var detNumbersTwo = [];
            for (var n2 = 0; n2 < 3; n2++) {
                detNumbersTwo[n2] = detNumbersThree[n2];
            }
            detNumbersTwo.splice(i, 1);

            // kolmas ts�kkel, mis m��rab �ra kolmanda numbri
            for (var k = 0; k < 1; k++) {


                var detNumbersOne = [];
                for (var n1 = 0; n1 < 2; n1++) {
                    detNumbersOne[n1] = detNumbersTwo[n1];
                }
                detNumbersOne.splice(j, 1);
                detNumbersTemp = [detNumbersThree[i], detNumbersTwo[j], detNumbersOne[k]];
            }

            // siia inversioonid
            for (var i1 = 0; i1 < 2; i1++) {
                if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                    inversionCount++;
                }
            }

            for (var i2 = 0; i2 < 1; i2++) {
                if (detNumbersTemp[i2] > detNumbersTemp[i2 + 2]) {
                    inversionCount++;
                }
            }

            var cellValueOne = document.getElementById("a1" + detNumbersTemp[0]).value;
            var cellValueTwo = document.getElementById("a2" + detNumbersTemp[1]).value;
            var cellValueThree = document.getElementById("a3" + detNumbersTemp[2]).value;

            if (cellValueOne < 0 || cellValueOne.indexOf("/") > -1) {
                cellValueOne = "(" + cellValueOne + ")";
            }
            if (cellValueTwo < 0 || cellValueTwo.indexOf("/") > -1) {
                cellValueTwo = "(" + cellValueTwo + ")";
            }
            if (cellValueThree < 0 || cellValueThree.indexOf("/") > -1) {
                cellValueThree = "(" + cellValueThree + ")";
            }


            if (inversionCount % 2 === 0) {
                detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree;
                detValues += detValuesTemp;
            } else {
                detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree;
                detValues += detValuesTemp;
            }

            var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
            matrixPermutationTableString += permutationTableRow;


            detNumbers.push(detNumbersTemp);
            detNumbersTemp = [];
            detValuesTemp = "";
            inversionCount = 0;
        }
    }
    detValues = detValues.slice(3, detValues.length);

    var matrixDetAnswer = math.eval(detValues);
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function determinantForFour() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 4; i++) {


        var detNumbersFour = [1, 2, 3, 4];
        var detNumbersTemp = [];
        var detValuesTemp = "";


        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 3; j++) {

            var detNumbersThree = [];
            for (var n3 = 0; n3 < 4; n3++) {
                detNumbersThree[n3] = detNumbersFour[n3];
            }
            detNumbersThree.splice(i, 1);

            // kolmas ts�kkel, mis m��rab �ra kolmanda numbri
            for (var k = 0; k < 2; k++) {

                var detNumbersTwo = [];
                for (var n2 = 0; n2 < 3; n2++) {
                    detNumbersTwo[n2] = detNumbersThree[n2];
                }
                detNumbersTwo.splice(j, 1);

                // neljas ts�kkel, mis m��rab �ra neljanda numbri
                for (var l = 0; l < 1; l++) {
                    var detNumbersOne = [];
                    for (n1 = 0; n1 < 2; n1++) {
                        detNumbersOne[n1] = detNumbersTwo[n1];
                    }
                    detNumbersOne.splice(k, 1);
                    detNumbersTemp = [detNumbersFour[i], detNumbersThree[j], detNumbersTwo[k], detNumbersOne[l]];
                }

                // siia inversioonid
                for (var i1 = 0; i1 < 3; i1++) {
                    if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                        inversionCount++;
                    }
                }

                for (var i2 = 0; i2 < 2; i2++) {
                    if (detNumbersTemp[i2] > detNumbersTemp[i2 + 2]) {
                        inversionCount++;
                    }
                }

                for (var i3 = 0; i3 < 1; i3++) {
                    if (detNumbersTemp[i3] > detNumbersTemp[i3 + 3]) {
                        inversionCount++;
                    }
                }

                var cellValueOne = document.getElementById("a1" + detNumbersTemp[0]).value;
                var cellValueTwo = document.getElementById("a2" + detNumbersTemp[1]).value;
                var cellValueThree = document.getElementById("a3" + detNumbersTemp[2]).value;
                var cellValueFour = document.getElementById("a4" + detNumbersTemp[3]).value;

                if (cellValueOne < 0 || cellValueOne.indexOf("/") > -1) {
                    cellValueOne = "(" + cellValueOne + ")";
                }
                if (cellValueTwo < 0 || cellValueTwo.indexOf("/") > -1) {
                    cellValueTwo = "(" + cellValueTwo + ")";
                }
                if (cellValueThree < 0 || cellValueThree.indexOf("/") > -1) {
                    cellValueThree = "(" + cellValueThree + ")";
                }
                if (cellValueFour < 0 || cellValueFour.indexOf("/") > -1) {
                    cellValueFour = "(" + cellValueFour + ")";
                }

                if (inversionCount % 2 === 0) {
                    detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour;
                    detValues += detValuesTemp;
                } else {
                    detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour;
                    detValues += detValuesTemp;
                }

                var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
                matrixPermutationTableString += permutationTableRow;


                detNumbers.push(detNumbersTemp);
                detNumbersTemp = [];
                detValuesTemp = "";
                inversionCount = 0;
            }
        }
    }

    detValues = detValues.slice(3, detValues.length);

    var matrixDetAnswer = math.eval(detValues);
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function determinantForFive() {

    var matrixPermutationTable = document.getElementById("matrixPermutationTable");
    var permutationTableHead = "<tr><th>" + "Permutatsioonid" + "</th><th>" + "Inversioonid" + "</th><th>" + "Arvutus" + "</th></tr>";
    var matrixPermutationTableString = permutationTableHead;

    // esimene ts�kkel, mis m��rab �ra esimese numbri
    for (var i = 0; i < 5; i++) {


        var detNumbersFive = [1, 2, 3, 4, 5];
        var detNumbersTemp = [];
        var detValuesTemp = "";

        // teine ts�kkel, mis m��rab �ra teise numbri
        for (var j = 0; j < 4; j++) {

            var detNumbersFour = [];
            for (var n4 = 0; n4 < 5; n4++) {
                detNumbersFour[n4] = detNumbersFive[n4];
            }
            detNumbersFour.splice(i, 1);

            // kolmas ts�kkel, mis m��rab �ra kolmanda numbri
            for (var k = 0; k < 3; k++) {

                var detNumbersThree = [];
                for (var n3 = 0; n3 < 4; n3++) {
                    detNumbersThree[n3] = detNumbersFour[n3];
                }
                detNumbersThree.splice(j, 1);

                // neljas ts�kkel, mis m��rab �ra neljanda numbri
                for (var l = 0; l < 2; l++) {

                    var detNumbersTwo = [];
                    for (n2 = 0; n2 < 3; n2++) {
                        detNumbersTwo[n2] = detNumbersThree[n2];
                    }
                    detNumbersTwo.splice(k, 1);

                    // viies ts�kkel, mis m��rab �ra viienda numbri
                    for (var m = 0; m < 1; m++) {

                        var detNumbersOne = [];
                        for (n1 = 0; n1 < 2; n1++) {
                            detNumbersOne[n1] = detNumbersTwo[n1];
                        }
                        detNumbersOne.splice(l, 1);
                        detNumbersTemp = [detNumbersFive[i], detNumbersFour[j], detNumbersThree[k], detNumbersTwo[l], detNumbersOne[m]];

                        // siia inversioonid
                        for (var i1 = 0; i1 < 4; i1++) {
                            if (detNumbersTemp[i1] > detNumbersTemp[i1 + 1]) {
                                inversionCount++;
                            }
                        }

                        for (var i2 = 0; i2 < 3; i2++) {
                            if (detNumbersTemp[i2] > detNumbersTemp[i2 + 2]) {
                                inversionCount++;
                            }
                        }

                        for (var i3 = 0; i3 < 2; i3++) {
                            if (detNumbersTemp[i3] > detNumbersTemp[i3 + 3]) {
                                inversionCount++;
                            }
                        }

                        for (var i4 = 0; i4 < 1; i4++) {
                            if (detNumbersTemp[i4] > detNumbersTemp[i4 + 4]) {
                                inversionCount++;
                            }
                        }

                        var cellValueOne = document.getElementById("a1" + detNumbersTemp[0]).value;
                        var cellValueTwo = document.getElementById("a2" + detNumbersTemp[1]).value;
                        var cellValueThree = document.getElementById("a3" + detNumbersTemp[2]).value;
                        var cellValueFour = document.getElementById("a4" + detNumbersTemp[3]).value;
                        var cellValueFive = document.getElementById("a5" + detNumbersTemp[4]).value;

                        if (cellValueOne < 0 || cellValueOne.indexOf("/") > -1) {
                            cellValueOne = "(" + cellValueOne + ")";
                        }
                        if (cellValueTwo < 0 || cellValueTwo.indexOf("/") > -1) {
                            cellValueTwo = "(" + cellValueTwo + ")";
                        }
                        if (cellValueThree < 0 || cellValueThree.indexOf("/") > -1) {
                            cellValueThree = "(" + cellValueThree + ")";
                        }
                        if (cellValueFour < 0 || cellValueFour.indexOf("/") > -1) {
                            cellValueFour = "(" + cellValueFour + ")";
                        }
                        if (cellValueFive < 0 || cellValueFive.indexOf("/") > -1) {
                            cellValueFive = "(" + cellValueFive + ")";
                        }

                        if (inversionCount % 2 === 0) {
                            detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour + "*" + cellValueFive;
                            detValues += detValuesTemp;
                        } else {
                            detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour + "*" + cellValueFive;
                            detValues += detValuesTemp;
                        }

                        var permutationTableRow = "<tr><td>" + detNumbersTemp + "</td><td>" + inversionCount + "</td><td>" + detValuesTemp + "</td></tr>";
                        matrixPermutationTableString += permutationTableRow;


                        detNumbers.push(detNumbersTemp);
                        detNumbersTemp = [];
                        detValuesTemp = "";
                        inversionCount = 0;
                    }
                }
            }
        }
    }
    detValues = detValues.slice(3, detValues.length);

    var matrixDetAnswer = math.eval(detValues);
    detValues = "";
    matrixPermutationTable.innerHTML = matrixPermutationTableString;
    matrixPermutationTableString = "";
    return matrixDetAnswer;
}

function displayTable() {


    var x = document.getElementById('determinantTable');
    if (x.style.display === 'none') {
        document.getElementById("showCalculations").innerHTML = "Peida tabel";
        x.style.display = 'block';
    } else {
        document.getElementById("showCalculations").innerHTML = "Kuva vahetulemused";
        x.style.display = 'none';
    }


}


function checkInputSequence() {
    checkInput: for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            var rowId = i + 1;
            var colId = j + 1;
            var number = document.getElementById("a" + rowId + colId).value;
            if (number == "") {
                var inputColor = document.getElementById("a" + rowId + colId);
                inputColor.style.backgroundColor = "";
                mistakes = false
                break checkInput;
            } else {
                var regex = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var found = regex.test(number);
                if (found === false) {
                    var inputColor = document.getElementById("a" + rowId + colId);
                    inputColor.style.backgroundColor = "red";
                    mistakes = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                    break checkInput;
                } else {
                    var inputColor = document.getElementById("a" + rowId + colId);
                    inputColor.style.backgroundColor = "";
                    document.getElementById("mistakeNotification").style.display = "none";
                    mistakes = true
                }
            }
        }
    }

        if (mistakes === true) {
        mistakes = true;
        calculateDeterminant();
        document.getElementById("mistakeNotification").style.display = "none";
        document.getElementById("math").style.display = "block"
    } else {}
}

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
