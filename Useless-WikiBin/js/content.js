// content.js
//Injected automatically after the dom has loaded
//This is injected into every page that we visit in the "matches" in manifest.json
converAllNumbers();
//convertAllMedia();

// content.js
chrome.runtime.onMessage.addListener(
    //Listen for 
    function(request, sender, sendResponse) {
	if( request.message === "clicked_browser_action" ) {
	    //Message received, send the first external link
	    //DO STUFF WITH MESSAGE
	    console.log("Browser action clicked!");

	    //Send message back to background.js
	    //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
	}
    }
);

function convertAllMedia(){
    console.log("Converting all videos, how bout dah");
    $("img").each(function(){
	console.log(this.src);
	this.src = "https://i.ytimg.com/vi/bIWmYVRPHNU/hqdefault.jpg";
    });

    $("video").each(function(){
	console.log(this.src);
	this.src = "https://www.youtube.com/results?search_query=catch+me+outside+how+bout+that";
    });
}

function converAllNumbers(){
    console.log("Converting all numbers to binary....");
    //return the first external html
    //var firstHref = $("a[href^='http']").eq(0).attr("href");
    //console.log(firstHref);

    //var p_array = document.getElementsByTagName("p");
    $("p").each(function(){
	this.innerHTML = this.innerHTML.replace( /\b(\d+,?\d+)\b/g, convertNum );
    });
    hashString("test");

}

function convertNum(str, raw_num, offset, s){
    raw_num = raw_num.replace(",", ''); //Get rid of all semicolons
    var newVal = -1 * raw_num;
    var newVal2 =  "<span id='highlight'>" + dec2bin(newVal) + "</span>";
    return newVal2;
}

function dec2bin(dec){
    return (dec >>>0).toString(2);
}

function hashString(str){
    var crypto = require('crypto');
    var name = 'braitsch';
    var hash = crypto.createHash('md5').update(name).digest('hex');
    return hash;
}
