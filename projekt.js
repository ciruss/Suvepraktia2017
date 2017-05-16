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
    //document.getElementById("test").innerHTML = x;
	y1 = document.getElementById("YSelect1").value;
    //document.getElementById("test2").innerHTML = y;
	
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
				CreateInput();
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
		
	} else {
		console.log("Ei saa arvutada");
	}
	
}

//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_text_create

//http://stackoverflow.com/questions/4035966/create-a-html-table-where-each-tr-is-a-form
function CreateInput() {
	var x = document.createElement("INPUT");
	x.setAttribute("id", "inputmatrix");
	x.setAttribute("type", "text");
	document.body.appendChild(x);
}
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_createelement2