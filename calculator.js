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
	
	//console.log("generateMatrix mistakeA: "+mistakeA);
	//console.log("generateMatrix mistakeB: "+mistakeB);
	
	document.getElementById("mistakeNotification").style.display = "none";
   
   //et kastid jälle nähtavale ilmuks
    document.getElementById("checkAnswer").style.display = "block";	
    document.getElementById("calculateNext").style.display = "block";
    document.getElementById("matrix1Container").style.display = "inline";
    document.getElementById("matrix2Container").style.display = "inline";
	

	m1x = parseInt(document.getElementById("m1x").value);
	m1y = parseInt(document.getElementById("m1y").value);
	m2x = parseInt(document.getElementById("m2x").value);
	m2y = parseInt(document.getElementById("m2y").value);
	
	var m1 = document.getElementById("matrix1");
	var m2 = document.getElementById("matrix2");
	var mA = document.getElementById("matrixAnswer");
	var mFA = document.getElementById("matrixFinalAnswer");

	if (m1y === m2x) {
		
		console.log("Saab arvutada");
		console.log("Esimene maatriks on m1x x m1y (" + m1x + " x " + m1y + ")");
		console.log("Teine maatriks on m2x x m2y (" + m2x + " x " + m2y + ")");

		if (m1 && m2 && mA && mFA) {

			m1.innerHTML = "";
			m2.innerHTML = "";
			mA.innerHTML = "";
			mFA.innerHTML = "";

			createMatrix1();
			createMatrix2();
			calculateMatrixSum();
			calculateMatrixFinalSum();

		} else {

			createMatrix1();
			createMatrix2();
			calculateMatrixSum();
			calculateMatrixFinalSum();
		}
	} else {
		console.log("Ei saa arvutada");
		alert("Ei saa genereerida, muuda maatriksite suuruseid!");
	}

}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE MAATRIKSI ****
function createMatrix1() {

	var matrix1Container = document.getElementById("matrix1Container");
	var m1Width = 42 * m1y;
	var m1Height = 28 * m1x;
	matrix1Container.style.width = m1Width + "px";
	matrix1Container.style.height = m1Height + "px";

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
			cell.setAttribute("onblur", "checkInputSequenceA()");
			cell.setAttribute("maxlength", "10");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	matrix1.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB TEISE MAATRIKSI ****
function createMatrix2() {

	var matrix2Container = document.getElementById("matrix2Container");
	var m2Width = 42 * m2y;
	var m2Height = 28 * m2x;

	var m1Width = 42 * m1y;
	var m2Position = m1Width + 20;

	matrix2Container.style.width = m2Width + "px";
	matrix2Container.style.height = m2Height + "px";
	matrix2Container.style.left = m2Position + "px";

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
			cell.setAttribute("maxlength", "10");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	matrix2.appendChild(tableBody);

}

function createMatrix3() {
	var mathDiv = document.getElementById('math');
    var displayDiv = document.getElementById('display');

    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"math"]);
    MathJax.Hub.Queue(function() {
		var math = MathJax.Hub.getAllJax("MathDiv")[0];
		var i = matrix1Values();
		var j = matrix2Values();
		var k = calculateMatrixSum();
		var l = calculateMatrixFinalSum();
		MathJax.Hub.Queue(["Text", math, "\\begin{bmatrix}"+ i +"\\end{bmatrix} \\times \\begin{bmatrix}"+j+"\\end{bmatrix} = \\begin{bmatrix}"+ k +"\\end{bmatrix} = \\begin{bmatrix}"+ l +"\\end{bmatrix}"]);
        //\\begin{bmatrix} {"+i+"}&{"+j+"}&0\\\\0&{"+i+"}&{"+j+"}\\\\{"+j+"}&0&{"+i+"}\\\end{bmatrix}
		MathJax.Hub.Queue(function() {
		displayDiv.innerHTML = mathDiv.innerHTML;
		});
	});
}
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
			}
			//if (Cell.charAt(0)!== "-" && Cell.charAt(pos)!=="/")
			else {
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
			}
			//if (Cell.charAt(0)!== "-" && Cell.charAt(pos)!=="/")
			else {
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
	if(mistakeA === false || mistakeB === false){
		document.getElementById("mistakeNotification").style.display = "inline";
		document.getElementById("mistakeNotification").innerHTML = "Kõik lahtrid ei ole korralikult täidetud";
		console.log("calculateMatrix IF mistakeA: "+mistakeA);
		console.log("calculateMatrix IF mistakeB: "+mistakeB);
	} else {
		calculateMatrixSum();
		calculateMatrixFinalSum();
		createMatrix3();
		mistakeA = false;
		mistakeB = false;
    document.getElementById("matrixAnswerContainer").style.display = "none"
    document.getElementById("matrixFinalAnswerContainer").style.display = "none";
    document.getElementById("checkAnswer").style.display = "none";

}
}
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
				finalString += "&~~~~";
			};
			var matrixAnswerString = "";

			for (var i = 0; i < m1y; i++) {


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
					a = a.replace("/","");
					a = fractionbracket;

				}
				if (a.charAt(pos) === "/"){
					start = str.slice(0, pos);
					start = "\\frac {" + start + "}";
					var end;
					var afterSlash = str.substr(str.indexOf("/") + 1);
					end = "{" + afterSlash + "}";
					a = start + end;
					a = a.replace("/","");
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
					fractionbracket = fractionbracket.replace("/","");
					b = fractionbracket;
				}
				if (b.charAt(pos1) === "/") {
					var start = str.slice(0, pos1);
					start = "\\frac {" + start + "}";
					var end;
					var afterSlash = str.substr(str.indexOf("/") + 1);
					end = "{" + afterSlash + "}";
					b = start + end;
					b = b.replace("/","");
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

				var b = document.getElementById("b" + c + y).value;(b);
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
			//if(){

			//}
			if (abc.d === 1 && n.charAt(pos)!=="-") {
				finalString += abc.n;
			} 
			if(abc.d ===1 && n.charAt(pos)==="-"){
				abc.n = "-" + abc.n;
				finalString += abc.n;
			}
			if(n.charAt(pos)==="-" && abc.d !== 1){
					reduction = reduce(abc.n,abc.d);
					start = "\\frac {" + abc.n + "}";
					var end = "{" + abc.d + "}"
					var fractionbracketstart = "(-";
					var fractionbracketend = ")";
					var fractionbracket = fractionbracketstart + start + end + fractionbracketend;
					finalString += fractionbracket;
			}
			
			else if(abc.d !==1) {
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




function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}

function checkInputSequenceA(){
	for (var i=0; i<m1x; i++) {
		for (var j=0; j<m1y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var numberA = document.getElementById("a" + rowId + colId).value;
			if(numberA == ""){
				//console.log("Kast A on tühi");
				var inputColorA = document.getElementById("a" + rowId + colId);
				inputColorA.style.backgroundColor = "";
				mistakeA = false;
			} else {
				var regexA = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
				var foundA = regexA.test(numberA);
				//console.log("Kast A: "+foundA);
				if(foundA === false){
					var inputColorA = document.getElementById("a" + rowId + colId);
					inputColorA.style.backgroundColor = "red";
					mistakeA = false;
					document.getElementById("mistakeNotification").style.display = "inline";
					document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
				} else {
					var inputColorA = document.getElementById("a" + rowId + colId);
					inputColorA.style.backgroundColor = "";
					mistakeA = true;
					document.getElementById("mistakeNotification").style.display = "none";
				}
			}
		}
	}
	if(mistakeA === true && mistakeB === true){
		//console.log("vigu ei ole");
		document.getElementById("mistakeNotification").style.display = "none";	
	} else {
		//console.log("vigu on")
	}
}




function checkInputSequenceB(){
	for (var i = 0; i < m2x; i++) {
		for (var j = 0; j < m2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var numberB = document.getElementById("b" + rowId + colId).value;
			console.log(numberB);
			if(numberB == ""){
				console.log("Kast B on tühi");
				var inputColorB = document.getElementById("b" + rowId + colId);
				inputColorB.style.backgroundColor = "";
				mistakeB = false;
			} else {
				var regexB = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
				var foundB = regexB.test(numberB);
				console.log("Kast B: "+foundB);
				if(foundB === false){
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
	if(mistakeB === true && mistakeA === true){
		//console.log("Vigu ei ole");
		document.getElementById("mistakeNotification").style.display = "none";		
	} else {
		//console.log("Vigu on")
	}
}


// **** LASEB SISESTADA AINULT NUMBREID JA ÜHE KALDKRIIPSU, ET SAAKS SISESTADA MURDE ****

function validate(evt) {
	key = evt.key;
	var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"];
	if(allowed.indexOf(evt.key) == -1){
		evt.preventDefault();
		console.log("EI LUBA");
	}
	// PRAEGUNE
	if(evt.key === "/" && evt.target.value.indexOf('/') != -1) {
		evt.preventDefault();
	}
	if(evt.key==="-") {
		//console.log("EVENT TARGET VALUE: "+ evt.target.value.length);
		if(evt.target.value.length > 3){
			evt.preventDefault();
		}
	}
}




var matrix1Array = [[null]];
var matrix2Array = [[null]];
var matrixPreAnswerArray = [[null]];

function highlighter() {
	
	var tableCells = document.getElementsByClassName("mjx-mtd");
	var startpoint = tableCells.length / 2;
	var answerStartpoint = startpoint + m1x * m1y + m2x * m2y;
	var matrixPreAnswerSize = m1x * m2y;
	var matrix1Column = m1x;
	var matrix2Column = m2x;
	
	var rowStartpoint = startpoint;
	var matrixRow = [null];
	
	// esimene maatriks
	for(var i = 0; i < matrix1Column; i++) {
		for(var j = 0; j < m1y; j++) {
			matrixRow.push(rowStartpoint);
			rowStartpoint++;
		}
		matrix1Array.push(matrixRow);
		matrixRow = [null];
	}
	
	// teine maatriks
	for(var i = 0; i < matrix2Column; i++) {
		for(var j = 0; j < m2y; j++) {
			matrixRow.push(rowStartpoint);
			rowStartpoint++;
		}
		matrix2Array.push(matrixRow);
		matrixRow = [null];
	}
	
	// vahevastuste maatriks
	for(var i = 0; i < matrix1Column; i++) {
		for(var j = 0; j < m2y; j++) {
			matrixRow.push(rowStartpoint);
			rowStartpoint++;
		}
		matrixPreAnswerArray.push(matrixRow);
		matrixRow = [null];
	}
	
	console.log("startpoint: " + startpoint);
	console.log("rowStartpoint: " + rowStartpoint);
	console.log("answerStartpoint: " + answerStartpoint);
	console.log(matrix1Array);
	console.log(matrix2Array);
	console.log(matrixPreAnswerArray);
	
	
	
    var c = 1;
	
    for (var x = 1; x <= m1x; x++) {
        for (var y = 1; y <= m2y; y++) {
            for (var i = 0; i < m1y; i++) {
				
                (function() {
					
					console.log("1 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
					console.log("c: " + c + " , x: " + x + " , y: " + y);
                    var aID = matrix1Array[x][c];
					console.log("2 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
					console.log("c: " + c + " , x: " + x + " , y: " + y);
                    var bID = matrix2Array[c][y];
					console.log("3 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
					console.log("c: " + c + " , x: " + x + " , y: " + y);
                    var cID = matrixPreAnswerArray[x][y];
					
					highlight(aID, bID, cID);
					
					console.log("4 - " + "aID: " + aID + " , bID: " + bID + " , cID: " + cID);
					
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
	
    tableCells[cID].addEventListener("mouseover", function () {
        tableCells[aID].style.color = "red";
        tableCells[bID].style.color = "red";
    });
	
    tableCells[cID].addEventListener("mouseleave", function () {
        tableCells[aID].style.color = "black";
        tableCells[bID].style.color = "black";
    });

}