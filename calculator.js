// **** GLOBAALSED MUUTUJAD ****

// kalkulaatori maatriksi mõõdu muutujad
var m1x, m1y, m2x, m2y;

// ||||| ----- ----- ----- ----- MAATRIKSITE KALKULAATORI OSA ----- ----- ----- ----- |||||

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****

//123
function generateMatrix() {
   
   //et kastid jälle nähtavale ilmuks
    document.getElementById("checkAnswer").style.display = "block";	
    document.getElementById("calculateNext").style.display = "block";
    document.getElementById("matrix1Container").style.display = "inline";
    document.getElementById("matrix2Container").style.display = "inline";
	document.getElementById("negativeNumber").style.display = "block";

	m1x = document.getElementById("m1x").value;
	m1y = document.getElementById("m1y").value;
	m2x = document.getElementById("m2x").value;
	m2y = document.getElementById("m2y").value;

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
			//cell.setAttribute("pattern", "\d");
			//cell.setAttribute("onkeypress", "return validate(this, event)");//<--TÖÖTAB
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
			//cell.setAttribute("onkeypress", "return validate(this, event)");//<--TÖÖTAB
			cell.setAttribute("maxlength", "10");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	matrix2.appendChild(tableBody);

}

//Loendab esimeses maatriksis olevad arvud kokku, ning viib mathJax kujule
function matrix1Values() {



 var answerString = "";
	var table = document.getElementById('matrix1');
        for (var r = 0, n = table.rows.length; r < n; r++) {
			if(r>=1){
			
			var strLength = answerString.length;
			answerString = (answerString.slice(0, strLength - 1));
			answerString +="\\\\\\\\";
			}
            for (var c = 0;c < m1y; c++){
				var rowId = r + 1;
				var colId = c + 1;
				if(c<m1y){
				var Cell = document.getElementById("a" + rowId + colId).value + "&";
				answerString += Cell;
				}else if(c==m1y){
				var Cell = document.getElementById("a" + rowId + colId).value;
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
			if(r>=1){
			var strLength = answerString.length;
			answerString = (answerString.slice(0, strLength - 1));
			answerString +="\\\\\\\\";
			};
		
            for (var c = 0; c < m2y; c++){
				var rowId = r + 1;
				var colId = c + 1; 
				if(c<m2y){
				var Cell = document.getElementById("b" + rowId + colId).value + "&";
				answerString+=Cell;
				}
				else if(c==m2y){
				var Cell = document.getElementById("b" + rowId + colId).value;
				answerString+=Cell;

				
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

    document.getElementById("matrixAnswerContainer").style.display = "block"
    document.getElementById("matrixFinalAnswerContainer").style.display = "block";
    document.getElementById("checkAnswer").style.display = "none";

}
//sama mis eelmine, aga peidab eelmise lahenduse ja  nupud
function calculateNextMatrix() {
    calculateMatrixSum();
    calculateMatrixFinalSum();

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
			finalString +="\\\\\\\\";
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
				var b = document.getElementById("b"+c+y).value;
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

			finalString +="\\\\\\\\";
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
			matrixAnswer.value = math.eval(matrixAnswerString.slice(0, strLength - 3));
			finalString += matrixAnswer.value;

			c = 1;
		}

	}

	var strLength = finalString.length;


	return finalString;
}



// **** LASEB SISESTADA AINULT NUMBREID JA ÜHE KALDKRIIPSU, ET SAAKS SISESTADA MURDE ****
/*
function validate(elementRef, event) {
	var keyCodeEntered = (event.which) ? event.which : (window.event.keyCode) ? window.event.keyCode : -1;
		console.log(event.keyCode);
		if ((keyCodeEntered >= 48) && (keyCodeEntered <= 57) || (keyCodeEntered === 8)) {
			return true;
		} else if (keyCodeEntered == 47) {
			if ((elementRef.value) && (elementRef.value.indexOf('/') >= 0)) {
				return false;
			} else {
				return true;
			}
		}
	return false;
}
*/

/*
function validate(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /^[0-9]*\/?[0-9]*$/;
	//([0-9]+(\.[0-9]+)?)
	//var regex = /\d+\.\d+/;
	
	console.log(evt.target);
	if(key==="/" && evt.target.value.indexOf('/') != -1){
		theEvent.returnValue = false;
			if(theEvent.preventDefault) theEvent.preventDefault();
	}
	
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
			if(theEvent.preventDefault) theEvent.preventDefault();
	}
	
}
*/


function validate(evt) {
key = evt.key
	var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "Tab", "Backspace"]
   if(allowed.indexOf(evt.key) == -1){   
	   evt.preventDefault()
   }
}


function negativeNumber(){
	for (var i = 0; i < m1x; i++) {
		for (var j = 0; j < m1y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var boxID = ("a" + rowId + colId);
			console.log(boxID);
			var number = document.getElementById("a" + rowId + colId).value;
			parseInt(number);
			console.log("Sisend: "+number);
			
			if(number<0){
				console.log("Number on väiksem");
			} else {
				console.log("Number on suurem");
			}		
			
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