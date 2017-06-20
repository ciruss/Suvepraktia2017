//Copyright 2017 Ryhm13
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

var invertibleMatrixSize;
var detNumbers = [];
var detValues = "";
var inversionCount = 0;

var mistakes = false;
var timer;

function generateMatrixForInvertibleM() {
	
	// console.log("genereerib");
	//document.getElementById("mistakeNotification").style.display = "none";

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
	document.getElementById("answerHeadline").style.display="inline";

	var matrixInvertibleMContainer = document.getElementById("matrixInvertibleMContainer");
	/*
	var mWidth = 42 * invertibleMatrixSize;
	var mHeight = 28 * invertibleMatrixSize;
	matrixInvertibleMContainer.style.width = mWidth + "px";
	matrixInvertibleMContainer.style.height = mHeight + "px";
	*/

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

/*
function calculateDeterminant() {

	console.log("arvutab");
	
	/* if(mistakes === false){
		document.getElementById("mistakeNotification").style.display = "inline";
		document.getElementById("mistakeNotification").innerHTML = "Kõik lahtrid ei ole korralikult täidetud";
	} else {
		document.getElementById("mistakeNotification").style.display = "none";
		var determinant = document.getElementById("determinant").value; 
		
		if(invertibleMatrixSize === 2) {
			determinantFor2();
		}
		
		if(invertibleMatrixSize === 3) {
			determinantFor3();
		}
		
		if(invertibleMatrixSize === 4) {
			determinantFor4();
		}
		
		if(invertibleMatrixSize === 5) {
			determinantFor5();
		}
		
		//mistakes = false;

	//document.getElementById("showCalculations").style.display="inline-block";
	document.getElementById("matrixDeterminantAnswer").style.display="inline-block";
	document.getElementById("answerHeadline").style.display="inline-block";
	
	
//}
}
*/
// **** FUNKTSIOONID PERMUTATSIOONIDE GENEREERIMISEKS ****

function determinantFor2(smallMatrix) {
	
	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 2; i++) {
		
		//console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
		
		var detNumbers2 = [1, 2];
		var detNumbersTemp = [];
		var detValuesTemp = "";
		
		// teine tsükkel, mis määrab ära teise numbri
		for(var j = 0; j < 1; j++) {
			
			//console.log("tsykkel 2 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
			
			var detNumbers1 = [];
			for(var n1 = 0; n1 < 2; n1++) {
				detNumbers1[n1] = detNumbers2[n1];
			}
			detNumbers1.splice(i, 1);
			detNumbersTemp = [detNumbers2[i], detNumbers1[j]];
		}
		
		// siia inversioonid
		for(var i1 = 0; i1 < 2; i1++) {
			if(detNumbersTemp[i1] > detNumbersTemp[i1+1]) {
				inversionCount++;
			}
		}
		
		if(smallMatrix) {
			// console.log("maatriks");
			var cellValue1 = smallMatrix[1][detNumbersTemp[0]];
			var cellValue2 = smallMatrix[2][detNumbersTemp[1]];
			
		} else {
			
			// console.log("input");
			var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
			var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;
			
		}
		
		
		if(inversionCount % 2 === 0) {
			detValuesTemp += " + " + cellValue1 + "*" + cellValue2;
			detValues += detValuesTemp;
		} else {
			detValuesTemp += " - " + cellValue1 + "*" + cellValue2;
			detValues += detValuesTemp;
		}
		
		// console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);
		
		detNumbers.push(detNumbersTemp);
		detNumbersTemp = [];
		detValuesTemp = "";
		inversionCount = 0;
	}
	detValues = detValues.slice(3, detValues.length);
	// console.log("vahetulemus: " + detValues);
	
	var matrixDetAnswer = math.eval(detValues);
	
	if(!smallMatrix) {
		var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
		matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
	}
	
	detValues = "";
	return matrixDetAnswer;
}

function determinantFor3(smallMatrix) {
	
	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 3; i++) {
		
		//console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
		
		var detNumbers3 = [1, 2, 3];
		var detNumbersTemp = [];
		var detValuesTemp = "";
		
		
		// teine tsükkel, mis määrab ära teise numbri
		for(var j = 0; j < 2; j++) {
			
			//console.log("tsykkel 2 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
			
			var detNumbers2 = [];
			for(var n2 = 0; n2 < 3; n2++) {
				detNumbers2[n2] = detNumbers3[n2];
			}
			detNumbers2.splice(i, 1);
			
			
			// kolmas tsükkel, mis määrab ära kolmanda numbri
			for(var k = 0; k < 1; k++) {
				
				//console.log("tsykkel 3 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
				
				var detNumbers1 = [];
				for(var n1 = 0; n1 < 2; n1++) {
					detNumbers1[n1] = detNumbers2[n1];
				}
				detNumbers1.splice(j, 1);
				detNumbersTemp = [detNumbers3[i], detNumbers2[j], detNumbers1[k]];
			}
			
			// siia inversioonid
			for(var i1 = 0; i1 < 2; i1++) {
				if(detNumbersTemp[i1] > detNumbersTemp[i1+1]) {
					inversionCount++;
				}
			}
			
			for(var i2 = 0; i2 < 1; i2++) {
				if(detNumbersTemp[i2] > detNumbersTemp[i2+2]) {
					inversionCount++;
				}
			}
			
			if(smallMatrix) {
				
				// console.log("maatriks");
				var cellValue1 = smallMatrix[1][detNumbersTemp[0]];
				var cellValue2 = smallMatrix[2][detNumbersTemp[1]];
				var cellValue3 = smallMatrix[3][detNumbersTemp[2]];
				
			} else {
				
				// console.log("input");
				var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
				var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;
				var cellValue3 = document.getElementById("a3" + detNumbersTemp[2]).value;
			}
			
			if(inversionCount % 2 === 0) {
				detValuesTemp += " + " + cellValue1 + "*" + cellValue2 + "*" + cellValue3;
				detValues += detValuesTemp;
			} else {
				detValuesTemp += " - " + cellValue1 + "*" + cellValue2 + "*" + cellValue3;
				detValues += detValuesTemp;
			}
			
			// console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);
			
			detNumbers.push(detNumbersTemp);
			detNumbersTemp = [];
			detValuesTemp = "";
			inversionCount = 0;
		}
	}
	detValues = detValues.slice(3, detValues.length);
	// console.log("vahetulemus: " + detValues);
	
	var matrixDetAnswer = math.eval(detValues);
	
	if(!smallMatrix) {
		var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
		matrixDeterminantAnswer.innerHTML = matrixDetAnswer;	
	}
	
	detValues = "";
	return matrixDetAnswer;
}

function determinantFor4(smallMatrix) {
	
	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 4; i++) {
		
		//console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
		
		var detNumbers4 = [1, 2, 3, 4];
		var detNumbersTemp = [];
		var detValuesTemp = "";
		
		// teine tsükkel, mis määrab ära teise numbri
		for(var j = 0; j < 3; j++) {
			
			//console.log("tsykkel 2 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
			
			var detNumbers3 = [];
			for(var n3 = 0; n3 < 4; n3++) {
				detNumbers3[n3] = detNumbers4[n3];
			}
			detNumbers3.splice(i, 1);
			
			// kolmas tsükkel, mis määrab ära kolmanda numbri
			for(var k = 0; k < 2; k++) {
				
				//console.log("tsykkel 3 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
				
				var detNumbers2 = [];
				for(var n2 = 0; n2 < 3; n2++) {
					detNumbers2[n2] = detNumbers3[n2];
				}
				detNumbers2.splice(j, 1);
				
				// neljas tsükkel, mis määrab ära neljanda numbri
				for(var l = 0; l < 1; l++) {
					
					//console.log("tsykkel 4 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
					
					var detNumbers1 = [];
					for(n1 = 0; n1 < 2; n1++) {
						detNumbers1[n1] = detNumbers2[n1];
					}
					detNumbers1.splice(k, 1);
					detNumbersTemp = [detNumbers4[i], detNumbers3[j], detNumbers2[k], detNumbers1[l]];
				}
				
				// siia inversioonid
				for(var i1 = 0; i1 < 3; i1++) {
					if(detNumbersTemp[i1] > detNumbersTemp[i1+1]) {
						inversionCount++;
					}
				}
				
				for(var i2 = 0; i2 < 2; i2++) {
					if(detNumbersTemp[i2] > detNumbersTemp[i2+2]) {
						inversionCount++;
					}
				}
				
				for(var i3 = 0; i3 < 1; i3++) {
					if(detNumbersTemp[i3] > detNumbersTemp[i3+3]) {
						inversionCount++;
					}
				}
				
				if(smallMatrix) {
				
					// console.log("maatriks");
					var cellValue1 = smallMatrix[1][detNumbersTemp[0]];
					var cellValue2 = smallMatrix[2][detNumbersTemp[1]];
					var cellValue3 = smallMatrix[3][detNumbersTemp[2]];
					var cellValue4 = smallMatrix[4][detNumbersTemp[3]];
					
				} else {
					
					// console.log("input");
					var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
					var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;
					var cellValue3 = document.getElementById("a3" + detNumbersTemp[2]).value;
					var cellValue4 = document.getElementById("a4" + detNumbersTemp[3]).value;
				}
				
				if(inversionCount % 2 === 0) {
					detValuesTemp += " + " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4;
					detValues += detValuesTemp;
				} else {
					detValuesTemp += " - " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4;
					detValues += detValuesTemp;
				}
				
				// console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);
				detNumbers.push(detNumbersTemp);
				detNumbersTemp = [];
				detValuesTemp = "";
				inversionCount = 0;
			}
		}
	}
	
	detValues = detValues.slice(3, detValues.length);
	// console.log("vahetulemus: " + detValues);
	
	var matrixDetAnswer = math.eval(detValues);
	
	if(!smallMatrix) {
		var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
		matrixDeterminantAnswer.innerHTML = matrixDetAnswer
	}
	detValues = "";
	return matrixDetAnswer;
}

function determinantFor5() {
	
	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 5; i++) {
		
		//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
		
		var detNumbers5 = [1, 2, 3, 4, 5];
		var detNumbersTemp = [];
		var detValuesTemp = "";
		
		
		// teine tsükkel, mis määrab ära teise numbri
		for(var j = 0; j < 4; j++) {
			
			//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
			
			var detNumbers4 = [];
			for(var n4 = 0; n4 < 5; n4++) {
				detNumbers4[n4] = detNumbers5[n4];
			}
			detNumbers4.splice(i, 1);
			
			// kolmas tsükkel, mis määrab ära kolmanda numbri
			for(var k = 0; k < 3; k++) {
				
				//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
				
				var detNumbers3 = [];
				for(var n3 = 0; n3 < 4; n3++) {
					detNumbers3[n3] = detNumbers4[n3];
				}
				detNumbers3.splice(j, 1);
				
				// neljas tsükkel, mis määrab ära neljanda numbri
				for(var l = 0; l < 2; l++) {
					
					//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
					
					var detNumbers2 = [];
					for(n2 = 0; n2 < 3; n2++) {
						detNumbers2[n2] = detNumbers3[n2];
					}
					detNumbers2.splice(k, 1);
					
					// viies tsükkel, mis määrab ära viienda numbri
					for(var m = 0; m < 1; m++) {
					
					//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
					
					var detNumbers1 = [];
					for(n1 = 0; n1 < 2; n1++) {
						detNumbers1[n1] = detNumbers2[n1];
					}
					detNumbers1.splice(l, 1);
					detNumbersTemp = [detNumbers5[i], detNumbers4[j], detNumbers3[k], detNumbers2[l], detNumbers1[m]];
					
					
					// siia inversioonid
					for(var i1 = 0; i1 < 4; i1++) {
						if(detNumbersTemp[i1] > detNumbersTemp[i1+1]) {
							inversionCount++;
						}
					}
					
					for(var i2 = 0; i2 < 3; i2++) {
						if(detNumbersTemp[i2] > detNumbersTemp[i2+2]) {
							inversionCount++;
						}
					}
					
					for(var i3 = 0; i3 < 2; i3++) {
						if(detNumbersTemp[i3] > detNumbersTemp[i3+3]) {
							inversionCount++;
						}
					}
					
					for(var i4 = 0; i4 < 1; i4++) {
						if(detNumbersTemp[i4] > detNumbersTemp[i4+4]) {
							inversionCount++;
						}
					}
					
					var cellValue1 = document.getElementById("a1" + detNumbersTemp[0]).value;
					var cellValue2 = document.getElementById("a2" + detNumbersTemp[1]).value;
					var cellValue3 = document.getElementById("a3" + detNumbersTemp[2]).value;
					var cellValue4 = document.getElementById("a4" + detNumbersTemp[3]).value;
					var cellValue5 = document.getElementById("a5" + detNumbersTemp[4]).value;
					
					if(inversionCount % 2 === 0) {
						detValuesTemp += " + " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4 + "*" + cellValue5;
						detValues += detValuesTemp;
					} else {
						detValuesTemp += " - " + cellValue1 + "*" + cellValue2 + "*" + cellValue3 + "*" + cellValue4 + "*" + cellValue5;
						detValues += detValuesTemp;
					}
					
					// console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount + ", arvud: " + detValuesTemp);
					
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
	// console.log("vahetulemus: " + detValues);
	
	var matrixDetAnswer = math.eval(detValues);
	var matrixDeterminantAnswer = document.getElementById("matrixDeterminantAnswer");
	matrixDeterminantAnswer.innerHTML = matrixDetAnswer;
	detValues = "";
	return matrixDetAnswer;
}

function calculateInvertibleMatrix() {
	
	if(invertibleMatrixSize === 2) {
		var determinant = determinantFor2();
		console.log(determinant);
		if(determinant === 0) {
			console.log("ei saa arvutada, 0-ga jagamine")
		} else {
			invertibleMatrix(determinant);
		}
	}
	
	if(invertibleMatrixSize === 3) {
		var determinant = determinantFor3();
		console.log(determinant);
		if(determinant === 0) {
			console.log("ei saa arvutada, 0-ga jagamine")
		} else {
			invertibleMatrix(determinant);
		}
	}
	
	if(invertibleMatrixSize === 4) {
		var determinant = determinantFor4();
		console.log(determinant);
		if(determinant === 0) {
			console.log("ei saa arvutada, 0-ga jagamine")
		} else {
			invertibleMatrix(determinant);
		}
	}
	
	if(invertibleMatrixSize === 5) {
		var determinant = determinantFor5();
		console.log(determinant);
		if(determinant === 0) {
			console.log("ei saa arvutada, 0-ga jagamine")
		} else {
			invertibleMatrix(determinant);
		}
	}
	
	document.getElementById("matrixDeterminantAnswer").style.display="inline-block";
	document.getElementById("answerHeadline").style.display="inline-block";
	
}

var mainMatrixArray = [null];

function generateArrayForMatrix() {
	
	mainMatrixArray = [null];
	var matrixRow = [null];
	for(var x = 1; x <= invertibleMatrixSize; x++) {
		for(var y = 1; y <= invertibleMatrixSize; y++) {
			var matrixCell = parseInt(document.getElementById("a"+x+y).value);
			// console.log(matrixCell + " to array");
			matrixRow.push(matrixCell);
		}
		// console.log("uus rida");
		mainMatrixArray.push(matrixRow);
		matrixRow = [null];
	}
}



var finalMatrix = [null];
var finalMatrixRow = [null];
var finalMatrixDetAnswers = [null];

function invertibleMatrix(determinant) {
	
	finalMatrix = [null];
	finalMatrixRow = [null];
	finalMatrixDetAnswers = [null];
	
	// viib maatriksi massiivi kujule
	generateArrayForMatrix();
	
	// console.log(mainMatrixArray);
	
	// arv millega korrutada igat maatriksi kasti
	var matrixMultiplier = "1 / " + determinant;
	// console.log("matrixmultiplier: " + matrixMultiplier);
	//var tempMatrix = mainMatrixArray.slice(); 
	
	for(var x = 1; x <= invertibleMatrixSize; x++) {
		
		for(var y = 1; y <= invertibleMatrixSize; y++) {
			
			// arv, mis määrab ära kas miinusmärk on või ei ole
			var cellMultiplier = math.pow(-1,x+y);
			// console.log(cellMultiplier);
			
			// infoks millise "kasti" peal ma suures (peamises) maatriksis olen
			// console.log("a" + x + y);
			
			// peamine maatriks
			// console.log("main: " + mainMatrixArray);
			
			// teen peamisest maatriksist uue klooni, mida hakkan vähendama
			var tempMatrix = mainMatrixArray.slice();
			// console.log("temp: " + tempMatrix);
			
			
			
			// muutuja i jäljendab x-i, et eemaldada iga mingit elementi 
			for(i = 1; i <= invertibleMatrixSize; i++) {
				
				// teen ühest maatriksireast kohal i klooni
				var tempRow = tempMatrix[i].slice();
				
				// eemaldab kohalt y maatriksireast elemendi (veerust)
				tempRow.splice(y, 1);
				
				// eemaldab tempMatrix-ist kohal i oleva rea ja paneb uue tehtud rea asemele
				tempMatrix.splice(i, 1, tempRow);
				// console.log(tempMatrix);
			}
			
			tempMatrix.splice(x, 1);
			// console.log(tempMatrix);
			
			
			// siin on uus väiksem maatriks valmis
			
			// console.log("uus maatriks");
			
			if(invertibleMatrixSize === 2) {
				// console.log("teist jarku");
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = smallMatrix[1][1];
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
			}
			
			if(invertibleMatrixSize === 3) {
				// console.log("kolmandat jarku");
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = determinantFor2(smallMatrix);
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
				// console.log("matrix answer: " + smallMatrixAnswer);
			}
			
			if(invertibleMatrixSize === 4) {
				// console.log("neljandat jarku");
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = determinantFor3(smallMatrix);
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
				// console.log("matrix answer: " + smallMatrixAnswer);
			}
			
			if(invertibleMatrixSize === 5) {
				// console.log("neljandat jarku");
				var smallMatrix = tempMatrix.slice();
				var smallMatrixDetAnswer = determinantFor4(smallMatrix);
				var smallMatrixAnswer = cellMultiplier * smallMatrixDetAnswer;
				finalMatrixDetAnswers.push(smallMatrixAnswer);
				// console.log("matrix answer: " + smallMatrixAnswer);
			}
			
			finalMatrixRow.push(tempMatrix);
			// console.log("row: " + finalMatrixRow);
			// console.log("main: " + mainMatrixArray);
			// console.log("temp: " + tempMatrix);
			
		}
		console.log(finalMatrixRow);
		finalMatrix.push(finalMatrixRow);
		finalMatrixRow = [null];
		// console.log("uus rida");
	}
	console.log(finalMatrix);
	console.log(finalMatrixDetAnswers);
	
	var preAnswerArray = invMatrixPreAnswer();
	var transposedArray = invMatrixTransposed();
	var finalAnswerArray = invMatrixFinalAnswer(matrixMultiplier);
	
}



var invMatrixPreAnswerArray = [null];

function invMatrixPreAnswer() {
	
	invMatrixPreAnswerArray = [null];
	var secondPreAnswerRow = [null];
	var counter = 0;
	
	for(var x = 1; x <= invertibleMatrixSize; x++) {
		for(var y = 1; y <= invertibleMatrixSize; y++) {
			counter++;
			var matrixCell = finalMatrixDetAnswers[counter];
			secondPreAnswerRow.push(matrixCell);
		}
		invMatrixPreAnswerArray.push(secondPreAnswerRow);
		secondPreAnswerRow = [null];
	}
	return invMatrixPreAnswerArray;
}


var invMatrixTransposedArray = [];

function invMatrixTransposed() {
	
	invMatrixTransposedArray = [];
	var transposedAnswerArray = [];
	var counter = 0;
	
	for(var x = 0; x < invertibleMatrixSize; x++) {
		for(var y = 0; y < invertibleMatrixSize; y++) {
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
	
	for(var x = 0; x < invertibleMatrixSize; x++) {
		for(var y = 0; y < invertibleMatrixSize; y++) {
			counter++;
			var matrixCell = invMatrixTransposedArray[x][y];
			console.log(matrixMultiplier);
			console.log(matrixCell);
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
                //console.log("See kast on tühi");
                var inputColor = document.getElementById("a" + rowId + colId);
                inputColor.style.backgroundColor = "";
                mistakes = false
                break checkInput;
            } else {
                var regex = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
                var found = regex.test(number);
                //console.log(found);
                if (found === false) {
                    var inputColor = document.getElementById("a" + rowId + colId);
                    inputColor.style.backgroundColor = "red";
                    mistakes = false;
                    document.getElementById("mistakeNotification").style.display = "inline";
                    //document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
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
        ////console.log("Vigu ei olnud");
        //document.getElementById("checkAnswerDeterminant").style.display = "block"
        //document.getElementById("newDeterminant").style.display = "block"
        //document.getElementById("mistakeNotification").style.display = "block",
		mistakes = true;
		//calculateDeterminant();
		calculateInvertibleMatrix();
		document.getElementById("mistakeNotification").style.display = "none";
    } else {
        ////console.log("vigu on");
    }
}

function validate(evt) {
    key = evt.key;
    var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"];
    if (allowed.indexOf(evt.key) == -1) {
        evt.preventDefault();
        ////console.log("EI LUBA");
    }
    // PRAEGUNE
    if (evt.key === "/" && evt.target.value.indexOf('/') != -1) {
        evt.preventDefault();
    }
}


//Timer
/*
$(document).ready(function () {
	$(".content").on("input", function () {

		window.clearTimeout(timer);
		timer = window.setTimeout(function () {
			generateValues();
		}, 500);
		console.log("midagi toimub");
	});
});
*/
