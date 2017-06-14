// **** GLOBAALSED MUUTUJAD ****

// muutujad mängu jaoks
var matrixFinalAnswerErrors = 0;
var matrixPreAnswerErrors = 0;
//mängu skoori muutujad
var score = 0;
var sumOfExercises = 0;
var errorCount = 0;
var playerName = "";

//timeri muutujad
var timeInSecs;
var ticker;

var answerCounter = 0;

// harjutusmaatriksi mõõdu muutujad
var Em1x, Em1y, Em2x, Em2y;

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
		document.getElementById("playerName").innerHTML = "MÄNGIJA: " + playerName;
		startTimer(60);
		//generateExerciseMatrix();
		generateRandomExerciseMatrix();
	}
}

// **** ÜLDINE FUNKTSIOON MAATRIKSITE GENEREERIMISEKS ****
function generateExerciseMatrix() {

	document.getElementById("exerciseMatrix1Container").style.visibility = "visible";
	document.getElementById("exerciseMatrix2Container").style.visibility = "visible";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "visible";

	document.getElementById("justForDevs").style.visibility = "visible";
	document.getElementById("checkAndRestart").style.visibility = "visible";

	Em1x = 1;
	Em1y = 1;
	Em2x = 1;
	Em2y = 1;

	var Em1 = document.getElementById("exerciseMatrix1");
	var Em2 = document.getElementById("exerciseMatrix2");
	var EmPA = document.getElementById("exerciseMatrixPreAnswer");
	var EmFA = document.getElementById("exerciseMatrixAnswer");

	if (Em1y === Em2x) {

		//console.log("Saab arvutada");
		//console.log("Esimene maatriks on Em1x x Em1y (" + Em1x + " x " + Em1y + ")");
		//console.log("Teine maatriks on Em2x x Em2y (" + Em2x + " x " + Em2y + ")");

		if (Em1 && Em2 && EmFA && EmPA) {

			Em1.innerHTML = "";
			Em2.innerHTML = "";
			EmPA.innerHTML = "";
			EmFA.innerHTML = "";

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixPreAnswer();
			createExerciseMatrixAnswer();
			generateValuesForMatrices();

		} else {

			createExerciseMatrix1();
			createExerciseMatrix2();
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

	document.getElementById("exerciseMatrix1Container").style.visibility = "visible";
	document.getElementById("exerciseMatrix2Container").style.visibility = "visible";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "visible";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "visible";

	document.getElementById("beginGame").style.visibility = "hidden";
	document.getElementById("justForDevs").style.visibility = "visible";
	document.getElementById("checkAndRestartRandom").style.visibility = "visible";

	Em1x = Math.floor((Math.random() * 5) + 1);
	Em1y = Math.floor((Math.random() * 5) + 1);
	Em2x = Em1y;
	Em2y = Math.floor((Math.random() * 5) + 1);

	var Em1 = document.getElementById("exerciseMatrix1");
	var Em2 = document.getElementById("exerciseMatrix2");
	var EmFA = document.getElementById("exerciseMatrixAnswer");
	var EmPA = document.getElementById("exerciseMatrixPreAnswer");

	if (Em1y === Em2x) {

		//console.log("Saab arvutada Random");
		//console.log("Esimene maatriks on Em1x x Em1y (" + Em1x + " x " + Em1y + ")");
		//console.log("Teine maatriks on Em2x x Em2y (" + Em2x + " x " + Em2y + ")");

		if (Em1 && Em2 && EmFA && EmPA) {

			Em1.innerHTML = "";
			Em2.innerHTML = "";
			EmFA.innerHTML = "";
			EmPA.innerHTML = "";

			createExerciseMatrix1();
			createExerciseMatrix2();
			createExerciseMatrixAnswer();
			createExerciseMatrixPreAnswer();
			generateValuesForMatrices();

		} else {

			createExerciseMatrix1();
			createExerciseMatrix2();
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

function createExerciseMatrix1() {

	var exerciseMatrix1Container = document.getElementById("exerciseMatrix1Container");
	var Em1Width = 42 * Em1y;
	var Em1Height = 28 * Em1x;
	exerciseMatrix1Container.style.width = Em1Width + "px";
	exerciseMatrix1Container.style.height = Em1Height + "px";

	var exerciseMatrix1 = document.getElementById("exerciseMatrix1");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= Em1x; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= Em1y; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ea" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrix1.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB TEISE HARJUTUSMAATRIKSI ****
function createExerciseMatrix2() {

	var exerciseMatrix2Container = document.getElementById("exerciseMatrix2Container");
	var Em2Width = 42 * Em2y;
	var Em2Height = 28 * Em2x;

	var Em1Width = 42 * Em1y;
	var Em2Position = Em1Width + 20;

	exerciseMatrix2Container.style.width = Em2Width + "px";
	exerciseMatrix2Container.style.height = Em2Height + "px";
	exerciseMatrix2Container.style.left = Em2Position + "px";

	var exerciseMatrix2 = document.getElementById("exerciseMatrix2");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= Em2x; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= Em2y; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Eb" + rowId + colId);
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrix2.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB VAHETULEMUSTE MAATRIKSI ****
function createExerciseMatrixPreAnswer() {

	var exerciseMatrixPreAnswerContainer = document.getElementById("exerciseMatrixPreAnswerContainer");
	var EmAnswerWidth = 42 * Em2y * 3;
	var EmAnswerHeight = 28 * Em1x;

	var Em1Width = 42 * Em1y;
	var Em2Width = 42 * Em2y;
	var EmPreAnswerPosition = Em1Width + Em2Width + 30;

	exerciseMatrixPreAnswerContainer.style.width = EmAnswerWidth + "px";
	exerciseMatrixPreAnswerContainer.style.height = EmAnswerHeight + "px";
	exerciseMatrixPreAnswerContainer.style.left = EmPreAnswerPosition + "px";

	var exerciseMatrixPreAnswer = document.getElementById("exerciseMatrixPreAnswer");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < Em1x; i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < Em2y; j++) {
			var rowId = i + 1;
			var colId = j + 1;
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ed" + rowId + colId);
			cell.setAttribute("class", "matrixAnswerInput");
			cell.setAttribute("type", "text");
			cell.setAttribute("onkeypress", "return validate(this, event)");
			//cell.setAttribute("oninput", "checkLength(2,this)");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrixPreAnswer.appendChild(tableBody);
}

// **** FUNKTSIOON, MIS GENEREERIB VASTUSEMAATRIKSI ****
function createExerciseMatrixAnswer() {

	var exerciseMatrixAnswerContainer = document.getElementById("exerciseMatrixAnswerContainer");
	var EmAnswerWidth = 42 * Em2y;
	var EmAnswerHeight = 28 * Em1x;

	var Em1Width = 42 * Em1y;
	var Em2Width = 42 * Em2y;
	var EmPreAnswerWidth = 42 * Em2y * 3;
	var EmAnswerPosition = Em1Width + Em2Width + EmPreAnswerWidth + 40;

	exerciseMatrixAnswerContainer.style.width = EmAnswerWidth + "px";
	exerciseMatrixAnswerContainer.style.height = EmAnswerHeight + "px";
	exerciseMatrixAnswerContainer.style.left = EmAnswerPosition + "px";

	var exerciseMatrixAnswer = document.getElementById("exerciseMatrixAnswer");
	var tableBody = document.createElement("tbody");

	for (var rowId = 1; rowId <= Em1x; rowId++) {
		var row = document.createElement("tr");

		for (var colId = 1; colId <= Em2y; colId++) {
			var cell = document.createElement("input");
			cell.setAttribute("id", "Ec" + rowId + colId);
			cell.setAttribute("type", "text");
			cell.setAttribute("onkeypress", "return validate(this, event)");
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	exerciseMatrixAnswer.appendChild(tableBody);
}

// **** KÄIVITAB ARVUDE GENEREERIMISE MAATRIKSISSE ****
function generateValuesForMatrices() {
	generateValuesForMatrix1();
	generateValuesForMatrix2();
}

// **** GENEREERIB VÄÄRTUSED ESIMESSE MAATRIKSISSE JA MASSIIVI ****
function generateValuesForMatrix1() {

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		var matrixRow = [null];

		for (var colId = 1; colId <= Em1y; colId++) {
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
function generateValuesForMatrix2() {

	for (var rowId = 1; rowId <= Em2x; rowId++) {

		var matrixRow = [null];

		for (var colId = 1; colId <= Em2y; colId++) {
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

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		for (var colId = 1; colId <= Em2y; colId++) {

			var matrixAnswer = document.getElementById("Ec" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < Em1y; i++) {
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
				//answerCounter += 1
				//score += 1
				//console.log("skoor " + score)
				//console.log("lahendatud maatrikseid: " + sumOfExercises)
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

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		for (var colId = 1; colId <= Em2y; colId++) {

			var matrixAnswer = document.getElementById("Ed" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < Em1y; i++) {
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
function justForDevsMatrixAnswers() {

	var c = 1;

	for (var rowId = 1; rowId <= Em1x; rowId++) {

		for (var colId = 1; colId <= Em2y; colId++) {

			var matrixFinalAnswer = document.getElementById("Ec" + rowId + colId);
			var matrixAnswer = document.getElementById("Ed" + rowId + colId);
			var matrixAnswerString = "";

			for (var i = 0; i < Em1y; i++) {

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
		var matrixScore = Em1x * Em1y * Em2x * Em2y;
		console.log("");
		console.log("Maatriks suurusega " + Em1x + "x" + Em1y + " x " + Em2x + "x" + Em2y);
		console.log("Skoori arvutamine " + Em1x + "*" + Em1y + "*" + Em2x + "*" + Em2y + " = " + (Em1x * Em1y * Em2x * Em2y));
		console.log("Skoor kokku " + score + "+" + matrixScore + " = " + (score + matrixScore));
		sumOfExercises++;
		score += matrixScore;
		updateScore();
		generateRandomExerciseMatrix();
	} else {
		var matrixErrorScore = parseInt((Em1x * Em1y * Em2x * Em2y) / 2, 10);
		console.log("");
		console.log("Maatriks suurusega " + Em1x + "x" + Em1y + " x " + Em2x + "x" + Em2y);
		console.log("Vea skoori arvutamine " + "(" + Em1x + "*" + Em1y + "*" + Em2x + "*" + Em2y + ")/2" + " = " + ((Em1x * Em1y * Em2x * Em2y) / 2));
		console.log("Skoor kokku " + score + "-" + matrixErrorScore + " = " + (score - matrixErrorScore));
		console.log("");
		score -= matrixErrorScore;
		errorCount++;
		updateScore();
	}
	matrixFinalAnswerErrors = 0;
	matrixPreAnswerErrors = 0;
}

//TULEMUSTE SALVESTAMINE LOCALSTORAGESSE

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

// MÄNGU SKOORI FUNKTSIOONID
function resetScore() {
	document.getElementById("justForDevs").style.visibility = "hidden";
	document.getElementById("checkAndRestartRandom").style.visibility = "hidden";
	document.getElementById("beginGame").style.visibility = "visible";

	document.getElementById("exerciseMatrix1Container").style.visibility = "hidden";
	document.getElementById("exerciseMatrix2Container").style.visibility = "hidden";
	document.getElementById("exerciseMatrixAnswerContainer").style.visibility = "hidden";
	document.getElementById("exerciseMatrixPreAnswerContainer").style.visibility = "hidden";

	alert("MÄNG LÄBI! Sinu skoor: " + score + ", vigu tegid kokku " + errorCount + ", maatrikseid kokku: " + sumOfExercises)

	score = 0;
	sumOfExercises = 0;
	errorCount = 0;
	updateScore();

}

function updateScore() {
	document.getElementById("playerScore").innerHTML = "SKOOR: " + score;
	document.getElementById("TotalSum").innerHTML = "MAATRIKSEID KOKKU: " + sumOfExercises;
	document.getElementById("wrongAnswers").innerHTML = "VIGU: " + errorCount;
	document.getElementById("playerName").innerHTML = "MÄNGIJA: " + playerName;
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
	var allowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " ", "/", "-", "*", "+", "Tab", "Backspace"];
	if(allowed.indexOf(evt.key) == -1){
		evt.preventDefault();
		//console.log("EI LUBA");
	}
}