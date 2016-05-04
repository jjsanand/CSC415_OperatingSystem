var commandHashMap = {};
commandHashMap["ls"]= "ls";
commandHashMap["more"]= "more";
commandHashMap["cat"]= "cat";
commandHashMap["clear"]= "clear";
commandHashMap["ps"]= "ps";
commandHashMap["kill"]= "kill";
//commandHashMap["wc"]= "wc";
commandHashMap["man"]= "man";
commandHashMap["copy"]= "copy";
commandHashMap["delete"]= "delete";
commandHashMap["dir"]= "dir";
commandHashMap["cd"] = "cd";
commandHashMap["test.js"]= "Test case";

var ignoreKeys = {};
ignoreKeys["Tab"]= "Tab";
ignoreKeys["Shift"]= "Shift";
ignoreKeys["Control"]= "Control";
ignoreKeys["Alt"]= "Alt";
ignoreKeys["Escape"]= "Escape";
ignoreKeys["ArrowLeft"]= "ArrowLeft";
ignoreKeys["ArrowDown"]= "ArrowDown";
ignoreKeys["ArrowRight"]= "ArrowRight";
ignoreKeys["ArrowUp"]= "ArrowLeft";
ignoreKeys["CapsLock"]= "CapsLock";

var manPages = {};
manPages["ls"] = "List information about the current directory.";
manPages["man"] = "Displays the manual pages.";
manPages["cat"] = "Concatenate files and print on the standard output.";
manPages["more"] = "Display a file.";
//manPages["wc"] = "Print out file's word count";
manPages["clear"] = "Clears your screen if this is possible.";
manPages["ps"] = "Displays information about of the active processes.";
manPages["kill"]= "Stop the active process.";
manPages["copy"]= "Copy a file with a new name.";
manPages["delete"]= "Delete a file.";
manPages["dir"]= "Return the amount of avaiable drive space";
manPages["cd"] = "Change working directory to desired directory.";

var dirIndex = -1; 

function parseString(inputString) {
	
	var input = inputString.split(" ");
	
	if(commandHashMap.hasOwnProperty(input[0])) { // check if it is a command
		//it is a command
		commandCall(input);	
	} else {
		if (filesMap.hasOwnProperty(input[0])) { // check if the file is on our list.
			processesCall(input);
		} else {
			// file not found
			document.getElementById("displaydevice").innerHTML  += "<br>Error. Undectected command and/or file.<br>";
		}
	}
}
/*
function ls() {
	for(var i = 0; i < directories.length; i++) {	
		document.getElementById("displaydevice").innerHTML  += "<br>" 
		+ directories[i].access 
		+ "&nbsp&nbsp&nbsp&nbsp" 
		+ directories[i].owner
		+ "&nbsp&nbsp&nbsp&nbsp" 
		+ directories[i].time 
		+ "&nbsp&nbsp&nbsp&nbsp" 
		+ directories[i].name + "";
	}
}
*/
function ls(currLoc) {

	var x = 0;
	/*
	console.log("index : " + dirIndex);
	console.log("curr : " + currLoc);
	console.log("curr l: " + currLoc.length);
	console.log("curr l: " + currLoc[0]);
	console.log("curr l: " + currLoc[0].length);
	console.log("curr l: " + currLoc[0].name);
	*/
	if (dirIndex != -1) 
	{
		x = 1;
		for(var i = 0; i < currLoc.length - x; i++) 
		{	
			document.getElementById("displaydevice").innerHTML  += "<br>" 
			+ currLoc[i].file.access 
			+ "&nbsp&nbsp&nbsp&nbsp"
			+ currLoc[i].file.owner
			+ "&nbsp&nbsp&nbsp&nbsp" 
			+ currLoc[i].file.type
			+ "&nbsp&nbsp&nbsp&nbsp"
			+ currLoc[i].file.time 
			+ "&nbsp&nbsp&nbsp&nbsp" 
			+ currLoc[i].file.name + "";
		}
	}
	else
	{
		//console.log("ddddddddddd : " + dirIndex);
		for(var i = 0; i < currLoc.length - x; i++) 
		{	
			document.getElementById("displaydevice").innerHTML  += "<br>" 
			+ currLoc[i].access 
			+ "&nbsp&nbsp&nbsp&nbsp"
			+ currLoc[i].owner
			+ "&nbsp&nbsp&nbsp&nbsp" 
			+ currLoc[i].type
			+ "&nbsp&nbsp&nbsp&nbsp"
			+ currLoc[i].time 
			+ "&nbsp&nbsp&nbsp&nbsp" 
			+ currLoc[i].name + "";
		}
	}
}

function getCurrDir()
{
	var jMap = [jagatFolder, jagatHashMap];
	var mMap=[mansiFolder, mansiHashMap];
	var yMap = [yongcaiFolder, yongcaiHashMap];
	var tMap = [tonyFolder, tonyHashMap];
	var nMap = [nimithaFolder, nimithaHashMap];
	var aMap = [asafFolder, asafHashMap];
	var mainHashMap = [directories,filesMap];

	switch(dirIndex)
	{
		case -1:
			return mainHashMap;
		break;
		case 0:
			return jMap;
		break;
		case 1: 
			return mMap;
		break;
		case 2: 
			return yMap;
		break;
		case 3: 
			return tMap;
		break;
		case 4: 
			return nMap;
		break;
		case 5: 
			return aMap;
		break;
		default: return mainHashMap;
	} 
}

function cd(destination)
{
	if( destination[1] == "..")
	{
		if(dirIndex >= 0 && dirIndex <= 4)
		{
			dirIndex = -1;
			cDirectory = "";
		}
		else
		{
			document.getElementById("displaydevice").innerHTML  += "<br>"  
			+ "Invalid destination.";
		}
	}
	else
	{
		for(var i=0; i < directories.length; i++)
		{
		 	if(directories[i].name == destination[1])
		 	{
		 		dirIndex = i;
				cDirectory = "\\" + destination[1];
				break;
		 	}
		}

		if(dirIndex == -1)
		{
			document.getElementById("displaydevice").innerHTML  += "<br>"  
			+ "No such directory found";
		}
	}	

} 

function clear() {
	document.getElementById("displaydevice").innerHTML  = "";
}

function man(command) {
	if(manPages.hasOwnProperty(command[1])) {
		document.getElementById("displaydevice").innerHTML  += "<br>" + command[1] + "<br>" + manPages[command[1]];
	} else {
		document.getElementById("displaydevice").innerHTML  += "<br>No such Command.";
	}
}

function cat(input) {
	
	if(filesMap.hasOwnProperty(input)) {
		for (var i = 0; i < Object.keys(filesMap).length; i++) {
			if(directories[i].name == input) {
				document.getElementById("displaydevice").innerHTML  += "<br>" + directories[i].file;		
				break;
			}
		}
	} else {
		document.getElementById("displaydevice").innerHTML  += "<br>Error. File not found.<br>";
	}
}

function more(input) {
	if(filesMap.hasOwnProperty(input)) {
		// we have it here
		cat(input);
	} else {
		/*
		for (var i = 0; i < textFile.length; i++) {
			
		}
		*/
	}
}

var psList = [];

function ps() {
	document.getElementById("displaydevice").innerHTML  += "<br>" + psList;
}

function kill(input) {
	for (var i = 0; i < psList.length; i++) {
		if(psList[i] == input) {

			setState(getKey(input), "stop");
			
			document.getElementById("displaydevice").innerHTML  += "<br>Process: " + input + " is stopped.";
			
			if (psList.length == 1 || psList[psList.length - 1] == input) {
				psList.pop();
			} else {
				for (var j = 0; j < psList.length - 1; j++) {
					if (psList[j] == input) {
						psList[j] = psList[j + 1];
					}
				}
				psList.pop();	
			}
			break;
		}
	}
}

function getKey(input) {
	for(var key in psHashMap){
		if(psHashMap[key] === input){
			  return key;
		 }
	}
}

function copy(input) {

	var new_file = {name: "" , owner: "", time: "", access: "", file: null}
	
	if(filesMap.hasOwnProperty(input[1])) {
		for (var i = 0; i < directories.length; i++ ) {
			if(directories[i].name == input[1]) { 
				new_file.name = input[2];
				new_file.owner = directories[i].owner;
				new_file.time = directories[i].time;
				new_file.access = directories[i].access;
				new_file.file = directories[i].file;
				
				directories[directories.length] = new_file;
				
				directories[directories.length - 1].name = input[2];

				filesMap[input[2]]= input[2];
				
				break;
			}
		}
	} else {
		document.getElementById("displaydevice").innerHTML  += "<br>File name not found.";
	}
}

function delete2(input) {
	if(filesMap.hasOwnProperty(input)) {
		delete filesMap[input];
		for (var i = 0; i < directories.length; i++) {
			if (directories[i].name == input) {
				directories.splice(i, 1);
				document.getElementById("displaydevice").innerHTML  += "<br>File " + input + " is deleted.";
				break;
			}
		}
	} else {
		document.getElementById("displaydevice").innerHTML  += "<br>File name not found.";
	}
}

function dir(){
    document.getElementById("displaydevice").innerHTML += "Amount of avaliable drive space: " + available_Space;

}