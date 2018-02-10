editAreaLoader.init({
    id : "editor"		// textarea id
    ,syntax: "js"			// syntax to be uses for highgliting
    ,start_highlight: true		// to display with highlight mode on start-up
    ,allow_resize: "y"
    ,allow_toggle: false
	,word_wrap: true
	,language: "en"
});

// for storing user inputs
var inputQueue = [];
//for executing code from user
function execute(){
    try{
        clearOutputArea();
        buildInputQueue();
        var code = editAreaLoader.getValue("editor");
        var func = new Function(code);
        func();
    }catch(e){
        println();
        println("Error: " +e.message);
    }
}


// for clearing output area for further use
function clearOutputArea(){
    var outputArea = document.getElementById("output_area");
    while(outputArea.firstChild){
        outputArea.removeChild(outputArea.firstChild);
    }
}

//console printing
function print(out){
    var outputArea = document.getElementById("output_area");
    var node = document.createTextNode(out);
    outputArea.appendChild(node);
}

//console output new line
function println(out){
    var outputArea = document.getElementById("output_area");
    if(out != undefined){
        var node = document.createTextNode(out);
        outputArea.appendChild(node);
    }

    var br = document.createElement("br");
    outputArea.appendChild(br);
}

function buildInputQueue(){
    var conInputs = document.getElementById("console_input").value.split("\n");
    inputQueue.length = 0;
    for(var key in conInputs){
        inputQueue.push(conInputs[key]);
    }
}

//for reading console input
function readLine(){
    if(inputQueue.length > 0){
        return inputQueue.shift();
    }
    return undefined;
}

