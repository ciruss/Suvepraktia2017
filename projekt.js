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

function ConfrmSelect() {
    x1 = document.getElementById("XSelect1").value;
	y1 = document.getElementById("YSelect1").value;
	
	x2 = document.getElementById("XSelect2").value;
	y2 = document.getElementById("YSelect2").value;
	
	if(y1 == x2){
		//http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
		console.log("Saab arvutada");
		//ei ole kindel, kas teeb maatriksid õigesti.
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
		
		CreateTableInput(x1, x2);
		
	} else {
		console.log("Ei saa arvutada");
	}
	
}

function CreateTableInput(x1, x2){
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


//NII TEEB DÜNAAMILISELT KASTE AGA EI OLE INPUT KASTE
var body = document.getElementsByTagName("body")[0];
 
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
 
  // creating all cells
  for (var i = 0; i < x1; i++) {
    // creates a table row
    var row = document.createElement("tr");
    for (var j = 0; j < x2; j++) {	  
		//var x = document.createElement("INPUT");
		//x.setAttribute("id", "inputmatrix");
		//x.setAttribute("type", "text");
		//document.body.appendChild(x);
		
		//var cell = document.createElement("td");
		var cell = document.createElement("INPUT");
		cell.setAttribute("id", "inputmatrix");
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
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}


//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_text_create

//function CreateInput() {
//http://stackoverflow.com/questions/4035966/create-a-html-table-where-each-tr-is-a-form

	/*
	var x = document.createElement("INPUT");
	x.setAttribute("id", "inputmatrix");
	x.setAttribute("type", "text");
	document.body.appendChild(x);
	*/	
//}
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_createelement2