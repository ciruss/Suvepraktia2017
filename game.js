// **** GLOBAALSED MUUTUJAD ****

// muutujad mängu jaoks
var matrixFinalAnswerErrors = 0;
var matrixPreAnswerErrors = 0;
//mängu skoori muutujad

var sumOfExercises = 0;
var errorCount = 0;
var playerName = "";

//timeri muutujad
var timeInSecs;
var ticker;

var answerCounter = 0;

// harjutusmaatriksi mõõdu muutujad
var EmFirstX, EmFirstY, EmSecondX, EmSecondY;

// massiivid harjutusmaatriksite väärtuste jaoks
var a = [[null, null, null]];
var b = [[null, null, null]];

// ||||| ----- ----- ----- ----- MAATRIKSITE HARJUTAMISE OSA ----- ----- ----- ----- |||||

//mängija nime küsimine
function setPlayerName() {
	playerName = prompt("Sisesta mängija nimi");
	if (playerName === null) {
		return;
	} else if (playerName === "") {
		playerName = "Nimetu";
	} else {
		document.getElementById("playerName").innerHTML = "NIMI: " + playerName;
		startTimer(600);
		//generateExerciseMatrix();
		generateRandomExerciseMatrix();
	}	
	document.getElementById("checkAndRestartRandom").style.display="inline";
	//document.getElementById("justForDevs").style.display="inline";
}

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****
function generateExerciseMatrix() {

	document.getElementById("exerciseMatrixFirstContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixSecondContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "visible";

	document.getElementById("justForDevs").style.visibility = "visible";
	document.getElementById("checkAndRestart").style.visibility = "visible";

	EmFirstX = 1;
	EmFirstY = 1;
	EmSecondX = 1;
	EmSecondY = 1;

	var EmFirst = document.getElementById("exerciseMatrixFirst");
	var EmSecond = document.getElementById("exerciseMatrixSecond");
	var EmPA = document.getElementById("exerciseMatrixPreAnswer");
	var EmFA = document.getElementById("exerciseMatrixAnswer");

	if (EmFirstY === EmSecondX) {

		//console.log("Saab arvutada");
		//console.log("Esimene maatriks on EmFirstX x EmFirstY (" + EmFirstX + " x " + EmFirstY + ")");
		//console.log("Teine maatriks on EmSecondX x EmSecondY (" + EmSecondX + " x " + EmSecondY + ")");

		if (EmFirst && EmSecond && EmFA && EmPA) {

			EmFirst.innerHTML = "";
			EmSecond.innerHTML = "";
			EmPA.innerHTML = "";
			EmFA.innerHTML = "";

			createExerciseMatrixFirst();
			createexerciseMatrixSecond();
			createExerciseMatrixPreAnswer();
			createExerciseMatrixAnswer();
			generateValuesForMatrices();

		} else {

			createExerciseMatrixFirst();
			createexerciseMatrixSecond();
			createExerciseMatrixPreAnswer();
			createExerciseMatrixAnswer();
			generateValuesForMatrices();
		}

	} else {
		console.log("Ei saa arvutada");
		alert("Ei saa genereerida, muuda maatriksite suuruseid!");
	}
}

// **** GENEREERIB SUVALISE SUURUSEGA MAATRIKSID ****
function generateRandomExerciseMatrix() {

	document.getElementById("exerciseMatrixFirstContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixSecondContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "visible";

	document.getElementById("beginGame").style.visibility = "hidden";
	//document.getElementById("justForDevs").style.visibility = "visible";
	document.getElementById("checkAndRestartRandom").style.visibility = "visible";

	EmFirstX = Math.floor((Math.random() * 5) + 1);
	EmFirstY = Math.floor((Math.random() * 5) + 1);
	EmSecondX = EmFirstY;
	EmSecondY = Math.floor((Math.random() * 5) + 1);

	var EmFirst = document.getElementById("exerciseMatrixFirst");
	var EmSecond = document.getElementById("exerciseMatrixSecond");
	var EmFA = document.getElementById("exerciseMatrixAnswer");
	var EmPA = document.getElementById("exerciseMatrixPreAnswer");

	if (EmFirstY === EmSecondX) {

		//console.log("Saab arvutada Random");
		//console.log("Esimene maatriks on EmFirstX x EmFirstY (" + EmFirstX + " x " + EmFirstY + ")");
		//console.log("Teine maatriks on EmSecondX x EmSecondY (" + EmSecondX + " x " + EmSecondY + ")");

		if (EmFirst && EmSecond && EmFA && EmPA) {

			EmFirst.innerHTML = "";
			EmSecond.innerHTML = "";
			EmFA.innerHTML = "";
			EmPA.innerHTML = "";

			createExerciseMatrixFirst();
			createexerciseMatrixSecond();
			createExerciseMatrixAnswer();
			createExerciseMatrixPreAnswer();
			generateValuesForMatrices();

		} else {

			createExerciseMatrixFirst();
			createexerciseMatrixSecond();
			createExerciseMatrixAnswer();
			createExerciseMatrixPreAnswer();
			generateValuesForMatrices();
		}
	} else {
		console.log("Ei saa arvutada");
		alert("Ei saa genereerida, muuda maatriksite suuruseid!");
	}
}

// **** FUNKTSIOON, MIS GENEREERIB ESIMESE HARJUTUSMAATRIKSI ****

function createExerciseMatrixFirst() {
//VIIDE: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
	var exerciseMatrixFirstContainer = document.getElementById("exerciseMatrixFirstContainer");
	var EmFirstWidth = 42 * EmFirstY;
	var EmFirstHeight = 28 * EmFirstX;
	exerciseMatrixFirstContainer.style.width = EmFirstWidth + "px";
	exerciseMatrixFirstContainer.style.height = EmFirstHeight + "px";

	var exerciseMatrixFirst = document.getElementById("exerciseMatrixFirst");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= EmFirstX; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= EmFirstY; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ea" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrixFirst.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB TEISE HARJUTUSMAATRIKSI ****
function createexerciseMatrixSecond() {

	var exerciseMatrixSecondContainer = document.getElementById("exerciseMatrixSecondContainer");
	var EmSecondWidth = 42 * EmSecondY;
	var EmSecondHeight = 28 * EmSecondX;

	var EmFirstWidth = 42 * EmFirstY;
	var EmSecondPosition = EmFirstWidth + 20;

	exerciseMatrixSecondContainer.style.width = EmSecondWidth + "px";
	exerciseMatrixSecondContainer.style.height = EmSecondHeight + "px";
	exerciseMatrixSecondContainer.style.left = EmSecondPosition + "px";

	var exerciseMatrixSecond = document.getElementById("exerciseMatrixSecond");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= EmSecondX; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= EmSecondY; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Eb" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrixSecond.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB VAHETULEMUSTE MAATRIKSI ****
function createExerciseMatrixPreAnswer() {
//VIIDE: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
	var exerciseMatrixPreAnswerContainer = document.getElementById("exerciseMatrixPreAnswerContainer");
	var EmAnswerWidth = 42 * EmSecondY * 3;
	var EmAnswerHeight = 28 * EmFirstX;

	var EmFirstWidth = 42 * EmFirstY;
	var EmSecondWidth = 42 * EmSecondY;
	var EmPreAnswerPosition = EmFirstWidth + EmSecondWidth + 30;

	exerciseMatrixPreAnswerContainer.style.width = EmAnswerWidth + "px";
	exerciseMatrixPreAnswerContainer.style.height = EmAnswerHeight + "px";
	exerciseMatrixPreAnswerContainer.style.left = EmPreAnswerPosition + "px";

	var exerciseMatrixPreAnswer = document.getElementById("exerciseMatrixPreAnswer");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < EmFirstX; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < EmSecondY; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ed" + rowId + colId);
			cell.setAttribute("class", "matrixAnswerInput");
			cell.setAttribute("type", "text");
			cell.setAttribute("onkeypress", "validate(event)");
			cell.setAttribute("onkeypress", "return validate( event)");
			//cell.setAttribute("oninput", "checkLength(2,this)");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrixPreAnswer.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB VASTUSEMAATRIKSI ****
function createExerciseMatrixAnswer() {
//VIIDE: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
	var exerciseMatrixAnswerContainer = document.getElementById("exerciseMatrixAnswerContainer");
	var EmAnswerWidth = 42 * EmSecondY;
	var EmAnswerHeight = 28 * EmFirstX;

	var EmFirstWidth = 42 * EmFirstY;
	var EmSecondWidth = 42 * EmSecondY;
	var EmPreAnswerWidth = 42 * EmSecondY * 3;
	var EmAnswerPosition = EmFirstWidth + EmSecondWidth + EmPreAnswerWidth + 40;

	exerciseMatrixAnswerContainer.style.width = EmAnswerWidth + "px";
	exerciseMatrixAnswerContainer.style.height = EmAnswerHeight + "px";
	exerciseMatrixAnswerContainer.style.left = EmAnswerPosition + "px";

	var exerciseMatrixAnswer = document.getElementById("exerciseMatrixAnswer");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= EmFirstX; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= EmSecondY; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ec" + rowId + colId);
			cell.setAttribute("type", "text");
			cell.setAttribute("onkeypress", "validate(event)");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrixAnswer.appendChild(tableBody);
}

// **** KÄIVITAB ARVUDE GENEREERIMISE MAATRIKSISSE ****
function generateValuesForMatrices() {
	generateValuesForMatrixFirst();
	generateValuesForMatrixSecond();
}

// **** GENEREERIB VÄÄRTUSED ESIMESSE MAATRIKSISSE JA MASSIIVI ****
function generateValuesForMatrixFirst() {

	for (var rowId = 1; rowId <= EmFirstX; rowId++) {

		var matrixRow = [null];

		for (var colId = 1; colId <= EmFirstY; colId++) {
			var randomValue = Math.floor((Math.random() * 10) + 1);
			matrixRow.push(randomValue);
			var matrixCell = document.getElementById("Ea" + rowId + colId);
			matrixCell.value = randomValue;
		}
		a.push(matrixRow);
		matrixRow = [null];
	}
}

// **** GENEREERIB VÄÄRTUSED TEISE MAATRIKSISSE JA MASSIIVI ****
function generateValuesForMatrixSecond() {

	for (var rowId = 1; rowId <= EmSecondX; rowId++) {

		var matrixRow = [null];

		for (var colId = 1; colId <= EmSecondY; colId++) {
			var randomValue = Math.floor((Math.random() * 10) + 1);
			matrixRow.push(randomValue);
			var matrixCell = document.getElementById("Eb" + rowId + colId);
			matrixCell.value = randomValue;
		}
		b.push(matrixRow);
		matrixRow = [null];
	}
}

// **** KONTROLLIB MAATRIKSITE VASTUSEID ****
function checkMatrixFinalAnswers() {

	var c = 1;

	for (var rowId = 1; rowId <= EmFirstX; rowId++) {
		for (var colId = 1; colId <= EmSecondY; colId++) {

			var matrixAnswer = document.getElementById("Ec" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < EmFirstY; i++) {
				var Ea = document.getElementById("Ea" + rowId + c).value;
				var Eb = document.getElementById("Eb" + c + colId).value;
				matrixAnswerString += Ea + "*" + Eb + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			var matrixCellValue = math.eval(matrixAnswerString.slice(0, strLength - 3));
			var matrixInputCell = parseInt(matrixAnswer.value);
			c = 1;

			if (matrixInputCell == matrixCellValue) {
				matrixAnswer.style.color = "green";
			} else {
				matrixAnswer.style.color = "red";
				//errorCount += 1;
				matrixFinalAnswerErrors++;
			}
		}
	}
}

// **** KONTROLLIB VAHEMAATRIKSITE VASTUSEID ****
function checkMatrixPreAnswers() {

	var c = 1;

	for (var rowId = 1; rowId <= EmFirstX; rowId++) {
		for (var colId = 1; colId <= EmSecondY; colId++) {

			var matrixAnswer = document.getElementById("Ed" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < EmFirstY; i++) {
				var Ea = document.getElementById("Ea" + rowId + c).value;
				var Eb = document.getElementById("Eb" + c + colId).value;
				matrixAnswerString += Ea + "*" + Eb + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			var matrixCellValue = matrixAnswerString.slice(0, strLength - 3);
			var matrixInputCell = matrixAnswer.value;
			c = 1;

			if (matrixInputCell === matrixCellValue) {
				matrixAnswer.style.color = "green";
				//answerCounter += 1
				//score += 1
			} else {
				matrixAnswer.style.color = "red";
				//errorCount += 1;
				matrixPreAnswerErrors++;
			}
		}
	}
}

// **** JUST FOR DEVS FUNKTSIOON, MIS GENEREERIB MÄNGU TESTIMISEKS MAATRIKSITESSE ÕIGED VASTUSED ****
/*
function justForDevsMatrixAnswers() {

	var c = 1;

	for (var rowId = 1; rowId <= EmFirstX; rowId++) {

		for (var colId = 1; colId <= EmSecondY; colId++) {

			var matrixFinalAnswer = document.getElementById("Ec" + rowId + colId);
			var matrixAnswer = document.getElementById("Ed" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < EmFirstY; i++) {

				var Ea = document.getElementById("Ea" + rowId + c).value;
				var Eb = document.getElementById("Eb" + c + colId).value;
				matrixAnswerString += Ea + "*" + Eb + " + ";
				c++;
			}
			var strLength = matrixAnswerString.length;
			matrixAnswer.value = matrixAnswerString.slice(0, strLength - 3);
			matrixFinalAnswer.value = math.eval(matrixAnswerString.slice(0, strLength - 3));
			c = 1;
		}
	}
}
*/

// **** KÄIVITAB MAATRIKSITE VASTUSTE KONTROLLI (mitte random suurustega kuvatud maatriksid) ****
function checkMatrixAnswers() {

	checkMatrixFinalAnswers();
	checkMatrixPreAnswers();

	if (matrixFinalAnswerErrors === 0 && matrixPreAnswerErrors === 0) {
		updateScore();
		generateExerciseMatrix();
	} else {
		updateScore();
	}
	matrixFinalAnswerErrors = 0;
	matrixPreAnswerErrors = 0;
}

// **** KÄIVITAB MAATRIKSITE VASTUSTE KONTROLLI (random suurustega kuvatud maatriksid) ****
function checkMatrixAnswersRandom() {

	checkMatrixFinalAnswers();
	checkMatrixPreAnswers();

	if (matrixFinalAnswerErrors === 0 && matrixPreAnswerErrors === 0) {
		var matrixScore = EmFirstX * EmFirstY * EmSecondX * EmSecondY;
		console.log("");
		console.log("Maatriks suurusega " + EmFirstX + "x" + EmFirstY + " x " + EmSecondX + "x" + EmSecondY);
		console.log("Skoori arvutamine " + EmFirstX + "*" + EmFirstY + "*" + EmSecondX + "*" + EmSecondY + " = " + (EmFirstX * EmFirstY * EmSecondX * EmSecondY));
		
		sumOfExercises++;
		updateScore();
		generateRandomExerciseMatrix();
	} else {
		var matrixErrorScore = parseInt((EmFirstX * EmFirstY * EmSecondX * EmSecondY) / 2, 10);
		console.log("");
		console.log("Maatriks suurusega " + EmFirstX + "x" + EmFirstY + " x " + EmSecondX + "x" + EmSecondY);
		console.log("Vea skoori arvutamine " + "(" + EmFirstX + "*" + EmFirstY + "*" + EmSecondX + "*" + EmSecondY + ")/2" + " = " + ((EmFirstX * EmFirstY * EmSecondX * EmSecondY) / 2));
		
		console.log("");
		errorCount++;
		updateScore();
	}
	matrixFinalAnswerErrors = 0;
	matrixPreAnswerErrors = 0;
}

//TULEMUSTE SALVESTAMINE LOCALSTORAGESSE
/*
function saveStatsToLocalstorage(dataObject) {
	if (!localStorage["top"]) {
		var arr = []
		arr.push(dataObject)
		localStorage.setItem("top", JSON.stringify(arr))
	} else {
		var arr = JSON.parse(localStorage.getItem("top"))
			arr.push(dataObject)
			var sorted = sortArray(arr)
			localStorage.setItem("top", JSON.stringify(sorted));
	}
}

function sortArray(arr) {
	arr.sort(function (a, b) {
		return b.score - a.score;
	});
	var sliceArray = arr.slice(0, 10)
		return sliceArray
}

function loadStatsFromLocalStorage() {
	if (localStorage.getItem("top")) {
		var arr = JSON.parse(localStorage.getItem("top"))
			createTable(arr)
	}
}
*/

// MÄNGU SKOORI FUNKTSIOONID
function resetScore() {
	//document.getElementById("justForDevs").style.visibility = "hidden";
	document.getElementById("checkAndRestartRandom").style.visibility = "hidden";
	document.getElementById("beginGame").style.visibility = "visible";

	document.getElementById("exerciseMatrixFirstContainer").style.visibility = "hidden";
	document.getElementById("exerciseMatrixSecondContainer").style.visibility = "hidden";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "hidden";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "hidden";

	alert("MÄNG LÄBI! Vigu tegid kokku " + errorCount + ", maatrikseid kokku: " + sumOfExercises);

	sumOfExercises = 0;
	errorCount = 0;
	updateScore();

}

function updateScore() {
	document.getElementById("TotalSum").innerHTML = "MAATRIKSEID KOKKU: " + sumOfExercises;
	document.getElementById("wrongAnswers").innerHTML = "VIGU: " + errorCount;
	document.getElementById("playerName").innerHTML = "NIMI: " + playerName;
}

//UUE MÄNGU ALUSTAMINE
function startNewGame() {

	document.getElementById("generateExerciseMatrix").style.visibility = "visible";
	document.getElementById("generateRandomExerciseMatrix").style.visibility = "visible";
	document.getElementById("startNewGame").style.visibility = "hidden";

	window.location.reload(false);
	generateExerciseMatrix();
}

//TAIMER
function startTimer(secs) {
	timeInSecs = parseInt(secs) - 1;
	ticker = setInterval("tick()", 1000); // every second
}

function tick() {
	var secs = timeInSecs;
	if (secs >= 0) {
		timeInSecs--;
	} else {
		clearInterval(ticker); // stop counting at zero
		resetScore();
		// startTimer(60);  // remove forward slashes in front of startTimer to repeat if required
	}
	if (secs == -1) {
		document.getElementById("stopper").innerHTML = "AEG: " + 0;
	} else {
		document.getElementById("stopper").innerHTML = "AEG: " + secs;
	}
	if (secs = 0) {
		resetScore();
		clearInterval(ticker)
	}
}

// **** KONTROLLIB SISESTUST *****
function validate(evt) {
    key = evt.key;
    var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "-", "*","+", "Tab", "Backspace"];
    if (allowed.indexOf(evt.key) == -1) {
        evt.preventDefault();
        //console.log("EI LUBA");
    }
    // PRAEGUNE
    if (evt.key === "/" && evt.target.value.indexOf('/') != -1) {
        evt.preventDefault();
    }
}