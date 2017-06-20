var invertibleMatrixSize;
var detNumbers = [];
var detValues = "";
var inversionCount = 0;

var mistakes = false;
var timer;

function generateMatrixForInvertibleM() {


	invertibleMatrixSize = parseInt(document.getElementById("invertibleMatrixSize").value);
	var matrixForInvertibleM = document.getElementById("matrixForInvertibleM");
	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");

	if (matrixForInvertibleM) {
		matrixForInvertibleM.innerHTML = "";
		matrixDeterminantAnswer.innerHTML = "";
		createMatrixForInvertibleM();
	} else {
		matrixDeterminantAnswer.innerHTML = "";
		createMatrixForInvertibleM();
	}
}

function createMatrixForInvertibleM() {
	//VIIDE: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
	document.getElementById("answerHeadline").style.display = "inline";
	document.getElementById("display").style.display = "none";

	var matrixInvertibleMContainer = document.getElementById("matrixInvertibleMContainer");


	var matrixForInvertibleM = document.getElementById("matrixForInvertibleM");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < invertibleMatrixSize; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < invertibleMatrixSize; j++) {
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
	matrixForInvertibleM.appendChild(tableBody);
}


// **** FUNKTSIOONID PERMUTATSIOONIDE GENEREERIMISEKS ****

function determinantForSecond(smallMatrix) {

	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");

	// esimene tsükkel, mis määrab ära esimese numbri
	for (var i = 0; i < 2; i++) {


		var detNumbersTwo = [1, 2];
		var detNumbersTemp = [];
		var detValuesTemp = "";

		// teine tsükkel, mis määrab ära teise numbri
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

		if (smallMatrix) {
			var cellValueOne = smallMatrix[1][detNumbersTemp[0]];
			var cellValueTwo = smallMatrix[2][detNumbersTemp[1]];

		} else {

			var cellValueOne = document.getElementById("a1" + detNumbersTemp[0]).value;
			var cellValueTwo = document.getElementById("a2" + detNumbersTemp[1]).value;

		}

		if (inversionCount % 2 === 0) {
			detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo;
			detValues += detValuesTemp;
		} else {
			detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo;
			detValues += detValuesTemp;
		}


		detNumbers.push(detNumbersTemp);
		detNumbersTemp = [];
		detValuesTemp = "";
		inversionCount = 0;
	}
	detValues = detValues.slice(3, detValues.length);

	var matrixDetAnswer = math.eval(detValues);

	if (!smallMatrix) {
		var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
		matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
	}

	detValues = "";
	return matrixDetAnswer;
}

function determinantForThird(smallMatrix) {

	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");

	// esimene tsükkel, mis määrab ära esimese numbri
	for (var i = 0; i < 3; i++) {


		var detNumbersThree = [1, 2, 3];
		var detNumbersTemp = [];
		var detValuesTemp = "";


		// teine tsükkel, mis määrab ära teise numbri
		for (var j = 0; j < 2; j++) {


			var detNumbersTwo = [];
			for (var n2 = 0; n2 < 3; n2++) {
				detNumbersTwo[n2] = detNumbersThree[n2];
			}
			detNumbersTwo.splice(i, 1);


			// kolmas tsükkel, mis määrab ära kolmanda numbri
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

			if (smallMatrix) {

				// console.log("maatriks");
				var cellValueOne = smallMatrix[1][detNumbersTemp[0]];
				var cellValueTwo = smallMatrix[2][detNumbersTemp[1]];
				var cellValueThree = smallMatrix[3][detNumbersTemp[2]];

			} else {

				// console.log("input");
				var cellValueOne = document.getElementById("a1" + detNumbersTemp[0]).value;
				var cellValueTwo = document.getElementById("a2" + detNumbersTemp[1]).value;
				var cellValueThree = document.getElementById("a3" + detNumbersTemp[2]).value;
			}

			if (inversionCount % 2 === 0) {
				detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree;
				detValues += detValuesTemp;
			} else {
				detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree;
				detValues += detValuesTemp;
			}


			detNumbers.push(detNumbersTemp);
			detNumbersTemp = [];
			detValuesTemp = "";
			inversionCount = 0;
		}
	}
	detValues = detValues.slice(3, detValues.length);

	var matrixDetAnswer = math.eval(detValues);

	if (!smallMatrix) {
		var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
		matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
	}

	detValues = "";
	return matrixDetAnswer;
}

function determinantForFourth(smallMatrix) {

	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");

	// esimene tsükkel, mis määrab ära esimese numbri
	for (var i = 0; i < 4; i++) {


		var detNumbersFour = [1, 2, 3, 4];
		var detNumbersTemp = [];
		var detValuesTemp = "";

		// teine tsükkel, mis määrab ära teise numbri
		for (var j = 0; j < 3; j++) {


			var detNumbersThree = [];
			for (var n3 = 0; n3 < 4; n3++) {
				detNumbersThree[n3] = detNumbersFour[n3];
			}
			detNumbersThree.splice(i, 1);

			// kolmas tsükkel, mis määrab ära kolmanda numbri
			for (var k = 0; k < 2; k++) {


				var detNumbersTwo = [];
				for (var n2 = 0; n2 < 3; n2++) {
					detNumbersTwo[n2] = detNumbersThree[n2];
				}
				detNumbersTwo.splice(j, 1);

				// neljas tsükkel, mis määrab ära neljanda numbri
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

				if (smallMatrix) {

					var cellValueOne = smallMatrix[1][detNumbersTemp[0]];
					var cellValueTwo = smallMatrix[2][detNumbersTemp[1]];
					var cellValueThree = smallMatrix[3][detNumbersTemp[2]];
					var cellValueFour = smallMatrix[4][detNumbersTemp[3]];

				} else {

					var cellValueOne = document.getElementById("a1" + detNumbersTemp[0]).value;
					var cellValueTwo = document.getElementById("a2" + detNumbersTemp[1]).value;
					var cellValueThree = document.getElementById("a3" + detNumbersTemp[2]).value;
					var cellValueFour = document.getElementById("a4" + detNumbersTemp[3]).value;
				}

				if (inversionCount % 2 === 0) {
					detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour;
					detValues += detValuesTemp;
				} else {
					detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour;
					detValues += detValuesTemp;
				}

				detNumbers.push(detNumbersTemp);
				detNumbersTemp = [];
				detValuesTemp = "";
				inversionCount = 0;
			}
		}
	}

	detValues = detValues.slice(3, detValues.length);

	var matrixDetAnswer = math.eval(detValues);

	if (!smallMatrix) {
		var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
		matrixDeterminantAnswer.innerHTML = matrixDetAnswer
	}
	detValues = "";
	return matrixDetAnswer;
}

function determinantForFifth() {

	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");

	// esimene tsükkel, mis määrab ära esimese numbri
	for (var i = 0; i < 5; i++) {


		var detNumbersFive = [1, 2, 3, 4, 5];
		var detNumbersTemp = [];
		var detValuesTemp = "";


		// teine tsükkel, mis määrab ära teise numbri
		for (var j = 0; j < 4; j++) {


			var detNumbersFour = [];
			for (var n4 = 0; n4 < 5; n4++) {
				detNumbersFour[n4] = detNumbersFive[n4];
			}
			detNumbersFour.splice(i, 1);

			// kolmas tsükkel, mis määrab ära kolmanda numbri
			for (var k = 0; k < 3; k++) {


				var detNumbersThree = [];
				for (var n3 = 0; n3 < 4; n3++) {
					detNumbersThree[n3] = detNumbersFour[n3];
				}
				detNumbersThree.splice(j, 1);

				// neljas tsükkel, mis määrab ära neljanda numbri
				for (var l = 0; l < 2; l++) {


					var detNumbersTwo = [];
					for (n2 = 0; n2 < 3; n2++) {
						detNumbersTwo[n2] = detNumbersThree[n2];
					}
					detNumbersTwo.splice(k, 1);

					// viies tsükkel, mis määrab ära viienda numbri
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

						if (inversionCount % 2 === 0) {
							detValuesTemp += " + " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour + "*" + cellValueFive;
							detValues += detValuesTemp;
						} else {
							detValuesTemp += " - " + cellValueOne + "*" + cellValueTwo + "*" + cellValueThree + "*" + cellValueFour + "*" + cellValueFive;
							detValues += detValuesTemp;
						}


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
	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
	matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
	detValues = "";
	return matrixDetAnswer;
}



var mainMatrixArray = [null];

function generateArrayForMatrix() {

	mainMatrixArray = [null];
	var matrixRow = [null];
	for (var x = 1; x <= invertibleMatrixSize; x++) {
		for (var y = 1; y <= invertibleMatrixSize; y++) {
			var matrixCell = parseInt(document.getElementById("a" + x + y).value);
			matrixRow.push(matrixCell);
		}
		mainMatrixArray.push(matrixRow);
		matrixRow = [null];
	}
}



var finalMatrix = [null];
var finalMatrixRow = [null];
var finalMatrixDetAnswers = [null];
var arrayMultiplier = "";

function invertibleMatrix(determinant) {

	finalMatrix = [null];
	finalMatrixRow = [null];
	finalMatrixDetAnswers = [null];

	// viib maatriksi massiivi kujule
	generateArrayForMatrix();


	// arv millega korrutada igat maatriksi kasti
	var matrixMultiplier = "1 / " + determinant;
	arrayMultiplier = matrixMultiplier;

	for (var x = 1; x <= invertibleMatrixSize; x++) {

		for (var y = 1; y <= invertibleMatrixSize; y++) {

			// arv, mis määrab ära kas miinusmärk on või ei ole
			var cellMultiplier = math.pow(-1, x + y);


			// teen peamisest maatriksist uue klooni, mida hakkan vähendama
			var tempMatrix = mainMatrixArray.slice();



			// muutuja i jäljendab x-i, et eemaldada iga mingit elementi 
			for (i = 1; i <= invertibleMatrixSize; i++) {

				// teen ühest maatriksireast kohal i klooni
				var tempRow = tempMatrix[i].slice();

				// eemaldab kohalt y maatriksireast elemendi (veerust)
				tempRow.splice(y, 1);

				// eemaldab tempMatrix-ist kohal i oleva rea ja paneb uue tehtud rea asemele
				tempMatrix.splice(i, 1, tempRow);
			}

			tempMatrix.splice(x, 1);


			// siin on uus väiksem maatriks valmis


			if (invertibleMatrixSize === 2) {
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = smallMatrix[1][1];
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
			}

			if (invertibleMatrixSize === 3) {
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = determinantForSecond(smallMatrix);
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
			}

			if (invertibleMatrixSize === 4) {
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = determinantForThird(smallMatrix);
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
			}

			if (invertibleMatrixSize === 5) {
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = determinantForFourth(smallMatrix);
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
			}

			finalMatrixRow.push(tempMatrix);

		}
		finalMatrix.push(finalMatrixRow);
		finalMatrixRow = [null];
	}

	var preAnswerArray = invMatrixPreAnswer();
	var transposedArray = invMatrixTransposed();
	var finalAnswerArray = invMatrixFinalAnswer(matrixMultiplier);

}

var invMatrixPreAnswerArray = [];

function invMatrixPreAnswer() {

	invMatrixPreAnswerArray = [];
	var secondPreAnswerRow = [];
	var counter = 0;

	for (var x = 1; x <= invertibleMatrixSize; x++) {
		for (var y = 1; y <= invertibleMatrixSize; y++) {
			counter++;
			var matrixCell = finalMatrixDetAnswers[counter];
			secondPreAnswerRow.push(matrixCell);
		}
		invMatrixPreAnswerArray.push(secondPreAnswerRow);
		secondPreAnswerRow = [];
	}
	return invMatrixPreAnswerArray;
}


var invMatrixTransposedArray = [];

function invMatrixTransposed() {

	invMatrixTransposedArray = [];
	var transposedAnswerArray = [];
	var counter = 0;

	for (var x = 0; x < invertibleMatrixSize; x++) {
		for (var y = 0; y < invertibleMatrixSize; y++) {
			counter++;
			var matrixCell = finalMatrixDetAnswers[counter];
			transposedAnswerArray.push(matrixCell);
		}
		invMatrixTransposedArray.push(transposedAnswerArray);
		transposedAnswerArray = [];
	}
	invMatrixTransposedArray = math.transpose(invMatrixTransposedArray);
	return invMatrixTransposedArray;
}



var invMatrixFinalAnswerArray = [];

function invMatrixFinalAnswer(matrixMultiplier) {

	invMatrixFinalAnswerArray = [];
	var finalAnswerRow = [];
	var counter = -1;

	for (var x = 0; x < invertibleMatrixSize; x++) {
		for (var y = 0; y < invertibleMatrixSize; y++) {
			counter++;
			var matrixCell = invMatrixTransposedArray[x][y];
			var cellValue = math.eval(matrixMultiplier + "*" + matrixCell);
			finalAnswerRow.push(cellValue);
		}
		invMatrixFinalAnswerArray.push(finalAnswerRow);
		finalAnswerRow = [];
	}
	return invMatrixFinalAnswerArray;
}

function checkInputSequence() {
	checkInput: for (var i = 0; i < invertibleMatrixSize; i++) {
		for (var j = 0; j < invertibleMatrixSize; j++) {
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

		if (invertibleMatrixSize === 2) {
			var determinant = determinantForSecond();
			if (determinant === 0) {
				alert("Ei saa arvutada, 0-ga jagamine");
			} else {
				invertibleMatrix(determinant);
				createMatrixThird();
				document.getElementById("matrixDeterminantAnswer").style.display = "inline-block";
				document.getElementById("answerHeadline").style.display = "inline-block";
				document.getElementById("display").style.display = "inline-block";
			}
		} else if (invertibleMatrixSize === 3) {
			var determinant = determinantForThird();
			if (determinant === 0) {
				alert("Ei saa arvutada, 0-ga jagamine");
			} else {
				invertibleMatrix(determinant);
				createMatrixThird();
				document.getElementById("matrixDeterminantAnswer").style.display = "inline-block";
				document.getElementById("answerHeadline").style.display = "inline-block";
				document.getElementById("display").style.display = "inline-block";
			}
		} else if (invertibleMatrixSize === 4) {
			var determinant = determinantForFourth();
			if (determinant === 0) {
				alert("Ei saa arvutada, 0-ga jagamine");
			} else {
				invertibleMatrix(determinant);
				createMatrixThird();
				document.getElementById("matrixDeterminantAnswer").style.display = "inline-block";
				document.getElementById("answerHeadline").style.display = "inline-block";
				document.getElementById("display").style.display = "inline-block";
			}
		} else if (invertibleMatrixSize === 5) {
			var determinant = determinantForFifth();
			if (determinant === 0) {
				alert("Ei saa arvutada, 0-ga jagamine");
			} else {
				invertibleMatrix(determinant);
				createMatrixThird();
				document.getElementById("matrixDeterminantAnswer").style.display = "inline-block";
				document.getElementById("answerHeadline").style.display = "inline-block";
				document.getElementById("display").style.display = "inline-block";
			}
		}

		document.getElementById("mistakeNotification").style.display = "none";
		document.getElementById("matrixDeterminantAnswer").style.display = "inline-block";
		document.getElementById("answerHeadline").style.display = "inline-block";

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

function matrixFirstMathJax() {
	var a = invMatrixPreAnswer();
	var answerString = "";
	var finalString = "";
	var b;
	for (var x = 0; x < invertibleMatrixSize; x++) {

		for (var y = 0; y < invertibleMatrixSize; y++) {
			b = a[x][y];
			var str = b;
			var String = str.toString();
			var minuspos = String.indexOf("-");
			var pos = String.indexOf("/");
			if (String.charAt(minuspos) === "-") {
				b = "(" + b + ")&";
				answerString += b;
			} else {
				answerString += b;
				answerString += "&";
			}
		}
		str = answerString.length;
		answerString = (answerString.slice(0, str - 1));
		answerString += "\\\\";

	}
	finalString += answerString;
	str = finalString.length;
	finalstring = (finalString.slice(0, str - 2));
	return finalString;

}

function createMatrixThird() {
	var mathDiv = document.getElementById('math');
	var displayDiv = document.getElementById('display');

	MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math"]);
	MathJax.Hub.Queue(function () {
		var math = MathJax.Hub.getAllJax("MathDiv")[0];
		var l = finalMatrixTexFormat();
		var i = matrixFirstMathJax();
		var j = matrixSecondMathJax();
		var f = matrixThreeMathJax();
		var m = determinantForArray();
		MathJax.Hub.Queue(["Text", math, m + "\\begin{bmatrix}" + l + "\\end{bmatrix}^T =" + m + "\\begin{bmatrix}" + i + "\\end{bmatrix}^T = " + m + "\\begin{bmatrix}" + j + "\\end{bmatrix} = \\begin{bmatrix}" + f + "\\end{bmatrix}"]);
		MathJax.Hub.Queue(function () {
			displayDiv.innerHTML = mathDiv.innerHTML;
		});
	});
}

function matrixSecondMathJax() {
	var a = invMatrixTransposed();
	var answerString = "";
	var finalString = "";
	var b;
	for (var x = 0; x < invertibleMatrixSize; x++) {

		for (var y = 0; y < invertibleMatrixSize; y++) {
			b = a[x][y];
			var str = b;
			var String = str.toString();
			var minuspos = String.indexOf("-");
			var pos = String.indexOf("/");
			if (String.charAt(minuspos) === "-") {
				b = "(" + b + ")&";
				answerString += b;
			} else {
				answerString += b;
				answerString += "&";
			}
		}
		str = answerString.length;
		answerString = (answerString.slice(0, str - 1));
		answerString += "\\\\";

	}
	finalString += answerString;
	str = finalString.length;
	finalstring = (finalString.slice(0, str - 2));
	return finalString;

}

function matrixThreeMathJax() {
	var a = invMatrixFinalAnswerArray;
	var answerString = "";
	var finalString = "";
	var b;
	var str;
	for (var x = 0; x < invertibleMatrixSize; x++) {

		for (var y = 0; y < invertibleMatrixSize; y++) {
			b = a[x][y];
			var abc = math.fraction(b);
			abc = math.fraction({
				n: abc.n,
				d: abc.d
			});
			var num = b;
			var n = num.toString();
			var minusposOne = n.indexOf("-");
			if (abc.d === 1 && n.charAt(minusposOne) === "-") {
				abc.n = "(-" + abc.n + ")&";
				finalString += abc.n;
			}
			if (abc.d === 1 && n.charAt(minusposOne) !== "-") {
				finalString += abc.n + "&";
			}

			if (n.charAt(minusposOne) === "-" && abc.d !== 1) {
				reduction = reduce(abc.n, abc.d);
				start = "\\frac {" + abc.n + "}";
				var end = "{" + abc.d + "}"
				var fractionbracketstart = "(-";
				var fractionbracketend = ")";
				var fractionbracket = fractionbracketstart + start + end + fractionbracketend + "&";
				finalString += fractionbracket;
			} else if (abc.d !== 1) {
				reduction = reduce(abc.n, abc.d);
				var numerator = "\\frac {" + abc.n + "}";
				var denominator = "{" + abc.d + "}";
				var method = numerator + denominator + "&";
				finalString += method;
			}
		}
		str = finalString.length;
		finalString = (finalString.slice(0, str - 1));
		finalString += "\\\\";

	}

	str = finalString.length;
	finalString += answerString;
	finalString = (finalString.slice(0, str - 2));
	return finalString;

}

function reduce(numerator, denominator) {
	var gcd = function gcd(a, b) {
		return b ? gcd(b, a % b) : a;
	};
	gcd = gcd(numerator, denominator);
	return [numerator / gcd, denominator / gcd];
}

function determinantForArray() {
	a = arrayMultiplier;
	var answerString = "";
	var finalString = "";
	var str = a;
	var pos = str.indexOf("/");
	var minuspos = str.indexOf("-");
		var strTwo = str.replace("-", "");
		var start = strTwo.slice(0, pos - 1);
		start = "\\frac {" + start + "}";
		var end = a;
		var afterSlash = strTwo.substr(str.indexOf("/") + 1);
		end = "{" + afterSlash + "}";
		var fractionBracketStart = "(-";
		var fractionBracketEnd = ")";
		var fractionBracket = fractionBracketStart + start + end + fractionBracketEnd;
		answerString += fractionBracket;
	
	finalString += answerString;
	return finalString;
}

function finalMatrixTexFormat() {
	var finalString = "";
	var answerString = "";
	var answerStringStart = "";
	var answerStringEnd = "";
	var strLength = answerString.length;
	var finalStrLength;

	for (var x = 1; x <= invertibleMatrixSize; x++) {

		for (var y = 1; y <= invertibleMatrixSize; y++) {
			strLength = answerString.length;
			answerString = (answerString.slice(0, strLength - 2));
			answerStringStart = "(-1)" + "^{" + x + "+" + y + "}" + "\\begin{vmatrix}";
			for (i = 1; i <= invertibleMatrixSize - 1; i++) {

				for (l = 1; l <= invertibleMatrixSize - 1; l++) {
					var a = finalMatrix[x][y][i][l];
					var str = a;
					var String = str.toString();
					var pos = String.indexOf("/");
					var minuspos = String.indexOf("-");
					if (String.charAt(minuspos) === "-" && String.charAt(pos) === "/") {
						var strTwo = String.replace("-", "");
						var start = strTwo.slice(0, pos - 1);
						start = "\\frac {" + start + "}";
						var end = a;
						var afterSlash = str.substr(str.indexOf("/") + 1);
						end = "{" + afterSlash + "}";
						var fractionBracketStart = "(-";
						var fractionBracketEnd = ")" + "&";
						var fractionBracket = fractionBracketStart + start + end + fractionBracketEnd;
						answerString += fractionBracket;
					} else if (String.charAt(pos) === "/") {
						var stringLength = a.length;
						var String1 = a;
						var start = String.slice(0, pos);
						start = "\\frac {" + start + "}";
						var end = a;
						var afterSlash = str.substr(str.indexOf("/") + 1);
						end = "{" + afterSlash + "}&";
						a = start + end;
						answerString += a;
					} else {
						answerString += a;
						answerString += "&";
					}
				}
				strLength = answerString.length;
				answerString = (answerString.slice(0, strLength - 1));
				answerString += "\\\\";

			}
			answerStringEnd = "\\end{vmatrix}";
			strLength = answerString.length;
			answerString = (answerString.slice(0, strLength - 2));
			finalString += answerStringStart + answerString + answerStringEnd;
			finalString += "~~~~~~";

			answerString = "";
		}
		finalStrLength = finalString.length;
		finalString = (finalString.slice(0, finalStrLength - 6));
		finalString += "\\\\";
	}
	finalStrLength = finalString.length;
	finalString = (finalString.slice(0, finalStrLength - 2));
	finalString += answerString;
	return finalString;

}