// **** GLOBAALSED MUUTUJAD ****

// kalkulaatori maatriksi mõõdu muutujad
var m1x, m1y, m2x, m2y;

// maatriksite sisendite muutujad
var mistakeA = false;
var mistakeB = false;
var mistakesBoth = 0;
// ||||| ----- ----- ----- ----- MAATRIKSITE KALKULAATORI OSA ----- ----- ----- ----- |||||

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****

//123
function generateMatrix() {
   
   //et kastid jälle nähtavale ilmuks
    document.getElementById("checkAnswer").style.display = "none";	
    document.getElementById("calculateNext").style.display = "none";
    document.getElementById("matrix1Container").style.display = "inline";
    document.getElementById("matrix2Container").style.display = "inline";

	m1x = document.getElementById("m1x").value;
	m1y = document.getElementById("m1y").value;
	m2x = document.getElementById("m2x").value;
	m2y = document.getElementById("m2y").value;

	//test = m1x * m1y;
	
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
			if(r>=1){
			
			var strLength = answerString.length;
			answerString = (answerString.slice(0, strLength - 1));
			answerString +="\\\\";
			}
            for (var c = 0;c < m1y; c++){
				var rowId = r + 1;
				var colId = c + 1;
				var Cell = document.getElementById("a" + rowId + colId).value;
				var str = Cell;
				var pos = str.indexOf("/");
				if(Cell.charAt(pos)==="/"){
					var stringLength = Cell.length;
					var String1 = Cell;
					var start = str.slice(0, pos);
					start = "\\frac {"+start+"}";
					var end = Cell;
					var afterSlash = str.substr(str.indexOf("/") + 1);
					end = "{" + afterSlash + "}&";
					Cell = start + end;
					answerString += Cell;
				}
				else {
				var Cell = document.getElementById("a" + rowId + colId).value + "&";
				answerString +=Cell;
				}
				
				

				
           }
	 }
	 var strLength = answerString.length;
	answerString = (answerString.slice(0, strLength - 1));
	console.log(answerString);
	return answerString;
 }

 //Viib teises maatriksis olevad arvud MatJax kujule

 function matrix2Values() {
	var answerString = "";
	var table = document.getElementById('matrix2');
        for (var r = 0, n = table.rows.length; r < n; r++) {
			if(r>=1){
			var strLength = answerString.length;
			answerString = (answerString.slice(0, strLength - 1));
			answerString +="\\\\";
			};
		
            for (var c = 0; c < m2y; c++){
				var rowId = r + 1;
				var colId = c + 1; 
				var Cell = document.getElementById("b" + rowId + colId).value;
				var str = Cell;
				var pos = str.indexOf("/");
				if(Cell.charAt(pos)==="/"){
					var stringLength = Cell.length;
					var String1 = Cell;
					var start = str.slice(0, pos);
					start = "\\frac {"+start+"}";
					var end = Cell;
					var afterSlash = str.substr(str.indexOf("/") + 1);
					end = "{" + afterSlash + "}&";
					Cell = start + end;
					console.log("Cell");
					console.log(Cell);
					answerString += Cell;
				}
				else {
				var Cell = document.getElementById("b" + rowId + colId).value + "&";
				answerString +=Cell;
				}

				
				}
				
			}
			
	var strLength = answerString.length;
	answerString = (answerString.slice(0, strLength - 1));
	return answerString;
 }





// **** KÄIVITAB ARVUTAMISE ****
function calculateMatrix() {
	calculateMatrixSum();
    calculateMatrixFinalSum();
	createMatrix3();

    document.getElementById("matrixAnswerContainer").style.display = "block"
    document.getElementById("matrixFinalAnswerContainer").style.display = "block";
    document.getElementById("checkAnswer").style.display = "none";

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
	var finalString="";
	
	for(var x = 1; x <= m1x; x++) {
			if(x>=2){
			var strLength = finalString.length;
			finalString = (finalString.slice(0, strLength - 3));
			finalString +="\\\\";
			};
		
		for(var y = 1; y <= m2y; y++) {

			if(y>=2){
				var strLength = finalString.length;
				finalString = finalString.slice(0,strLength -3);
				finalString += "&";
			};
			var matrixAnswerString = "";
			
			for(var i = 0; i < m1y; i++) {


				var a = document.getElementById("a"+x+c).value;
				var str = a;
				var pos = str.indexOf("/");
					if(a.charAt(pos)==="/"){
					var stringLength = a.length;
					var String1 = a;
					var start = str.slice(0, pos);
					start = "\\frac {"+start+"}";
					var end = a;
					var afterSlash = str.substr(str.indexOf("/") + 1);
					end = "{" + afterSlash + "}";
					a = start + end;
				}
				var b = document.getElementById("b"+c+y).value;
				var str = b;
				var pos1 = str.indexOf("/");
					if(b.charAt(pos1)==="/"){
					var stringLength = b.length;
					var String1 = b;
					var start = str.slice(0, pos1);
					start = "\\frac {"+start+"}";
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
	
	for(var x = 1; x <= m1x; x++) {
		if(x>=2){
			var strLength = finalString.length;

			finalString +="\\\\";
			};
		
		for(var y = 1; y <= m2y; y++) {

			if(y>=2){
				var strLength = finalString.length;

				finalString += "&";
			};

			var matrixAnswerString = "";
			
			for(var i = 0; i < m1y; i++) {
				
				var a = document.getElementById("a"+x+c).value;

				var b = document.getElementById("b"+c+y).value;
				matrixAnswerString += a + "*" + b + " + ";
				c++;
			}

			var strLength = matrixAnswerString.length;
			matrixAnswer.value =math.eval(matrixAnswerString.slice(0, strLength - 3));
			var a = matrixAnswer.value;
			var abc = math.fraction(a);
			abc = math.fraction({n: abc.n, d: abc.d});
			if(abc.d === 1){
				finalString += abc.n;
			} else {
			var reduction = reduce(abc.n,abc.d);
			var numerator = "\\frac {"+abc.n+"}";
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
				console.log("See kast on tühi");
				var inputColorA = document.getElementById("a" + rowId + colId);
				inputColorA.style.backgroundColor = "";
				mistakeA = false;
			} else {
				var regexA = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
				var foundA = regexA.test(numberA);
				console.log(foundA);
				if(foundA === false){
					var inputColorA = document.getElementById("a" + rowId + colId);
					inputColorA.style.backgroundColor = "red";
					mistakeA = false;
					document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
				} else {
					var inputColorA = document.getElementById("a" + rowId + colId);
					inputColorA.style.backgroundColor = "";
					mistakeA = true;
				}
			}
		}
	}
	if(mistakeA === true && mistakeB === true){
		console.log("vigu ei ole");
		document.getElementById("checkAnswer").style.display = "block";	
		document.getElementById("calculateNext").style.display = "block";
		document.getElementById("mistakeNotification").style.display = "none";	
	} else {
		console.log("vigu on")
	}
}

function checkInputSequenceB(){
	for (var i = 0; i < m2x; i++) {
		for (var j = 0; j < m2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var numberB = document.getElementById("b" + rowId + colId).value;
			if(numberB == ""){
				console.log("See kast on tühi");
				var inputColorB = document.getElementById("b" + rowId + colId);
				inputColorB.style.backgroundColor = "";
				mistakeB = false;
			} else {
				var regexB = /^(\-\d+\/\-\d+)$|^(\d+\/\-\d+)$|^(\-\d+\/\d+)$|^(\d+\/\d+)$|^(\d+)$|^(\-\d+)$/
				var foundB = regexB.test(numberB);
				console.log(foundB);
				if(foundB === false){
					var inputColorB = document.getElementById("b" + rowId + colId);
					inputColorB.style.backgroundColor = "red";
					mistakeB = false;
					document.getElementById("mistakeNotification").innerHTML = "Kusagil on viga";
				} else {
					var inputColorB = document.getElementById("b" + rowId + colId);
					inputColorB.style.backgroundColor = "";
					mistakeB = true;
				}
			}
			
		}
	}
	if(mistakeB === true && mistakeA === true){
		console.log("Vigu ei ole");
		document.getElementById("checkAnswer").style.display = "block";	
		document.getElementById("calculateNext").style.display = "block";
		document.getElementById("mistakeNotification").style.display = "none";		
	} else {
		console.log("Vigu on")
	}
}

function validate(evt) {
	key = evt.key;
	var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"];
	if(allowed.indexOf(evt.key) == -1){
		evt.preventDefault();
		//console.log("EI LUBA");
	}
	if(evt.key === "/" && evt.target.value.indexOf('/') != -1){
		evt.preventDefault();
	}
	if(evt.key==="-"){
		//console.log("EVENT TARGET VALUE: "+ evt.target.value.length);
		if(evt.target.value.length > 1){
			evt.preventDefault();
		}
	}	
}


function highlighter(aID, bID, cID) {
    document.getElementById(cID).addEventListener("mouseover", function () {
        document.getElementById(aID).style.backgroundColor = "yellow";
        document.getElementById(bID).style.backgroundColor = "yellow";
    })
    document.getElementById(cID).addEventListener("mouseleave", function () {
        document.getElementById(aID).style.backgroundColor = "";
        document.getElementById(bID).style.backgroundColor = "";
    })
}