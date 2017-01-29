$(document).ready(function(){
    console.log("DOM READY");
    w3IncludeHTML();
    $.material.init();

    simulateFirstTime();

});


let simulateFirstTime = function(){
    let data = require("./data.js");
    
    data.clear(); //Simulate first time user
    
    if(data.get() == null){
	console.log("FIRST TIME USER");
	//Display the Setup Page
	document.getElementById("firstTime").innerHTML='<object type="text/html" data="www/html/first-time.html" ></object>';
    }else{
	console.log("Welcome " + data.get())	
    }

}
