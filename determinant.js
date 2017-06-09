var mx, my;

var detNumbers = [];
var inversionCount = 0;

function calculateDeterminant() {
	
	var determinant = document.getElementById("determinant").value;
	
	if(determinant === "4") {
		determinantFor4();
	}
	
	if(determinant === "5") {
		determinantFor5();
	}
	
	if(determinant === "3") {
		determinantFor3();
	}
	
	if(determinant === "2") {
		determinantFor2();
	}
	
	
}












function determinantFor2() {
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 2; i++) {
		
		//console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
		
		var detNumbers2 = [1, 2];
		var detNumbersTemp = [];
		
		
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
			
			console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount);
			
			detNumbers.push(detNumbersTemp);
			detNumbersTemp = [];
			inversionCount = 0;
	}
}





function determinantFor3() {
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 3; i++) {
		
		//console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
		
		var detNumbers3 = [1, 2, 3];
		var detNumbersTemp = [];
		
		
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
			
			console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount);
			
			detNumbers.push(detNumbersTemp);
			detNumbersTemp = [];
			inversionCount = 0;
		}
	}
}






function determinantFor4() {
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 4; i++) {
		
		//console.log("tsykkel 1 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
		
		var detNumbers4 = [1, 2, 3, 4];
		var detN4 = detNumbers4.toString();
		
		var detNumbersTemp = [];
		
		
		// teine tsükkel, mis määrab ära teise numbri
		for(var j = 0; j < 3; j++) {
			
			//console.log("tsykkel 2 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
			
			var detNumbers3 = [];
			for(var n3 = 0; n3 < 4; n3++) {
				detNumbers3[n3] = detNumbers4[n3];
			}
			
			detNumbers3.splice(i, 1);
			var detN3 = detNumbers3.toString();
			
			
			// kolmas tsükkel, mis määrab ära kolmanda numbri
			for(var k = 0; k < 2; k++) {
				
				//console.log("tsykkel 3 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
				
				var detNumbers2 = [];
				for(var n2 = 0; n2 < 3; n2++) {
					detNumbers2[n2] = detNumbers3[n2];
				}
				
				detNumbers2.splice(j, 1);
				var detN2 = detNumbers2.toString();
				
				
				// neljas tsükkel, mis määrab ära neljanda numbri
				for(var l = 0; l < 1; l++) {
					
					//console.log("tsykkel 4 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l);
					
					var detNumbers1 = [];
					for(n1 = 0; n1 < 2; n1++) {
						detNumbers1[n1] = detNumbers2[n1];
					}
					
					detNumbers1.splice(k, 1);
					var detN1 = detNumbers1.toString();
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
				
				console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount);
				
				detNumbers.push(detNumbersTemp);
				detNumbersTemp = [];
				inversionCount = 0;
			}
		}
	}
}



function determinantFor5() {
	
	// esimene tsükkel, mis määrab ära esimese numbri
	for(var i = 0; i < 5; i++) {
		
		//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
		
		var detNumbers5 = [1, 2, 3, 4, 5];
		var detN5 = detNumbers5.toString();
		
		var detNumbersTemp = [];
		
		
		// teine tsükkel, mis määrab ära teise numbri
		for(var j = 0; j < 4; j++) {
			
			//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
			
			var detNumbers4 = [];
			for(var n4 = 0; n4 < 5; n4++) {
				detNumbers4[n4] = detNumbers5[n4];
			}
			
			detNumbers4.splice(i, 1);
			var detN4 = detNumbers4.toString();
			
			// kolmas tsükkel, mis määrab ära kolmanda numbri
			for(var k = 0; k < 3; k++) {
				
				//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
				
				var detNumbers3 = [];
				for(var n3 = 0; n3 < 4; n3++) {
					detNumbers3[n3] = detNumbers4[n3];
				}
				
				detNumbers3.splice(j, 1);
				var detN3 = detNumbers3.toString();
				
				// neljas tsükkel, mis määrab ära neljanda numbri
				for(var l = 0; l < 2; l++) {
					
					//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
					
					var detNumbers2 = [];
					for(n2 = 0; n2 < 3; n2++) {
						detNumbers2[n2] = detNumbers3[n2];
					}
					
					detNumbers2.splice(k, 1);
					var detN2 = detNumbers2.toString();
					
					// viies tsükkel, mis määrab ära viienda numbri
					for(var m = 0; m < 1; m++) {
					
					//console.log("tsykkel 5 -> i: " + i + ", j: " + j + ", k: " + k + ", l: " + l + ", m: " + m);
					
					var detNumbers1 = [];
					for(n1 = 0; n1 < 2; n1++) {
						detNumbers1[n1] = detNumbers2[n1];
					}
					
					detNumbers1.splice(l, 1);
					var detN1 = detNumbers1.toString();
					
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
					
					console.log("detNumbersTemp: " + detNumbersTemp + ", inversioonid: " + inversionCount);
					
					detNumbers.push(detNumbersTemp);
					detNumbersTemp = [];
					inversionCount = 0;
					
					}
				}
			}
		}
	}
}