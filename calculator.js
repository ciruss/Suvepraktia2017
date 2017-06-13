// **** GLOBAALSED MUUTUJAD ****

// kalkulaatori maatriksi mõõdu muutujad
var m1x, m1y, m2x, m2y;

// maatriksite sisendite muutujad
var mistakeA = false;
var mistakeB = false;
var mistakesBoth = 0;
// ||||| ----- ----- ----- ----- MAATRIKSITE KALKULAATORI OSA ----- ----- ----- ----- |||||

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****
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
			createMatrixAnswer();
			createMatrixFinalAnswer();

		} else {

			createMatrix1();
			createMatrix2();
			createMatrixAnswer();
			createMatrixFinalAnswer();
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

// **** FUNKTSIOON, MIS GENEREERIB VAHEPEALSE VASTUSE MAATRIKSI ****
function createMatrixAnswer() {

	var matrixAnswerContainer = document.getElementById("matrixAnswerContainer");
	var mAnswerWidth = 42 * m2y * 3;
	var mAnswerHeight = 28 * m1x;

	var m1Width = 42 * m1y;
	var m2Width = 42 * m2y;
	var mAnswerPosition = m1Width + m2Width + 30;

	matrixAnswerContainer.style.width = mAnswerWidth + "px";
	matrixAnswerContainer.style.height = mAnswerHeight + "px";
	matrixAnswerContainer.style.left = mAnswerPosition + "px";

	var matrixAnswer = document.getElementById("matrixAnswer");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < m1x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < m2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "c" + rowId + colId);
			cell.setAttribute("class", "matrixAnswerInput");
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	matrixAnswer.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB LÕPLIKU VASTUSE MAATRIKSI ****
function createMatrixFinalAnswer() {

	var matrixFinalAnswerContainer = document.getElementById("matrixFinalAnswerContainer");
	var mFinalAnswerWidth = 42 * m2y;
	var mFinalAnswerHeight = 28 * m1x;

	var m1Width = 42 * m1y;
	var m2Width = 42 * m2y;
	var mAnswerWidth = 42 * m2y * 3;
	var mFinalAnswerPosition = m1Width + m2Width + mAnswerWidth + 40;

	matrixFinalAnswerContainer.style.width = mFinalAnswerWidth + "px";
	matrixFinalAnswerContainer.style.height = mFinalAnswerHeight + "px";
	matrixFinalAnswerContainer.style.left = mFinalAnswerPosition + "px";

	var matrixFinalAnswer = document.getElementById("matrixFinalAnswer");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < m1x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < m2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "d" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	matrixFinalAnswer.appendChild(tableBody);
}

// **** KÄIVITAB ARVUTAMISE ****
function calculateMatrix() {
	calculateMatrixAnswer();
    calculateMatrixFinalAnswer();
    document.getElementById("matrixAnswerContainer").style.display = "block"
    document.getElementById("matrixFinalAnswerContainer").style.display = "block";
    document.getElementById("checkAnswer").style.display = "none";

}
//sama mis eelmine, aga peidab eelmise lahenduse ja  nupud
function calculateNextMatrix() {
	calculateMatrixAnswer();
    calculateMatrixFinalAnswer();
    document.getElementById("matrixAnswerContainer").style.display = "none"
    document.getElementById("matrixFinalAnswerContainer").style.display = "none";
    document.getElementById("matrix1Container").style.display = "none";
    document.getElementById("matrix2Container").style.display = "none";
    document.getElementById("checkAnswer").style.display = "none";
    document.getElementById("calculateNext").style.display = "none";
}

// **** GENEREERIB VAHETULEMUSE ****
function calculateMatrixAnswer() {

    var c = 1;

    for (var x = 1; x <= m1x; x++) {

        for (var y = 1; y <= m2y; y++) {

            var matrixAnswer = document.getElementById("c" + x + y);
            var matrixAnswerString = "";

            for (var i = 0; i < m1y; i++) {
                (function () {

                    var a = document.getElementById("a" + x + c).value;
                    var b = document.getElementById("b" + c + y).value;
                    matrixAnswerString += a + "*" + b + " + ";

                    var aID = "a" + x + c;
                    var bID = "b" + c + y;
                    var cID = "c" + x + y;
                    highlighter(aID, bID, cID)
                    c++;

                }
                    ())
            }

            var strLength = matrixAnswerString.length;
            matrixAnswer.value = matrixAnswerString.slice(0, strLength - 3);
            
            c = 1;
        }
    }
}

// **** ARVUTAB MAATRIKSI VÄÄRTUSE ****
function calculateMatrixFinalAnswer() {

	var c = 1;

	for (var x = 1; x <= m1x; x++) {

		for (var y = 1; y <= m2y; y++) {

			var matrixAnswer = document.getElementById("d" + x + y);
			var matrixAnswerString = "";

			for (var i = 0; i < m1y; i++) {
				var a = document.getElementById("a" + x + c).value;
				var b = document.getElementById("b" + c + y).value;
				matrixAnswerString += a + "*" + b + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			matrixAnswer.value = math.eval(matrixAnswerString.slice(0, strLength - 3));
			c = 1;
		}
	}
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