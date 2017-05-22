/*function dropdownFunction() {
    document.getElementById("Ydropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdownbtn')) {
    var Ydropdowns = document.getElementsByClassName("YdropdownContent");
    var i;
    for (i=0; i<Ydropdowns.length; i++) {
      var openDropdown = Ydropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
	var e = document.getElementById("dropdown");
	var strUser = e.options[e.selectedIndex].text;
	console.log(strUser);
}
*/
//Välja printimiseks
var x1, x2, y1, y2;
var matrix = [];
var matrix1 = [];
var matrix2 = [];
var answerMatrix1 = [];
var answerMatrix2 = [];
var inputBoxvalue1;
var inputBoxvalue2;
var IDCounter = 0;



function ConfrmSelect() {
    x1 = document.getElementById("XSelect1").value;
	y1 = document.getElementById("YSelect1").value;
	
	x2 = document.getElementById("XSelect2").value;
	y2 = document.getElementById("YSelect2").value;
	
	if(y1 == x2){
		//http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
		console.log("Saab arvutada");
		//ei ole kindel, kas teeb maatriksid õigesti.
		/*
		for(var i=0; i<x1; i++) {
			matrix[i] = [];
			for(var j=0; j<y1; j++) {
				matrix[i][j] = undefined;
				console.log(matrix[i][j]);
				//CreateInput(x1);
			}
		}
		
		for(var i=0; i<x2; i++) {
			matrix[i] = [];
			for(var j=0; j<y2; j++) {
				matrix[i][j] = undefined;
				console.log(matrix[i][j]);
				//CreateInput();
			}
		}
		*/
		
		CreateTableInput1();
		CreateTableInput2();
		
	} else {
		console.log("Ei saa arvutada");
		alert("Arvutada ei saa. Muuda maaatriksi suurusi.");
	}
	
}

function CreateTableInput1(){
	/*var table = "<table>";
	for (var i=0; i<x1; i++) {
		table = table + "<tr><td>" + "<input>" + "</td><td>" + "<input>" + "</td></tr>"; 
	}
	table = table + "</table>";
	document.getElementById('InputTable1').innerHTML = table;

	
	table = "<table>";
	//table = table + "<tr><th>" + "Mänigja nimi" + "</th><th>" + "Tulemus" + "</th><tr>";
	for (var i=0; i<x2; i++) {
		table = table + "<tr><td>" + "<input>" + "</td><td>" + "<input>" + "</td></tr>"; 
	}
	table = table + "</table>";
	document.getElementById('InputTable2').innerHTML = table;	
	*/
	
	var InputTable1 = document.getElementById("InputTable1");
	// creates a <table> element and a <tbody> element
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	// creating all cells
	for(var i=0; i<x1; i++) {
	// creates a table row
		var row = document.createElement("tr");
		for (var j=0; j<x2; j++) {
			IDCounter++;
			//console.log(IDCounter);
			//var x = document.createElement("INPUT");
			//x.setAttribute("id", "inputmatrix");
			//x.setAttribute("type", "text");
			//document.body.appendChild(x);
			//var cell = document.createElement("td");
			var cell = document.createElement("INPUT");
			cell.setAttribute("id", "inputmatrix" + IDCounter);
			cell.setAttribute("type", "text");
			//var cellText = document.createTextNode("cell in row "+i+", column "+j);
			//cell.appendChild(cellText);
			row.appendChild(cell);
		}
		// add the row to the end of the table body
		tblBody.appendChild(row);
	}
	// put the <tbody> in the <table>
	tbl.appendChild(tblBody);
	// appends <table> into InputTable1
	InputTable1.appendChild(tbl);
	// sets the border attribute of tbl to 2;
	//tbl.setAttribute("border", "2");
}


function CreateTableInput2(){
	IDCounter = 30;
	//var InputTable2 = document.getElementById("InputTable2");
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	for(var i=0; i<x1; i++) {
		var row = document.createElement("tr");
		for(var j=0; j<x2; j++) {
			IDCounter++;
			var cell = document.createElement("INPUT");
			cell.setAttribute("id", "inputmatrix" + IDCounter);
			cell.setAttribute("type", "text");
			row.appendChild(cell);
		}
		tblBody.appendChild(row);
	}
	tbl.appendChild(tblBody);
	InputTable2.appendChild(tbl);
}

//EI TEA KAS ON KÕIGE OPTIMAALSEM VÄÄRTUSE SAAMISE VIIS
function Calculate(){
	
	for(var i=0; i<x1; i++) {
		matrix[i] = [];
		for(var j=0; j<y1; j++) {
			matrix[i][j] = undefined;
			console.log(matrix[i][j]);
			//CreateInput(x1);
		}
	}
	
	IDCounter = 0;
	for(var i=0; i<x1; i++) {
		for(var j=0; j<y1; j++) {
			IDCounter++;
			//console.log("IDCOUNTER1: "+IDCounter);
			//inputBoxvalue1 = document.getElementById("inputmatrix" + IDCounter).value;
			matrix[i][j] = document.getElementById("inputmatrix" + IDCounter).value;
			console.log("Maatriks: "+matrix[i][j] + "; I:" + i + "; J:"+j);
			//console.log("inputBoxvalue1: "+inputBoxvalue1);
			//matrix1.push(inputBoxvalue1);
			/*
			MAATRIKS PEAKS OLEMA KUJUL (2x2)
			1 2
			3 4
			*/
		}
	}
	console.log("Esimene maatriks: "+matrix1);
	IDCounter = 30;
	for(var i=0; i<x2; i++) {
		for(var j=0; j<y2; j++) {
			IDCounter++;
			//console.log("IDCOUNTER2: "+IDCounter);
			inputBoxvalue2 = document.getElementById("inputmatrix" + IDCounter).value;
			//console.log("inputBoxvalue2: "+inputBoxvalue2);
			matrix2.push(inputBoxvalue2);
			//var test+IDCounter = inputBoxvalue2;
			//console.log("MUUTUJA TEST+IDCOUNTER"+ window["test"+IDCounter]);
		}
	}
	console.log("Teine maatriks: " + matrix2);
	
	//http://jsfiddle.net/xW7d8/
	
	/*
	answerMatrix1 =
	answerMatrix2 = 
	
	
	for(var i=0; i<x1; i++) {
		for(var j=0; j<x2; j++) {
			var test = (matrix1[i]*matrix2[j]) + (matrix1[i]*matrix2[j]);
			console.log("TEST VASTUS TSÜKLI SEES: " + test);
		}
	}
	
	var test = (matrix1[0]*matrix2[0]) + (matrix1[1]*matrix2[2]);
	console.log("TEST VASTUS: "+test);
	*/
	
	
	//https://www.youtube.com/watch?v=x7zua7fhyIw
	//ASI MIDA VÕIK IMITEERIDA---->https://mkaz.tech/math/javascript-linear-algebra-calculator/
	
}

function Delete(){
	console.log("KUSTUTA");
	
	var tables = document.getElementsByTagName("TABLE");
	for (var i=tables.length-1; i>=0;i-=1){
		if (tables[i]){
			tables[i].parentNode.removeChild(tables[i]);
		}
	}
	
		
	//document.getElementById("InputTable1").deleteRow(0);
	
	/*
	var table = document.getElementById("InputTable1");
	var rowCount = table.rows.length;
	console.log("rowCount: "+rowCount);
	for(var i=0; i<x1; i++) {
		//for(var i=0; i<x2; i++) {
		//while(table.rows.length > 0) {
		  table.deleteRow(i);
		  console.log("KUSTUTA TSÜKLI SEES");
		//}
		}
	}
	*/
}

/* 2x2 maatriksi arvutamine
(inputmatrix1*inputmatrix31)+(inputmatrix2*inputmatrix33)	(inputmatrix1*inputmatrix32)+(inputmatrix2*inputmatrix34)
(inputmatrix3*inputmatrix31)+(inputmatrix4*inputmatrix33)	(inputmatrix3*inputmatrix32)+(inputmatrix4*inputmatrix34)
*/



//function CreateInput() {
	/*
	var x = document.createElement("INPUT");
	x.setAttribute("id", "inputmatrix");
	x.setAttribute("type", "text");
	document.body.appendChild(x);
	*/	
//}